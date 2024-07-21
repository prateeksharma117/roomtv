"use client"

import CallList from "@/components/shared/CallList";
import React from "react";
import { motion } from "framer-motion";

const Upcoming = () => {
  return (
    <section className=" flex size-full flex-col gap-10 text-white">
      <h1 className=" text-3xl font-bold">Up coming</h1>
      <motion.div
        initial={{ opacity: 0.7, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CallList type="upcoming" />
      </motion.div>
    </section>
  );
};

export default Upcoming;
