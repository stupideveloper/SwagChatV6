import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ButtonSolid from './Buttons/ButtonSolid'
import { HomeIcon } from '@heroicons/react/outline'

export default function DeAuthModal({user, ...props}) {
  return (
    <>
      <Transition appear show={user === null ? true : false} as={Fragment}>
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
                  Whoops, your session has expired!
                </Dialog.Title>
                <div className="mt-2">
									<h4 className='mb-4'>Please re-authenticate</h4>
									<a href="/"><ButtonSolid icon={<HomeIcon className="w-4 h-4" />}>Home</ButtonSolid></a>
                </div>

                
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}