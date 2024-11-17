import { useSelector } from 'react-redux';
import './Header.css'
import { RootState } from '../../store/stroe';




const Header = () => {

  const { organization } = useSelector((state: RootState) => state.user);

  return (
    <div className='Header'>
      <h2>organization: {} {organization}</h2>
    </div>
  )
}

export default Header