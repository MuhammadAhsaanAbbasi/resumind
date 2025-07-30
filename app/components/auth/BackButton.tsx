import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'


interface BackButtonProps {
    label: string,
    href: string
}


const BackButton = (
    {
        label,
        href
    }: BackButtonProps
) => {
    return (
        <Button
        variant={"link"}
        className='w-full font-normal text-base hover:underline'
        size={"sm"}
        asChild
        >
            <Link to={href}>
                {label}
            </Link>
        </Button>
    )
}

export default BackButton