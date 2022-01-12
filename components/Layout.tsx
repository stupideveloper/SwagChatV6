import Link from 'next/link'
import { useContext } from 'react'
import UserContext from '../lib/UserContext'
import { addChannel, deleteChannel } from '../lib/Store'
import { BsTrashFill } from 'react-icons/bs'
import  { BsPlusCircle } from 'react-icons/bs'
import ProfilePicture from './ProfilePicture'
import SettingsModal from './SettingsModal'
import { useState } from 'react'
import NewChannelModal from './NewChannelModal'

export default function Layout(props) {
  const { signOut, user, userRoles } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  const [isNewChannelOpen, setIsNewChannelOpen] = useState(false)
  function toggleNewChannelOpen() {
    setIsNewChannelOpen(!isNewChannelOpen)
  }


  return (
    <main className="main flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <nav
        className="w-64 bg-black text-slate-100 overflow-auto "
        style={{ maxWidth: '20%', minWidth: 150, maxHeight: '100vh' }}
      >
        <div className="p-2 ">
          <button aria-label="Profile Settings" name='Profile Settings' onClick={()=>{setIsOpen((old)=>{return !old})}}>
            <ProfilePicture username={user?.email} size={75} className={''} />
            <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
            
          </button>

          <hr className="m-2 border-slate-600" />
          <h4 className="font-bold mb-2">Channels</h4>
          <button
            type="button"
            className="mb-2 gap-x-2 align-middle items-center w-full flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            onClick={() => toggleNewChannelOpen()}  
          >
            <BsPlusCircle className='translate-y-[1px]' /> New Channel
          </button>
          <NewChannelModal isOpen={isNewChannelOpen} toggleOpen={toggleNewChannelOpen} user={user} />

          <ul className="channel-list flex gap-y-1 flex-col">
            {props.channels.map((x) => (
              <SidebarItem
                channel={x}
                key={x.id}
                activeChannel={props.activeChannelId}
                user={user}
                userRoles={userRoles}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 bg-black border-l border-slate-700 h-screen">{props.children}</div>
    </main>
  )
}

function SidebarItem({ channel, activeChannel, user, userRoles }) {
  const isActive = channel.id == activeChannel
  return <>
    <li className="items-stretch flex">
      <div className={` ${isActive ? 'bg-blue-900' : ''} flex text-slate-400 items-center transition rounded-lg border border-slate-700 flex-grow`}>
        <Link href="/channels/[id]" as={`/channels/${channel.id}`}>
          <a title="Open Room" className={`${isActive ? 'hover:bg-blue-700': 'hover:bg-slate-900'} px-2 py-1 flex-grow rounded-lg`}>
            {channel.slug}
            </a>
        </Link>
        {channel.id !== 1 && (channel.created_by === user?.id || userRoles.includes('admin')) && (
          <button aria-label="Delete Channel" title="Remove Room" className={`rounded-lg px-2 py-2 group ${isActive ? 'hover:bg-blue-700': 'hover:bg-slate-900'}`} onClick={() => deleteChannel(channel.id)}>
            <BsTrashFill className={`group-hover:fill-slate-400   ${isActive ? 'fill-slate-400' : 'fill-slate-600'}`} />
          </button>
        )}
      </div>


    </li>
  </>
}
