import axios from 'axios';
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setUser } from '../../store/features/userSlice';
import './LoginForm.css'



const BASE_URL = import.meta.env.VITE_BASE_URL




const LoginForm = () => {
  // const {user} = useSelector((state: RootState)=> state)

  const navigate = useNavigate()
  const dispatch =  useAppDispatch()
  const [formData, setFormData] = useState({
    username: '',
    password: '',           
  });


  const handleChange = (e:any)=>{
    const {name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
  }

  const handleLogin = ()=>{
    setTimeout(() => {
      navigate('/register')
  }, 500);
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  try {
    const res = await axios.post(`${BASE_URL}login`, formData);
    const foundUser = {...res.data.user, location:''}

    dispatch(setUser(foundUser));
    navigate(res.data.user.organization === 'IDF' ? '/defense' : '/attack');
  } catch (err) {
    console.error(err);
  }

  }

  return (
    <div className="LoginForm">
      <h1>Login</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder="User Name" onChange={(e:any)=>handleChange(e)}/>
        <input type="password" name='password'  placeholder="password" onChange={handleChange}/>
        <input type="submit" className='submit' />
      </form>
      <button onClick={()=> handleLogin()} >Register</button>

    </div>
  )
}

export default LoginForm