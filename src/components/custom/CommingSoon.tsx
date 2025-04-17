"use client";
import React from "react";
import { motion } from "motion/react";

const dotAnimation = {
  animate: {
    opacity: [0, 1, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const containerAnimation = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const CommingSoon = () => {
  return (
    <div className="center h-screen w-full">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="text-3xl font-bold text-white sm:text-5xl"
      >
        <motion.span
          className="inline-block text-[1.2em] text-purple-600"
          initial={{ rotate: 0 }}
          animate={{ rotate: -4 }}
          transition={{ type: "spring", stiffness: 100, delay: 1 }}
        >
          C
        </motion.span>
        omming soon <span>&nbsp;</span>
        <motion.span
          variants={containerAnimation}
          initial="initial"
          animate="animate"
          className="text-purple-400"
        >
          <motion.span variants={dotAnimation}>.</motion.span>
          <motion.span variants={dotAnimation}>.</motion.span>
          <motion.span variants={dotAnimation}>.</motion.span>
          <motion.span variants={dotAnimation}>.</motion.span>
        </motion.span>
      </motion.div>
    </div>
  );
};

export default CommingSoon;
