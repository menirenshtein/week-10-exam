import './Trow.css'

import { FC, useEffect, useState } from "react";

interface Threat {
  missile: string;
  speed: number;
  status: string;
}

interface TrowProps {
  threats: Threat[];
}

const TRow: FC<TrowProps> = ({ threats }) => {
  const [timeLeft, setTimeLeft] = useState<number[]>([]);

  useEffect(() => {
    setTimeLeft((prevTimes) => {
      const newTimes = [...prevTimes];
      threats.forEach((t, index) => {
        if (newTimes[index] === undefined) {
          newTimes[index] = t.speed; 
        }
      });
      return newTimes;
    });
  }, [threats]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimes) =>
        prevTimes.map((time) => (time > 0 ? time - 1 : time)) 
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="TRow">
      {/* <table> */}
        <tbody>
          {threats.map((t, index) => (
            <tr key={index}>
              <td>
                <h4>{t.missile}</h4>
              </td>
              <td>
                <h4>{timeLeft[index] ?? "N/A"}</h4> {}
              </td>
              <td>
                <h4>{timeLeft[index] > 0 ? "Launched" : " hit" }</h4> {}
              </td>
            </tr>
          ))}
        </tbody>
      {/* </table> */}
    </div>
  );
};

export default TRow;