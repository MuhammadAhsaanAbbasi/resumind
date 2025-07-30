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
                <form className="flex flex-col justify-center gap-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 justify-center w-full gap-4">
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Date of Birth
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="date"
                                            disabled={isPending}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Gender
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isPending}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your Personality Gender." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">FeMale</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div> */}
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
                                        type="email"
                                        className='auth_input'
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
                                        className='auth_input'
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
                                        className='auth_input'
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
                        type="submit" className='w-full bg-blue-1'>
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