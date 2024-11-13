import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/stroe';
import axios from 'axios';
import { setMissiles } from '../../store/features/missileSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';


const BASE_URL = import.meta.env.VITE_BASE_URL

const AttackPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { missiles } = useSelector((state: RootState) => state.missile);
  const { organization } = useSelector((state: RootState) => state.user);
  const [missilesOrg, setmissiles] = useState(null)

  useEffect(() => {
     const fetchMissiles = async () => {
        try {
          const response = await axios.get(`${BASE_URL}missiles`);
          const org = organization
          
          dispatch(setMissiles(response.data));
        } catch (error) {
          console.error('Failed to fetch missiles', error);
        }
      };
      fetchMissiles()
    }, []);


  return (
    <div>
      <h2>organization: {} {organization}</h2>
      <h3>available missiles :</h3>
      <ul>
        {missiles.map((missile) => (
          <li key={missile.id}>{missile.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AttackPage;