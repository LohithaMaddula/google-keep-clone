import PropTypes from 'prop-types'
import Card from './Card'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

function NoteCard({
  notes,
  filterBy,
  handleBin,
  handlePin,
  handleDelete,
  handleRestore,
  // fetchNotes,
  // accept,
  // setAccept,
}) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 250: 1, 550: 2, 850: 3, 1050: 4 }}>
      <Masonry columnsCount={4} gutter={'15px'}>
        {notes
          .filter((data) => {
            if (filterBy === 'pinned') return data.isPinned
            else if (filterBy === 'bin') return data.isBinned
            else if (filterBy === 'collaborators') return data.isPinned
            else return !data.isPinned
          })
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((data, index) => (
            <Card
              key={index}
              data={data}
              handlePin={handlePin}
              handleBin={handleBin}
              // fetchNotes={fetchNotes}
              handleRestore={handleRestore}
              handleDelete={handleDelete}
            />
          ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}

NoteCard.propTypes = {
  notes: PropTypes.array.isRequired,
  filterBy: PropTypes.string,
  handleBin: PropTypes.func,
  handlePin: PropTypes.func,
  handleDelete: PropTypes.func,
  handleRestore: PropTypes.func,
  // fetchNotes: PropTypes.func,
  accept: PropTypes.bool,
  setAccept: PropTypes.func,
}

export default NoteCard
