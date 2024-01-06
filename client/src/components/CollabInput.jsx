import { FaUserPlus } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { FaCircleXmark } from 'react-icons/fa6'

function CollabInput({ collaborators, setCollaborators }) {
  const handleAdd = () => {
    const updatedCollaborators = [...collaborators, '']
    setCollaborators(updatedCollaborators)
  }

  const handleChange = (onChangeValue, i) => {
    const updatedCollaborators = [...collaborators]
    updatedCollaborators[i] = onChangeValue.target.value
    setCollaborators(updatedCollaborators)
  }

  const handleRemove = (i) => {
    const updatedCollaborators = [...collaborators]
    updatedCollaborators.splice(i, 1)
    setCollaborators(updatedCollaborators)
  }
  return (
    <div className='flex items-center p-1 overflow-auto'>
      <button
        onClick={() => handleAdd()}
        className='p-2 text-white transition duration-300 bg-gray-600 rounded-full hover:scale-110'
        title='Add Collaborators'
      >
        <FaUserPlus />
      </button>
      {collaborators.map((data, i) => {
        return (
          <div key={i} className='flex'>
            <input
              type='text'
              value={data}
              onChange={(e) => handleChange(e, i)}
              className='border rounded outline-0'
            />
            <button onClick={() => handleRemove(i)}>
              <FaCircleXmark size={25} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

CollabInput.propTypes = {
  collaborators: PropTypes.array,
  setCollaborators: PropTypes.func.isRequired,
}

export default CollabInput
