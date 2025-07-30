import { AlertTriangleIcon } from 'lucide-react'
import React from 'react'

const FormError = ({ message }: { message?: string }) => {
    return (
        <div className='bg-destructive/20 p-3 rounded-md flex items-center gap-2 text-base text-destructive'>
            <AlertTriangleIcon className="text-red-500 h-5 w-5" />
            <p>{message}</p>
        </div>
    )
}

export default FormError