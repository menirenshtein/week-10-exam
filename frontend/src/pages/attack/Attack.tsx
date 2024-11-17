import { FC } from 'react';
import Header from '../../components/attack/Header';
import Weapons from '../../components/attack/Weapons';
import './Attack.css'


const AttackPage:FC = () => {
 
  return (
    <div className='AttackPage'>
      <Header/>
      <Weapons/>
    </div>
  );
};

export default AttackPage;