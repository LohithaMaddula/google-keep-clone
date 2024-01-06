import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'

function Modal({ modal, setModal, children }) {
  function closeModal() {
    setModal(false)
  }

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 backdrop-blur-sm bg-black/50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl'>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

Modal.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  children: PropTypes.object,
}

export default Modal
