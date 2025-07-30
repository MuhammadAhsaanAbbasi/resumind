import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

const SocialAuth = ({text, icon}: {text: string, icon: React.ElementType}) => {
    return (
        <Button variant="outline" className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
            {icon ? React.createElement(icon, { size: 20 }) : <FcGoogle size={20} />}
            <span className="text-neutral-700 dark:text-neutral-300 text-lg">
                {text}
            </span>
            <BottomGradient />
        </Button>
    )
}

export default SocialAuth;

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};