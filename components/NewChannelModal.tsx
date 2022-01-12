import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { addChannel } from '../lib/Store'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import ButtonSolid from './Buttons/ButtonSolid'
import { PencilIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
import ButtonGhost from './Buttons/ButtonGhost'

export default function NewChannelModal({ isOpen, toggleOpen, user, channels, ...props}) {
	const router = useRouter()
	const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

	async function submitForm(e) {
		e.preventDefault()
		const data = new FormData(e.target);

		const value = data.get('channelname');
    const slug = slugify(value)

    if(channels.some(code => code.slug === slug)) {
      toast.error('Channel name already exists', { icon: <ExclamationCircleIcon className='w-5 h-5' /> })
      return
    }
		const newChannel = await addChannel(slug, user.id)
		router.replace(`/channels/${newChannel[0].id}`)
		toggleOpen()
	}


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {}}
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
								<Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-slate-200"
                >
                  Create a new channel
                </Dialog.Title>
                <form className="mt-2" onSubmit={submitForm}>
									<label htmlFor='channelname' className='mb-1 block'>Channel Name</label>
									<input type="text" name='channelname' id='channelname' placeholder='My New Channel' className='mb-4 text-black rounded-lg bg-blue-100' />
									<div className='flex gap-x-2'>
										<ButtonSolid type='submit' icon={<PencilIcon className="w-4 h-4" />}>Create</ButtonSolid>
										<ButtonGhost onClick={toggleOpen}>Cancel</ButtonGhost>
									</div>
                </form>                
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}