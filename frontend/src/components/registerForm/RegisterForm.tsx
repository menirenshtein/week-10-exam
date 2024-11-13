import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from '../../hooks/useAppDispatch';
import axios from 'axios';
import './registerform.css'

const BASE_URL = import.meta.env.VITE_BASE_URL

const RegisterForm = () => {

  const [formData, setFormData] = useState({
      username: '',
      password: '',
      organization: '',  
      location: ''      
  });
  const selectRef = useRef<HTMLSelectElement>(null)
  const navigate = useNavigate()
  // const dispatch =  useAppDispatch()

  const handleChange = (e:any)=>{
  const {name, value } = e.target;
  setFormData({
      ...formData,
      [name]: value
  });
  // console.log(formData);
  }
  
  const handleRegister = ()=>{
      setTimeout(() => {
          navigate('/')
      }, 500);
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const user = {
        ...formData, location: formData.organization === 'IDF' ? formData.location : ''
      }
      console.log(`${BASE_URL}register`);
      const response =  await axios.post(`${BASE_URL}register`, user);
      console.log(response);
      navigate('/');
    } catch (err) {
      console.log('object');
      console.error(err);
    }
  };
    
  const handleOrg = ()=>{
    if (formData.organization == 'IDF') {
      //@ts-ignore
      selectRef.current.disabled = false 
    }
  }
    
  return (
    <div className='RegisterForm'>
         <h1>Register</h1>
      <form className='form'  onSubmit={(e:React.FormEvent<HTMLFormElement>)=>handleSubmit(e)}>
        <input type="text" name='username' placeholder="User Name" onChange={handleChange}/>
        <input type="password"  name='password' placeholder="password" onChange={handleChange}/>
        <select name="organization" onClick={()=>handleOrg()} onChange={handleChange}>
          <option value="org" onChange={handleChange}>choose an organization</option>
          <option value="IDF">IDF</option>
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="IRAN">IRAN</option>
          <option value="Houthis">Houthis</option>
        </select>
        <select name="location" disabled ref={selectRef}>
          <option value="north" onChange={handleChange}>north</option>
          <option value="">west</option>
          <option value="">center</option>
          <option value="">Judea and Samaria</option>
        </select>
        <input type="submit" className='submit' />
      </form>
      <button onClick={()=> handleRegister()} >Login</button>

    </div>
  )
}

export default RegisterForm