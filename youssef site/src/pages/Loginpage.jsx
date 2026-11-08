import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import { sendLoginData } from '../services/Authnticationserv';
import { Link, useNavigate } from 'react-router-dom';

const schema = zod.object({
  email: zod.string().nonempty('Email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: zod.string().nonempty('Password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 'Password is incorrect'),
})

export default function Loginpage() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema), mode: 'onBlur', reValidateMode: 'onBlur'
  })
  const navigate = useNavigate()

  async function Signup(userdata) {
    setLoading(true);
    const response = await sendLoginData(userdata)
    setLoading(false)
    if (response.message) {
      // ✅ Save token AND user info so navbar can show the real name
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify({
        name: response.user?.name || userdata.email.split('@')[0],
        photo: response.user?.photo || 'https://i.pravatar.cc/150?img=11',
        email: response.user?.email || userdata.email,
        id: response.user?.id || response.user?._id || '1',
      }))
      navigate('/')
    } else {
      setApiError(response.error);
    }
  }

  return (
    <div className='rounded-2xl shadow-2xl py-10 px-6 bg-amber-100 min-w-md'>
      <h1 className='text-center text-black mb-2 text-4xl pb-3'>Log-in</h1>
      <form onSubmit={handleSubmit(Signup)} className='flex flex-col gap-4'>
        <Input label="Email" {...register('email')} type="email" variant='bordered'
          errorMessage={errors.email?.message} isInvalid={Boolean(errors.email)} />
        <Input label="Password" {...register('password')} type="password" variant='bordered'
          errorMessage={errors.password?.message} isInvalid={Boolean(errors.password)} />
        <Button color="secondary" isLoading={loading} type='submit'>Log-in</Button>
        <div className='text-center'>
          <p>Don't have an account? <Link className='text-red-700' to={'/regester'}>Create one</Link></p>
        </div>
        {apiError && <span className='text-center text-black'>{apiError}</span>}
      </form>
    </div>
  )
}
