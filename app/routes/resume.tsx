import React from 'react'
import { useParams } from 'react-router';
import { usePuterStore } from '~/lib/puter';
export const meta = () => ([
    { title: 'Resumind | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
  return (
    <div>
      Resume: {id}
    </div>
  )
}

export default Resume;