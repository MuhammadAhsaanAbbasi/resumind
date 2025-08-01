"use client"
import React, { useState, useTransition } from 'react'
import { CardWrapper } from '~/components/auth/CardWrapper';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { LoginSchema } from "~/schema/auth";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import FormError from '~/components/shared/FormError';
import FormSuccess from '~/components/shared/FormSuccess';
// import { login } from '@/global-actions/auth';

export const SignInForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        // startTransition(() => {
        //     login(values)
        //         .then((data) => {
        //             setError(data.error);
        //             setSuccess(data.success);
        //             if (data?.error) {
        //                 toast({
        //                     title: "Login Failed",
        //                     description: data.error,
        //                     duration: 2000,
        //                     action: (
        //                         <ToastAction altText="Dismiss" >Dismiss</ToastAction>
        //                     )
        //                 })
        //                 form.reset();
        //             }

        //             if (data?.success) {
        //                 form.reset();
        //                 toast({
        //                     title: "Login Success",
        //                     description: data.message,
        //                     duration: 2000,
        //                     action: (
        //                         <ToastAction altText="Close">Close</ToastAction>
        //                     ),
        //                 })
        //                 router.push("/user/profile/edit");
        //             }
        //         })
        // });
    }

    return (
        <FormProvider
            {...form}
        >
            <CardWrapper
                headerlabels='Log In to Continue Your Job Journey'
                backButtonLabel="Don't Have an Account?"
                backButtonhref='/sign-up'
            >
                <form className="flex flex-col items-center justify-center text-center gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='label'>
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
                                <FormLabel className='label'>
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
                        disabled={isPending}
                        type="submit" className='auth-button mx-auto'>
                        Login
                    </Button>

                </form>
            </CardWrapper>
        </FormProvider>
    );

}