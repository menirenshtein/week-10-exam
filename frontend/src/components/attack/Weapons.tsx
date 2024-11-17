import axios from "axios";
import Organization from "../../types/organization";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RootState } from "../../store/stroe";
import { FC, useEffect, useState } from "react";
import { setMissiles } from "../../store/features/missileSlice";
import "./Weapons.css";
import TableH from "./TableH";
import TRow from "./TRow";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Weapons: FC = () => {

  const dispatch = useAppDispatch();
  const { missiles } = useSelector((state: RootState) => state.missile);
  const { organization } = useSelector((state: RootState) => state.user);
  const [missilesOrg, setMissilesE] = useState<{ name: string; amount: number }[] | null>(null);
  const [Launch, setLaunch] = useState<{ org: string; missile: string } | null>( null);
  const [threats , setThreats] = useState<{missile: string, speed: number, status: string}[] | []>([])

  useEffect(() => {
    (async () => {
      try {
        const [responseOrg, responseMis] = await Promise.all([
          axios.get(`${BASE_URL}missiles/organization`),
          axios.get(`${BASE_URL}missiles`),
        ]);

        const org = responseOrg.data.find(
          (o: Organization) => o.name === organization
        );

        if (org) {
          const missileNames = org.resources.map((r: any) => r.name);
          dispatch(
            setMissiles(
              responseMis.data.filter((m: any) => missileNames.includes(m.name))
            )
          );
          const allMissiles = [...missiles, ...org.resources];
          allMissiles && setMissilesE(allMissiles);
        }
      } catch (error) {
        console.error("Failed to fetch missiles", error);
      }
    })();
  }, [organization, missilesOrg]);

  const handleLaunch = async (missile: string, speed: number) => {
    setLaunch({ org: organization, missile });
    const response = await axios.put(`${BASE_URL}missiles/launch`, Launch);
    setMissilesE(response.data.resources);
    const thea = {missile, speed, status:'Launched'}
    const temp = [...threats]
    temp.push(thea)
    setThreats(temp)
  };

  return (
    <div className="Weapons">
      <div  className="launch">
      <h3>available missiles :</h3>
      <div className="dir">


      <select name="directions" >
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="Center">Center</option>
        <option value="West Bank">West Bank</option>
      </select>
      <ul>
        {missiles.map((missile) => (
          <li
          key={missile.id}
          >
            <a  onClick={() => {
              handleLaunch(missile.name, missile.speed);
            }}>
              {missile.name} : amount -
              {missilesOrg?.map((m) => {
                return m.name === missile.name && m.amount;
              })}
            </a>
          </li>
          
        ))}
      </ul>

      </div>
        </div>
      <TableH/>
      <TRow threats={threats} />
    </div>
    
  );
};

export default Weapons;
