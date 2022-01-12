import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/Store'
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';

interface FormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

const Home = () => {
  const router = useRouter()
  const [authMode, setAuthMode] = useState('signUp')
  useEffect(() => {
    if(localStorage.getItem('hasLoggedIn') === 'true') {
      setAuthMode('signIn')
    }
  }, [])
  const handlesignIn = async (username, password) => {
    try {
      const { error, user } = (authMode === 'signUp')
      ? await supabase.auth.signUp({ email: username, password })
      : await supabase.auth.signIn({ email: username, password })
      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (error) {
        alert('Error with auth: ' + error.message)
      } 
      if (!error) {
        localStorage.setItem('hasLoggedIn', 'true')
      }
    } catch (error) {
      console.log('error', error)
      alert(error.error_description || error)
    }
  }
  return (
    <div className='flex bg-black text-white flex-col content-center items-center place-content-center h-screen'>

     <h1 className='mb-6 text-5xl font-black'>SwagChatV6</h1>
     <div className='bg-white text-black rounded-2xl p-4'>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validate={values => {
          let errors: FormikErrors<FormValues> = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if(!values.password) {
            errors.password = 'Required';
          }
          if(!values.confirmPassword && authMode == 'signUp') {
            errors.confirmPassword = 'Required';
          }
          if(values.password.length < 8) {
            errors.password = 'Password too short'
          } else if (authMode === 'signUp') {
            if (values.confirmPassword !== values.password){
              errors.confirmPassword = 'Passwords do not match';
            }
          }
          
          
          return errors;
        }}

        onSubmit={async (values) => {
          handlesignIn(values.email, values.password)
        }}

      >

        {({ isSubmitting }) => (
          <Form className='block'>
            <label className='block'>
              <span className='font-bold block '>Email</span>
              <span className=' text-sm text-slate-600 leading-3'>(This will be used to automatically generate your username)</span>
              <div className='block pt-1'>
                <Field type="email" placeholder="joe@whitehouse.gov" name="email" className="rounded-lg w-72" />
              </div>
              <ErrorMessage name="email" component="div" className='text-red-600' />
            </label>
    

            <label className='inline'>
              <span className='font-bold block mb-2 mt-4'>Password</span>
              <div className='block'>
                <Field type="password" placeholder="Minimum 8 characters" name="password" className="rounded-lg w-72" />
              </div>
              <ErrorMessage name="password" component="div" className='text-red-600' />
            </label>


            {authMode === 'signUp' && ( 
              <label className='block'>
                <span className='font-bold block mb-2 mt-4'>Confirm Password</span>
                <div className='block'>
                  <Field type="password" placeholder="Repeat the password" name="confirmPassword" className="rounded-lg w-72" />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
              </label>
            )}

            <button type="submit" className='mt-4 bg-blue-800 w-full text-center font-bold text-white py-2 rounded-lg' disabled={isSubmitting}>
              {authMode === 'signUp' ? 'Sign Up' : 'Sign In'}
            </button>
            {authMode === 'signUp' && (
              <p className='mt-2'>Already have an account? <a href="#" onClick={()=>{setAuthMode('signIn')}} className='text-blue-800'>Sign In</a></p>
            )}
            {authMode === 'signIn' && (
              <p className='mt-2'>Don&apos;t have an account? <a href="#" onClick={()=>{setAuthMode('signUp')}} className='text-blue-800'>Sign Up</a></p>
            )}
            
              
          </Form>
        )}
      </Formik>
     </div>
    
   </div>
  )
}

export default Home
