import { CheckCircle } from 'lucide-react'
import React from 'react'

const FormSuccess = ({ message }: { message?: string }) => {
    return (
        <div className='bg-emerald-600/20 p-3 rounded-md flex items-center gap-2 text-base text-emerald-400'>
            <CheckCircle className="text-green-500 h-5 w-5" />
            <p>{message}</p>
        </div>
    )
}

export default FormSuccess