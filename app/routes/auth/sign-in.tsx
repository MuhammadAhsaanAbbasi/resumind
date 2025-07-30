import React from 'react'
import { SignInForm } from '~/components/auth/SignInForm';

export const meta = () => ([
  { title: 'Resumind | Sign In' },
  { name: 'description', content: 'Sign in to your account' },
])

const SignIn = () => {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center">
      <SignInForm />
    </main>
  )
}

export default SignIn;