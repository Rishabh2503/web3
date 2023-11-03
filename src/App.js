import Header from './components/Header'
import Overview from './components/Overview'
import HabitDisplay from './components/HabitDisplay'
import { useSelector } from 'react-redux';

import { Row, Col, Container } from 'react-bootstrap'
import { useEffect } from 'react'
import Typed from 'typed.js'
import GlassmorphismBox from './components/Web3Input'

function App() {
  // code for typed.js library
  useEffect(() => {
    const typed = new Typed('.tag', {
      strings: [
        "...okay. Let's start by tracking a habit for the next seven days.",
        "It's never too late to develop good habits.",
        'Good habits formed at youth make all the difference - Aristotle',
        'Motivation is what gets you started. Habit is what keeps you going.',
        'Habits change into character.',
      ],
      startDelay: 2000,
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 5000,
      loop: true,
    })

    // Destroying
    return () => {
      typed.destroy()
    }
  }, [])

  const { habits } = useSelector((state) => state.allHabits)
  const isHabitSelected = habits.length > 0;

  return (
    <>
      <Header />
      <Container>
        <Row className='mt-5'>
          <Col md={3}>
            <Overview />
          </Col>
          <Col md={9}>
            <HabitDisplay />
          </Col>
        </Row>
        <h4 className='text-light d-flex mt-5 justify-content-center'>
          <span className='tag'></span>
        </h4>
        {isHabitSelected && (
          <div className="bg-gradient-to-b from-blue-600 via-blue-400 to-blue-800 min-h-screen flex items-center justify-center">
            <GlassmorphismBox />
          </div>
        )}
      </Container>
    </>
  )
}

export default App
