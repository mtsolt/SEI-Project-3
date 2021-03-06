/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import ActivityCard from './activities/ActivityCard'
const Generator = () => {
  const [activities, setActivities] = useState([])// all groups on state
  const [hasError, setHasError] = useState('')
  const [physicalSelection, setPhysicalSelection] = useState('')
  const [competitiveSelection, setCompetitiveSelection] = useState('')
  const [creativeSelection, setCreativeSelection] = useState('')
  const [indoorSelection, setIndoorSelection] = useState('')
  const [filteredActivities, setFilteredActivities] = useState([])
  const [randomActivity, setRandomActivity] = useState(null)
  // make a call to get everything, 
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/activities')
        setActivities(data)
      } catch (err) {
        setHasError(err.response)
        console.log('ERROR WHILE GETTING activity', err)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const handleRandomSelection = () => {
    const randomNumber = Math.floor(Math.random() * activities.length)
    const randomActivity = activities[randomNumber]
    setRandomActivity(randomActivity)
  }
  useEffect(() => {
    const filteredArray = (filteredActivities.length ? filteredActivities : activities).filter(activity => {
      return activity.physical === physicalSelection && (!competitiveSelection || activity.competitive === competitiveSelection) && (!creativeSelection || activity.creative === creativeSelection) && (!indoorSelection || activity.environment === indoorSelection)
    })
    setFilteredActivities(filteredArray)
  }, [physicalSelection, competitiveSelection, creativeSelection, indoorSelection])
  return (
    <>
      <div className="generator-area" style={{ minHeight: '25vh' }}>
        {indoorSelection && filteredActivities.length ? <h2 className="adventure">Select your adventure!</h2> : <h2 className="select-adv"> I want a new adventure that is ...</h2>}
        {!physicalSelection && <div className="Physical" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '200px' }}>
          <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="outline-success" value="Physical" onClick={(event) => setPhysicalSelection(event.target.value)} size="lg">Physical</Button>{' '}
          <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="outline-success" value="Non-Physical" onClick={(event) => setPhysicalSelection(event.target.value)} size="lg">Non-physical</Button>{' '}
        </div>}
        {(physicalSelection && !competitiveSelection) && <div className="Competitive" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '400px' }}>
          <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="outline-danger" value="Competitive" onClick={(event) => setCompetitiveSelection(event.target.value)} size="lg">Competitive</Button>{' '}
          <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="outline-danger" value="Non-Competitive" onClick={(event) => setCompetitiveSelection(event.target.value)} size="lg">Non-Competitive</Button>{' '}
        </div>}
        {(competitiveSelection && !creativeSelection) && <div className="Creative" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '400px' }}>
          <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="outline-dark" value="Yes" onClick={(event) => setCreativeSelection(event.target.value)} size="lg">Creative</Button>{' '}
          <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="outline-dark" value="No" onClick={(event) => setCreativeSelection(event.target.value)} size="lg">Non-Creative</Button>{' '}
          <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="outline-dark" value="Sometimes" onClick={(event) => setCreativeSelection(event.target.value)} size="lg">Sometimes</Button>{' '}
        </div>}
        {(creativeSelection && !indoorSelection) && <div className="Indoor" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '400px' }}>
          <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="outline-warning" value="Indoor" onClick={(event) => setIndoorSelection(event.target.value)} size="lg">Indoor</Button>{' '}
          <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="outline-warning" value="Outdoor" onClick={(event) => setIndoorSelection(event.target.value)} size="lg">Outdoor</Button>{' '}
          <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="outline-warning" value="Both" onClick={(event) => setIndoorSelection(event.target.value)} size="lg">Both</Button>{' '}
        </div>}
      </div>
      {indoorSelection ? filteredActivities.length ?
        <section>
          <Container>
            <Row xs="6" sm="3">
              {filteredActivities.map(activity => {
                return <ActivityCard key={activity._id} {...activity} />
              })}
            </Row>
          </Container>
        </section>
        : <h2 className="select-adv">Nothing found, go back to the homepage and try again</h2> : undefined}
      <br></br>
      {!randomActivity ?
        <>
          <h2 className="select-adv">Not sure? Lets give you something random</h2>
          <div className="Random">
            <Button style={{ width: '25%', height: '40%', fontSize: 'smaller' }} variant="warning" value="random" onClick={handleRandomSelection}  >Random</Button>
          </div> </>
        :
        <Row xs="1" sm="2" md="3" style={{
          justifyContent: 'center',
        }}>
          <ActivityCard {...randomActivity} />
        </Row>}
    </>
  )
}
export default Generator