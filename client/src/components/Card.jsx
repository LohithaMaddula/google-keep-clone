import moment from 'moment'
import { FaCopy, FaEdit, FaTrash, FaTrashRestore } from 'react-icons/fa'
import { RiUnpinFill } from 'react-icons/ri'
import { TbPinnedFilled } from 'react-icons/tb'
import EditModal from './EditModal'
import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from './Modal'

function Card({ data, index, handlePin, handleBin, fetchNotes, handleRestore, handleDelete }) {
  const iconSize = 20
  const auth = useAuth()
  const [modal, setModal] = useState(false)
  const [modalNoteId, setModalNoteId] = useState(null)

  const handleCopyLink = async (id) => {
    try {
      await navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_URL}/shared/${id}`)
      toast.success('Link copied to clipboard')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {auth === data.user ? (
        <div
          key={index}
          className={`group bg-${data.theme} p-4 rounded-md shadow-sm hover:shadow-xl border transition duration-300`}
        >
          <div className='flex justify-between'>
            <h1 className='overflow-auto text-lg font-semibold text-gray-900 break-words'>
              {data.title}
            </h1>
            <div className='transition-all duration-300 opacity-0 group-hover:opacity-100'>
              {!data.isBinned &&
                (data.isPinned ? (
                  <button className='' onClick={() => handlePin(data._id, 'notPinned')}>
                    <RiUnpinFill size={iconSize} />
                  </button>
                ) : (
                  <button className='' onClick={() => handlePin(data._id, 'isPinned')}>
                    <TbPinnedFilled size={iconSize} />
                  </button>
                ))}
            </div>
          </div>
          <p className='text-gray-700 break-words whitespace-pre-line'>{data.description}</p>
          <div className='flex justify-between gap-3 pt-3 transition-all duration-300 opacity-0 group-hover:opacity-100'>
            <p className='text-xs transition-all duration-300 opacity-0 group-hover:opacity-100'>
              Edited {moment(data.updatedAt).fromNow()}
            </p>
            {data.isBinned ? (
              <>
                <button className='' onClick={() => handleDelete(data._id)}>
                  <FaTrash size={20} />
                </button>
                <button className='' onClick={() => handleRestore(data._id, 'toNotes')}>
                  <FaTrashRestore size={20} />
                </button>
              </>
            ) : (
              <>
                {data.isPublic && (
                  <button onClick={() => handleCopyLink(data._id)}>
                    <FaCopy />
                  </button>
                )}
                <button className='' onClick={() => handleBin(data._id, 'toBin')}>
                  <FaTrash />
                </button>
                <button
                  className=''
                  onClick={() => {
                    setModalNoteId(data._id)
                    setModal(!modal)
                  }}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
          {/* {modal && modalNoteId === data._id && (
               <EditModal note={data} fetchNotes={fetchNotes} setModal={setModal} />
          )} */}
          <Modal modal={modal && modalNoteId === data._id} setModal={setModal}>
            <EditModal note={data} fetchNotes={fetchNotes} setModal={setModal} />
          </Modal>
        </div>
      ) : (
        <div
          key={index}
          className={`group bg-${data.theme} p-4 rounded-md shadow-sm hover:shadow-xl border transition duration-300`}
        >
          <h1 className='overflow-auto text-lg font-semibold text-gray-900 break-words'>
            {data.title}
          </h1>
          <p className='text-gray-700 break-words whitespace-pre-line'>{data.description}</p>
          <p className='pt-3 text-xs transition-all duration-300 opacity-0 group-hover:opacity-100'>
            *created by {data.user}
          </p>
          <div className='flex justify-between gap-3 pt-2 transition-all duration-300 opacity-0 group-hover:opacity-100'>
            <p className='text-xs transition-all duration-300 opacity-0 group-hover:opacity-100'>
              Edited {moment(data.updatedAt).fromNow()}
            </p>
            <button
              className=''
              onClick={() => {
                setModalNoteId(data._id)
                setModal(!modal)
              }}
            >
              <FaEdit />
            </button>
          </div>
          {modal && modalNoteId === data._id && (
            <EditModal note={data} fetchNotes={fetchNotes} setModal={setModal} />
          )}
        </div>
      )}
    </>
  )
}

Card.propTypes = {
  filterBy: PropTypes.string,
  handleBin: PropTypes.func,
  handlePin: PropTypes.func,
  handleDelete: PropTypes.func,
  handleRestore: PropTypes.func,
  fetchNotes: PropTypes.func,
  data: PropTypes.object,
  index: PropTypes.number,
}

export default Card
