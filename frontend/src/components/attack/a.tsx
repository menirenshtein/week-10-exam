import React, { useState, useEffect } from 'react';

const MissileThreats = ({ threats }: { threats: { missile: string; speed: number; status: string }[] }) => {
  const [timeLeft, setTimeLeft] = useState<number[]>(threats.map(() => 0));
  const [timeLeftForM, setTimeLeftForm] = useState<number>(0);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimes) =>
        prevTimes.map((time, index) => (time > 0 ? time - 1 : time))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTimeLeft(threats.map((t) => t.speed));
  }, [threats]);

  return (
   <div>
    
   </div>
  );
};

export default MissileThreats;