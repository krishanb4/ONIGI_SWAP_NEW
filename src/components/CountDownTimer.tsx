import React, { useEffect, useState } from "react";

type BeerData = {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
};

const CountdownTimer = () => {
  const [beerData, setBeerData] = useState<BeerData>({
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
  });

  useEffect(() => {
    const beerTime = Date.UTC(2023, 6, 10, 11, 0, 0); // May 17, 2021 in UTC

    const countdown = setInterval(() => {
      const now = Date.now();
      const distance = beerTime - now;

      if (distance < 0) {
        clearInterval(countdown);
        setBeerData({
          seconds: "00",
          minutes: "00",
          hours: "00",
          days: "00",
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0");
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0");
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0");

        setBeerData({
          seconds,
          minutes,
          hours,
          days,
        });
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  return (
    <div className="w-[380px] md:min-w-screen bg-tranparent flex items-center justify-center px-5 py-5">
      <div className="text-yellow-400">
        <h1 className="text-3xl text-center mb-3 font-extralight">
          Token Claim will open
        </h1>
        <div className="text-6xl text-center flex w-full items-center justify-center">
          <div className="text-2xl mr-1 font-extralight">in</div>
          <div className="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
            <div className="font-mono leading-none">{beerData.days}</div>
            <div className="font-mono uppercase text-sm leading-none">Days</div>
          </div>
          <div className="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
            <div className="font-mono leading-none">{beerData.hours}</div>
            <div className="font-mono uppercase text-sm leading-none">
              Hours
            </div>
          </div>
          <div className="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
            <div className="font-mono leading-none">{beerData.minutes}</div>
            <div className="font-mono uppercase text-sm leading-none">
              Minutes
            </div>
          </div>

          <div className="text-2xl mx-1 font-extralight hidden md:block">
            and
          </div>
          <div className="w-24 mx-1 p-2 bg-white text-yellow-500 hidden md:block rounded-lg">
            <div className="font-mono leading-none">{beerData.seconds}</div>
            <div className="font-mono uppercase text-sm leading-none">
              Seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
