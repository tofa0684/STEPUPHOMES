"use client";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { motion, type HTMLMotionProps } from "motion/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MotionDiv = (props: HTMLMotionProps<"div">) => <motion.div {...props} />;
export const MotionSection = (props: HTMLMotionProps<"section">) => <motion.section {...props} />;
export const MotionH2 = (props: HTMLMotionProps<"h2">) => <motion.h2 {...props} />;
export const MotionH3 = (props: HTMLMotionProps<"h3">) => <motion.h3 {...props} />;
export const MotionA = (props: HTMLMotionProps<"a">) => <motion.a {...props} />;
export const MotionP = (props: HTMLMotionProps<"p">) => <motion.p {...props} />;
