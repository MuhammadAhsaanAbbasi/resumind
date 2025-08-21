import { Link } from 'react-router';
import ScoreCircle from './ScoreCircle';
import { usePuterStore } from '~/lib/puter';
import { useEffect, useState } from 'react';

const ResumeCard = ({ resume: { id, jobTitle, feedback, companyName, thumbnailPath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeURL, setResumeURL] = useState<string>('');

    useEffect(() => {
        const loadResume = async () => {
            const resume = await fs.read(thumbnailPath);
            if (!resume) return;
            const resumeUrl = URL.createObjectURL(resume);
            setResumeURL(resumeUrl);
        }
        loadResume();
    }, [thumbnailPath]);
    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>

            {/* REsume Image */}
            {
                resumeURL && (
                    <div className='gradient-border animate-in fade-in duration-1000'>
                        <div className='w-full h-full'>
                            <img
                                src={resumeURL}
                                alt={`Resume for ${jobTitle} at ${companyName}`}
                                height={350}
                                width={350}
                                className='w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-lg'
                            />
                        </div>
                    </div>
                )
            }
        </Link>
    )
}

export default ResumeCard;