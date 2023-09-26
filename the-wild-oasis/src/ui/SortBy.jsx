import { useSearchParams } from 'react-router-dom'
import Select from './Select'
import PropTypes from 'prop-types'

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get('sortBy') || ''

  const handleChange = (event) => {
    searchParams.set('sortBy', event.target.value)
    setSearchParams(searchParams)
  }

  return <Select options={options} value={sortBy} onChange={handleChange} type="white" />
}

SortBy.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default SortBy
