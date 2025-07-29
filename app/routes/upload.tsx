import React from 'react'
import Navbar from '~/components/navigation/Navbar';

export const meta = () => (
  [
    { title: "Resumind | Upload" },
    { name: "description", content: "Upload your resume to get feedback" },
  ]
)

const Upload = () => {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center">
      <Navbar />
    </main>
  )
}

export default Upload;