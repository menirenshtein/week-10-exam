import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/stroe';
import axios from 'axios';
import { Missile, setMissiles } from '../../store/features/missileSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Organization from '../../types/organization';


const BASE_URL = import.meta.env.VITE_BASE_URL

const AttackPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { missiles } = useSelector((state: RootState) => state.missile);
  const { organization } = useSelector((state: RootState) => state.user);
//   const [missilesOrg, setmissiles] = useState<{name:string, amount:number}[] | ''>('')

useEffect(() => {
    (async () => {
      try {
        const [responseOrg, responseMis] = await Promise.all([
          axios.get(`${BASE_URL}missiles/organization`),
          axios.get(`${BASE_URL}missiles`)
        ]);
  
        const org = responseOrg.data.find((o: Organization) => o.name === organization);
        
        console.log(responseOrg.data);
        console.log(organization);
        if (org) {
            const missileNames = org.resources.map((r:any) => r.name);
            dispatch(setMissiles(responseMis.data.filter((m: any) => missileNames.includes(m.name))));
            console.log(missiles);
        }
      } catch (error) {
        console.error('Failed to fetch missiles', error);
      }
    })();
  }, [organization]);
  


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