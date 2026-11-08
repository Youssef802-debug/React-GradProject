

import { Button, Input, Select, SelectItem, Snippet, snippet } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { use, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import { email } from 'zod/v4-mini';
import Notfoundpage from './Notfoundpage';
import { sendRegesterData } from '../services/Authnticationserv';
import { date } from 'zod/v3';
import { useNavigate, Link } from 'react-router-dom';




const schema = zod.object ({

name : zod.string().nonempty('name is requerd').min(3 , ' name must be at least 3 charecters').max(10 , 'name must be less than 10 charecters '),

email: zod.string().nonempty('email is requerd').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),

password : zod.string().nonempty('pass is requerd ').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/ , ' Be between 8 and 15 characters long. ', 'Contain at least one lowercase letter.' , 'Contain at least one uppercase letter.' , 'Contain at least one number.' , 'Contain at least one special character'),

rePassword : zod.string().nonempty('rePassword is requerd ' , 'password dosent match '),

dateOfBirth : zod.coerce.date("Date is requierd").refine((value)=>{
  const userAge = value.getFullYear(); 
const X = new Date().getFullYear(); 
const deff = X - userAge ; 

  return deff >= 18 
  }, 'user must be more than 18 years '),

gender : zod.string().nonempty('gender is requierd')


}).refine((data)=>data.password === data.rePassword , {path : ['rePassword'] , message : ' password dosent match '} )  




export default function Regester() {
  
  const [loading , setLoading] = useState(false); 
  const [apiError , setApiError] = useState(null); 



  const {handleSubmit , register , formState:{errors}} = useForm ({
  
  defaultValues: {
  
    name : '',
  email : '', 
  password : '', 
  rePassword : '' ,
  dateOfBirth : '' , 
  gender : '' , 

  
  


  }, 
resolver : zodResolver(schema) , mode : 'onBlur' , reValidateMode : "onBlur"
  
  })
 
  
  const navigate = useNavigate()
  
async  function Signup(userdata){
  
setLoading(true);

  const latestDate = new Date(userdata.dateOfBirth)


   const response = await sendRegesterData(userdata)
setLoading(false)    
if(response.message){
navigate('/login')
}else{
  setApiError(response.error);
  
}


  }


  return (
      <>





        <div className=' rounded-2xl shadow-2xl py-10 px-6 bg-amber-50  min-w-md '>
  <h1 className=' text-center text-blue-600  mb-2 text-4xl  pb-3' > create account </h1>


  <form onSubmit={ handleSubmit(Signup)} className=' flex flex-col gap-4 '>

  <Input label="Name" {...register('name')} type="text" errorMessage={errors.name?.message} isInvalid={Boolean(errors.name)} variant='bordered' />


  <Input label="Email"   {...register('email')}  type="email" variant='bordered'  errorMessage={errors.email?.message} isInvalid={Boolean(errors.email)} />


  <Input label="Password"  {...register('password')} type="Password" variant='bordered' errorMessage={errors.password?.message} isInvalid={Boolean(errors.password)} />


  <Input label="RePassword"   {...register('rePassword')}type="Password" variant='bordered' errorMessage={errors.rePassword?.message} isInvalid={Boolean(errors.rePassword)} />


  <div className="flex gap-4">
    <Input label="DateOfBirthe"   {...register('dateOfBirth')} type="date" variant='bordered' 
      errorMessage={errors.dateOfBirth?.message} isInvalid={Boolean(errors.dateOfBirth)} />
  
    <Select className="" label="put your gender"  {...register('gender')}  variant='bordered' errorMessage={errors.gender?.message} isInvalid={Boolean(errors.gender)} >
        
            <SelectItem key={'male'}>male</SelectItem>
            <SelectItem key={'female'}>female</SelectItem>
          
        </Select>  

  </div>
  <Button color="primary" isLoading={loading} type='submit'>create account</Button>
  <div className='text-center'><p> if you have account , <Link className='text-red-700 ' to={"/login"} > log in </Link></p></div>
  {apiError && <span className='text-center text-black'> {apiError} </span> }
  </form>
        </div>
      </>
  )
}


