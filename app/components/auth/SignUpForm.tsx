"use client"
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './CardWrapper';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { RegisterSchema } from '~/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import FormError from '~/components/shared/FormError';
import FormSuccess from '~/components/shared/FormSuccess';


export const SignUpForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof RegisterSchema>) {
        setError('')
        setSuccess('')
        // startTransition(() => {
        //     register(values).then((data) => {
        //         setError(data.error);
        //         setSuccess(data.msg);
        //         if (data?.error) {
        //             form.reset();
        //             toast({
        //                 title: "Signup Failed",
        //                 description: data?.error,
        //                 variant: "destructive",
        //                 duration: 2000,
        //             })
        //         }
        //         if (data?.success) {
        //             form.reset();
        //             toast({
        //                 title: "Signup Success",
        //                 description: "Please Login To Continue",
        //                 duration: 2000,
        //                 action: (
        //                     <ToastAction altText="Verify Your Account!">Verify Now!</ToastAction>
        //                 ),
        //             });
        //             router.push(`/auth/verify?token=${data.success}`)
        //         }
        //     });
        // });
    }

    return (
        <FormProvider
            {...form}
        >
            <CardWrapper
                headerlabels='Create an Account'
                backButtonLabel="Already Have an Account?"
                backButtonhref='/sign-in'
            >
                <form className="flex flex-col justify-center items-center gap-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    UserName
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='john.doe@gmail.com'
                                        type="text"
                                        className='auth-input'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='john.doe@gmail.com'
                                        type="email"
                                        className='auth-input'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='*********'
                                        type='password'
                                        className='auth-input'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        error && (
                            <FormError message={error} />
                        )
                    }
                    {
                        success && (
                            <FormSuccess message={success} />
                        )
                    }

                    <Button
                        // disabled={isPending}
                        type="submit" className='auth-button'>
                        Create an Account
                        <BottomGradient />
                    </Button>

                </form>
            </CardWrapper>
        </FormProvider>
    );

}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};