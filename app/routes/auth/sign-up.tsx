import React from 'react'
import {SignUpForm} from '~/components/auth/SignUpForm';

export const meta = () => ([
  { title: 'Resumind | SignUp' },
  { name: 'description', content: 'Sign up to your account' },
])


const SignUp = () => {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center">
      <SignUpForm />
    </main>
  )
}

export default SignUp;