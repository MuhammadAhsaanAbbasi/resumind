import { prepareInstructions } from "constants/index";
import React, { useState, type FormEvent, useTransition } from 'react'
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Navbar from '~/components/navigation/Navbar';
import FileUploader from '~/components/resume/FileUploader';
import { convertPdfToImages } from '~/lib/pdf2img';
import { usePuterStore } from '~/lib/puter';
import { generateUUID } from '~/lib/utils';

export const meta = () => (
  [
    { title: "Resumind | Upload" },
    { name: "description", content: "Upload your resume to get feedback" },
  ]
)

interface AnalyzeParams {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  file: File;
}

const Upload = () => {
  const { fs, ai, kv } = usePuterStore();
  const [isProcessing, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [statusText, setStatusText] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = (file: File | null) => {
    setFile(file)
  }

  const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: AnalyzeParams) => {

    setStatusText("Uploading the file..");

    const uploadFile = await fs.upload([file]);


    const blob = await fs.read(uploadFile?.path as string);
    if (!blob) {
      setStatusText("Error: File was not found in virtual FS.");
      return;
    }


    setStatusText('Converting to image...');
    const { results, thumbnail } = await convertPdfToImages(file);

    if (!results.length || results.every(img => !img.file)) {
      return {
        error: "Failed to convert the file to image"
      }
    }


    setStatusText('Uploading the images...');

    const filesToUpload = results
      .filter(img => img.file !== null)
      .map(img => img.file!)  // non-null assertion

    const uploadedImages = await fs.upload(filesToUpload);
    if (!uploadedImages) {
      return {
        error: "Failed to upload the images"
      }
    }

    const imagePaths = Array.isArray(uploadedImages)
      ? uploadedImages.map(img => img.path)
      : [uploadedImages.path];

    let thumbnailPath = null;
    if (thumbnail) {
      const thumbnailBlob = await fetch(thumbnail).then((r) => r.blob());
      const thumbnailFile = new File([thumbnailBlob], "thumbnail.png", {
        type: "image/png",
      });

      const uploadThumb = await fs.upload([thumbnailFile]);
      thumbnailPath = Array.isArray(uploadThumb)
        ? uploadThumb[0].path
        : uploadThumb?.path;
    }


    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: (uploadFile?.path as string),
      imagePath: imagePaths,
      thumbnailPath,
      companyName,
      jobTitle,
      jobDescription,
      feedback: '',
    }
    await kv.set(`resume:${uuid}`, JSON.stringify(data));


    setStatusText('Analyzing...');

    const feedback = await ai.feedback(
      data.resumePath,
      prepareInstructions({ jobTitle, jobDescription })
    )
    if (!feedback) return setStatusText('Error: Failed to analyze resume');

    const feedbackValue = typeof feedback.message.content === 'string'
      ? feedback.message.content
      : feedback.message.content[0].text;
    console.log(feedbackValue);

    data.feedback = JSON.parse(feedbackValue);
    setStatusText('Analysis complete, redirecting...');
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    console.log(data);
    return {
      data: data,
      success: true,
      message: 'Analysis complete'
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;

    console.log({ companyName, jobTitle, jobDescription, file });

    if (!file) return;
    startTransition(() => (
      handleAnalyze({ companyName, jobTitle, jobDescription, file })
        .then((res) => {
          if (res?.error) {
            toast.error(
              <h2>{res.error}</h2>
            )
          }

          if (res?.success) {
            // toast
            toast.success(
              <h2>{res.message}</h2>
            )
            navigate(`/resume/${res.data.id}`);
          }
        })
        .catch((err) => {
          const message = typeof err === 'string'
            ? err
            : err?.message || 'An unexpected error occurred';

          toast.error(<h2>{message}</h2>);
        })

    ));

  };
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-12">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2">
              <h2>{statusText}</h2>
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