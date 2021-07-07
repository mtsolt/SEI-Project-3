import React from 'react'
import ActivityCarousel from './ActivityCarousel'
import GroupCarousel from './GroupCarousel'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeroVideo from './HeroVideo'
import Map from './Map'


const Home = () => {
  // const [singleActivity, setSingleActivity] = useState([])

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/activities')
  //       console.log(data)
  //       setSingleActivity(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [])
  // console.log(singleActivity)


  return (
    <>
      <HeroVideo />
      <ActivityCarousel />
      <Map />
      <GroupCarousel />
      <div className="Footer">
        <h2> Footer </h2>
      </div>
    </>
  )
}

export default Home