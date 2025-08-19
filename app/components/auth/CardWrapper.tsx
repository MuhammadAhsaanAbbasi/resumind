import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { AuthHeader } from './Header';

interface CardwrapperProps {
    children: React.ReactNode;
    headerlabels: string;
}


export const CardWrapper = (
    {
        children,
        headerlabels,
    }: CardwrapperProps
) => {
    return (
        <Card className='auth-card'>
            <CardHeader>
                <AuthHeader label={headerlabels} />
            </CardHeader>
            <CardContent className=''>
                {children}
            </CardContent>
        </Card>
    )
}