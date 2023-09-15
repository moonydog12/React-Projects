import { useEffect } from 'react'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import { getCabins } from '../services/apiCabins'

function Cabins() {
  useEffect(() => {
    const getAllCabins = async () => {
      const data = await getCabins()
      console.log(data)
    }
    getAllCabins()
  }, [])

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  )
}

export default Cabins
