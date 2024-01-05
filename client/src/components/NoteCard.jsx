import { useState } from 'react'
import moment from 'moment'
import { FaEdit, FaTrash, FaTrashRestore, FaCopy } from 'react-icons/fa'
import { RiUnpinFill } from 'react-icons/ri'
import { TbPinnedFilled } from 'react-icons/tb'
import EditModal from './EditModal'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'

function NoteCard({
  notes,
  filterBy,
  handleBin,
  handlePin,
  handleDelete,
  handleRestore,
  fetchNotes,
}) {
  const [modal, setModal] = useState(false)
  const [modalNoteId, setModalNoteId] = useState(null)
  const iconSize = 20

  const handleCopyLink = async (id) => {
    try {
      await navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_URL}/shared/${id}`)
      toast.success('Link copied to clipboard')
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className='grid flex-grow grid-cols-1 gap-4 p-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {notes
        .filter((data) => {
          if (filterBy === 'pinned') return data.isPinned
          else if (filterBy === 'bin') return data.isBinned
          else if (filterBy === 'collaborators') return data.isPinned
          else return !data.isPinned
        })
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((data, index) => (
          <div
            key={index}
            className={`group bg-${data.theme} p-4 rounded-md shadow-sm hover:shadow-xl border transition-all duration-300`}
          >
            <div className='flex justify-between'>
              <h1 className='text-lg font-semibold'>{data.title}</h1>
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
            <p className='text-gray-700 whitespace-pre-line'>{data.description}</p>
            <div className='flex justify-between gap-3 pt-3 transition-all duration-300 opacity-0 group-hover:opacity-100'>
              <p className='text-xs transition-all duration-300 opacity-0 group-hover:opacity-100'>
                Edited {moment(data.updatedAt).fromNow()}
              </p>
              {data.isPublic && (
                <button onClick={() => handleCopyLink(data._id)}>
                  <FaCopy />
                </button>
              )}
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
                  <button
                    className=''
                    onClick={() => {
                      setModalNoteId(data._id)
                      setModal(!modal)
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button className='' onClick={() => handleBin(data._id, 'toBin')}>
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
            {modal && modalNoteId === data._id && (
              <EditModal note={data} fetchNotes={fetchNotes} setModal={setModal} />
            )}
          </div>
        ))}
    </div>
  )
}

NoteCard.propTypes = {
  notes: PropTypes.array.isRequired,
  filterBy: PropTypes.string,
  handleBin: PropTypes.func,
  handlePin: PropTypes.func,
  handleDelete: PropTypes.func,
  handleRestore: PropTypes.func,
  fetchNotes: PropTypes.func,
}

export default NoteCard
