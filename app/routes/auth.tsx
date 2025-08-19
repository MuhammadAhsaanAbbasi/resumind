import React from 'react'
import { AuthForm } from '~/components/auth/AuthForm';

export const meta = () => ([
  { title: 'Resumind | Sign In' },
  { name: 'description', content: 'Sign in to your account' },
])

const SignIn = () => {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <AuthForm />
    </main>
  )
}

export default SignIn;