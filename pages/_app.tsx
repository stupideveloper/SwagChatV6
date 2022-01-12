import '/styles/main.css'
import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import UserContext from '../lib/UserContext'
import { supabase, fetchUserRoles } from '../lib/Store'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "nprogress/nprogress.css";
import { Toaster } from 'react-hot-toast'


export default function SwagChat({ Component, pageProps }) {
  const [userLoaded, setUserLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [userRoles, setUserRoles] = useState([])

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    setUserLoaded(session ? true : false)
    if (user) {
      signIn()
      Router.push('/channels/[id]', '/channels/1')
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      const currentUser = session?.user
      setUser(currentUser ?? null)
      setUserLoaded(!!currentUser)
      if (currentUser) {
        signIn()
        //        signIn(currentUser.id, currentUser.email)

        Router.push('/channels/[id]', '/channels/1')
      }
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [user])

  const signIn = async () => {
    await fetchUserRoles((userRoles) => setUserRoles(userRoles.map((userRole) => userRole.role)))
  }

  const signOut = async () => {
    const result = await supabase.auth.signOut()
    Router.push('/')
  }

  return (
    <UserContext.Provider
      value={{
        userLoaded,
        user,
        userRoles,
        signIn,
        signOut,
      }}
    >
      <Toaster 
        position='bottom-right'
        toastOptions={{
          className: '',
          style: {
            backgroundColor: 'rgb(219 234 254)',
            color: 'rgb(30 58 138)'
          },
          
        }}
      />
      <SkeletonTheme baseColor="#111111" highlightColor="rgb(38, 41, 46)">
        <Component {...pageProps} />  
      </SkeletonTheme>
      <p className='fixed right-0 top-0 p-2 text-slate-700 select-none'>SwagChatV6 Beta 1 | For internal use only.</p>
    </UserContext.Provider>
  )
}
