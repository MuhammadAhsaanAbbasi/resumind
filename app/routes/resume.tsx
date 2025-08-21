import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import ATS from '~/components/resume/ATS';
import Details from '~/components/resume/Details';
import Summary from '~/components/resume/Summary';
import { usePuterStore } from '~/lib/puter';
export const meta = () => ([
  { title: 'Resumind | Review ' },
  { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [resumeURL, setResumeURL] = useState<string | null>(null);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [auth.isAuthenticated, isLoading, id]);


  useEffect(() => {
    const loadData = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const { resumePath, imagePath, feedback } = JSON.parse(resume);

      const resumeBlob = await fs.read(resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeURL(resumeUrl);

      const imageBlobs = await Promise.all(imagePath.map((imgPath: string) => fs.read(imgPath)));
      if (!imageBlobs) return;
      const imageUrls = imageBlobs.map(blob => URL.createObjectURL(blob));
      setImageURLs(imageUrls);

      setFeedback(feedback);
    }
    loadData();
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className='resume-nav'>
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover bg-center sticky top-0 items-center justify-center">
          {
            resumeURL && imageURLs.length > 0 && (
              <Link to={resumeURL} target="_blank" rel="noopener noreferrer">
                <ul className='flex flex-col gap-4'>
                  {
                    imageURLs.map((imageUrl: string, index: number) => (
                      <li
                        key={index}
                        className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-xl:h-fit w-fit"
                      >
                        <img
                          src={imageUrl}
                          className="w-full h-full object-contain rounded-2xl"
                          title="resume"
                        />
                      </li>
                    ))
                  }
                </ul>
              </Link>
            )
          }
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">
            Resume Review
          </h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS feedback={feedback}/>
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" />
          )}
        </section>
      </div>
    </main>
  )
}

export default Resume;