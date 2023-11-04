import { Nav, Container } from 'react-bootstrap'
import ConnectWalletButton from './Connect'

const Header = () => {
  const date = new Date()
  return (
    <Nav className='bg-primary p-2 background'>
      <Container className='d-flex justify-content-between align-items-center'>
        <h3 className='fw-bold'>Cloud Habits</h3>
        <span>{date.toDateString()}</span>
        <div>
          <ConnectWalletButton />
        </div>
      </Container>
    </Nav>
  )
}

export default Header
