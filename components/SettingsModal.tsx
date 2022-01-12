import { Dialog, Transition, Switch } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import ButtonGhost from './Buttons/ButtonGhost'
import { BsX } from 'react-icons/bs'
import SquareGhost from './Buttons/SquareGhost'
import { supabase } from '../lib/Store'
import ProfilePicture from './ProfilePicture'
import { LogoutIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'



function NotificationToggle() {
  const [enabled, setEnabled] = useState(()=>{return (localStorage.getItem("notifEnabled")=="true")?true:false})
  const [hasPermissions,setPermission] = useState(()=>{return (localStorage.getItem("notifAllowed")=="true")?true:false})
  useEffect(() => {
    if (enabled) {
      Notification.requestPermission().then(function(result) {
        if(Notification.permission === 'denied' || Notification.permission === 'default') {
          //alert("Notification access denied")
        } else {
          localStorage.setItem("notifAllowed","true")
          localStorage.setItem("notifEnabled","true")
          if (hasPermissions) {
          } else {
            setPermission(true)
          }
      }
      })
    } else {
      localStorage.setItem("notifEnabled","0")
      if (hasPermissions) {
        
      }
    }
    return () => {
      
    }
  }, [enabled])
  function notify(en:boolean) {
    if(en) {
      new Notification("Notifications Enabled!")
			toast.success("Notifications Enabled!")
    } else {
      new Notification("Notifications Disabled!")
			toast.success("Notifications Disabled!")
    }
  }
  return (
    <Switch
      checked={enabled}
      onChange={(ev)=>{setEnabled(ev);notify(ev)}}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-slate-400'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full
					transition ease-in-out duration-200`}
      />
    </Switch>
  )

}

export default function SettingsModal({isOpen, setIsOpen, ...props}) {
  const router = useRouter()
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
					<Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md text-slate-300 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-900 shadow-xl rounded-xl">
								<div className='mb-2'>
									<SquareGhost onClick={()=>{closeModal()}}>
										<BsX size={25} />
									</SquareGhost>
								</div>
				
								
								<Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-slate-200"
                >
                  Settings
                </Dialog.Title>
                <div className="mt-2">
                  <div className=''>
                    <h4>Profile Picture</h4>
                    <ProfilePicture size={50} />

                    <p className='text-slate-400 mb-2'>Yes we know its boring. To change it, sign up for a <a className='text-blue-600 underline' href="">Gravitar</a> account using the same email as SwagChatV6.</p>
                  </div>

                </div>
                <div className="mt-6">
									<h4>Notifications</h4>
									<p className='text-slate-400 mb-2'>Toggle whether to display notifications.</p>
									<NotificationToggle />
                </div>

                <div className="mt-6">
									<h4>Logout</h4>
									<p className='text-slate-400 mb-2'>Leave SwagChatV6.</p>
									<ButtonGhost icon={<LogoutIcon className='h-5 w-5' />} onClick={()=>{supabase.auth.signOut(); router.push('/')}}>Logout</ButtonGhost>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
