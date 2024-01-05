import themes from '../data/themes'
import { PropTypes } from 'prop-types'

function Themes({ setTheme }) {
  return (
    <div className='flex flex-row overflow-auto transition-all duration-500 bg-white'>
      {themes.map((data) => (
        <div
          className={`p-4 m-1 bg-${data.name} rounded-full cursor-pointer shadow border`}
          key={data.id}
          onClick={() => {
            setTheme(data.name)
          }}
        ></div>
      ))}
    </div>
  )
}

Themes.propTypes = {
  setTheme: PropTypes.func,
}

export default Themes
