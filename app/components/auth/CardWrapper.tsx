import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { AuthHeader } from './Header';
import BackButton from './BackButton';

interface CardwrapperProps {
    children: React.ReactNode;
    headerlabels: string;
    backButtonLabel: string;
    backButtonhref: string;
}


export const CardWrapper = (
    {
        children,
        headerlabels,
        backButtonLabel,
        backButtonhref
    }: CardwrapperProps
) => {
    return (
        <Card className='auth-card'>
            <CardHeader>
                <AuthHeader label={headerlabels} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonhref} />
            </CardFooter>
        </Card>
    )
}