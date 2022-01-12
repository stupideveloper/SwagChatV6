import Layout from '../../components/Layout'
import Message from '../../components/Message'
import MessageInput from '../../components/MessageInput'
import { useRouter } from 'next/router'
import { useStore, addMessage } from '../../lib/Store'
import { useContext, useEffect, useRef } from 'react'
import UserContext from '../../lib/UserContext'
import ButtonSolid from '../../components/Buttons/ButtonSolid'
import DeAuthModal from '../../components/DeAuthModal'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function MessageSkeleton() {
  return (
    <div className='flex w-full gap-x-2'>
      <Skeleton width='3rem' height='3rem' />
      <div className='flex-grow'>
        <Skeleton width="25%" />
        <Skeleton width="50%" />
        <Skeleton width="45%" />
      </div>
    </div>
  )
}

const ChannelsPage = (props) => {
  const router = useRouter()
  const { user, authLoaded, signOut, userLoaded } = useContext(UserContext)
  const messagesEndRef = useRef(null)

  // Else load up the page
  const { id: channelId } = router.query
  const { messages, channels, messagesLoaded } = useStore({ channelId })


  useEffect(() => {
    if (!user) return
    messagesEndRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }, [messages])

  // redirect to public channel when current channel is deleted
  useEffect(() => {
    if (!channels.some((channel) => channel.id === Number(channelId))) {
      router.push('/channels/1')
    }
  }, [channels, channelId])

  const skeletonN = 8;
  // Render the channels and messages
  // Web browser vscode dont have intellisense :(
  return (
    <Layout channels={channels} activeChannelId={channelId}>
        <div className="relative h-screen">
          {!user && (
              <DeAuthModal user={user} />
            )}
          <div>
            <h1 className='absolute top-0 right-0 z-10 text-slate-800 opacity-40 px-10 py-10 font-black text-7xl select-none' aria-hidden="true">SwagChatV6</h1>
          </div>
          <div className="Messages h-full pb-16">
            <div className={`p-2 flex flex-col gap-y-2 h-full ${messages.length === 0 ? 'overflow-y-hidden' : 'overflow-y-auto '}`}>
              {!messagesLoaded && (
                <div className='flex flex-col gap-y-2'>
                  {[...Array(skeletonN)].map((e, i) => <MessageSkeleton key={i} />)}
                </div>
              )}
               <>
                {messages.map((x) => (
                  <Message key={x.id} message={x} />
                ))}
              </> 
     
              <div ref={messagesEndRef} style={{ height: 0 }} />
            </div>
          </div>
          <div className="p-2 absolute bottom-0 left-0 w-full">
            <MessageInput onSubmit={async (text) => addMessage(text, channelId, user.id)} />
          </div>
        </div>
    </Layout>
  )
}

export default ChannelsPage
