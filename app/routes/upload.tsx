import React, { useState, type FormEvent } from 'react'
import Navbar from '~/components/navigation/Navbar';
import FileUploader from '~/components/resume/FileUploader';

export const meta = () => (
  [
    { title: "Resumind | Upload" },
    { name: "description", content: "Upload your resume to get feedback" },
  ]
)

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  // const [statusText, setStatusText] = useState('');

  const handleFileSelect = (file: File | null) => {
    setFile(file)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;

    console.log({companyName, jobTitle, jobDescription, file});

    if (!file) return;
    // setStatusText('Processing...');
    // TODO: Add file upload logic here
    setIsProcessing(false);
    e.currentTarget.reset();
    // setStatusText('');
  };
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-12">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2">
              <h2>Processing...</h2>
              <img
                src="/images/resume-scan.gif"
                className="w-full h-auto"
                height={200}
                width={200}
              />
            </div>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea name="job-description" placeholder="Job Description" id="job-description" rows={5} />
              </div>
              <div className="form-div">
                <label htmlFor="resume">Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="form-button mx-auto" type="submit">
                Save & Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default Upload;