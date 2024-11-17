import { FC } from 'react';
import Header from '../../components/attack/Header';
import Table from '../../components/attack/Table';
import Weapons from '../../components/attack/Weapons';
import './Attack.css'


const AttackPage:FC = () => {
 
  return (
    <div className='AttackPage'>
      <Header/>
      <Weapons/>
      <Table/>     
    </div>
  );
};

export default AttackPage;