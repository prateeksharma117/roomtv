"use client";

import MeetingTypeList from "@/components/shared/MeetingTypeList";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const time = now
    ? now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const date = now
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now)
    : "";

  return (
    <motion.div
      initial={{ opacity: 0.7, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <section className=" flex size-full flex-col gap-10 text-white">
        <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
          <div className=" flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
            <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
              Upcoming Meeting at: 12:30 PM
            </h2>
            <div className=" flex flex-col gap-2">
              <h1 className=" text-4xl font-extrabold lg:text-7xl">{time}</h1>
              <p className=" text-lg font-medium text-sky-1 lg:text-2xl">
                {date}
              </p>
            </div>
          </div>
        </div>

        <MeetingTypeList />
      </section>
    </motion.div>
  );
};

export default Home;
