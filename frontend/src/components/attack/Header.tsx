import { useSelector } from 'react-redux';
import './Header.css'
import { RootState } from '../../store/stroe';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logout } from '../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';




const Header = () => {
  const dispatch = useAppDispatch();
  const { organization } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate()

  const handleLogout = () =>{
    setTimeout(()=>{
      dispatch(logout())
      navigate('/')
    },500)
  }

  return (
    <div className='Header'>
      <h2>organization: {} {organization}</h2>
      <button className='bbb' onClick={()=> handleLogout()}>logout</button>
    </div>
  )
}

export default Header