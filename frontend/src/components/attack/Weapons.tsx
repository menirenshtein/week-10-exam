import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import "./Weapons.css";
import { RootState } from "../../store/stroe";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import Organization from "../../types/organization";
import { setMissiles } from "../../store/features/missileSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Weapons: FC = () => {
  const dispatch = useAppDispatch();
  const { missiles } = useSelector((state: RootState) => state.missile);
  const { organization } = useSelector((state: RootState) => state.user);
  const [missilesOrg, setMissilesE] = useState<
    { name: string; amount: number }[] | null
  >(null);
  const [Launch, setLaunch] = useState<{ org: string; missile: string } | null>(
    null
  );

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

  const handleLaunch = async (missile: string) => {
    setLaunch({ org: organization, missile });
    const response = await axios.put(`${BASE_URL}missiles/launch`, Launch);
    setMissilesE(response.data.resources);
    console.log(organization, missile);
  };

  return (
    <div className="Weapons">
      <h3>available missiles :</h3>
      <ul>
        {missiles.map((missile) => (
          <li
            
            key={missile.id}
          >
            <a  onClick={() => {
              handleLaunch(missile.name);
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
    
  );
};

export default Weapons;
