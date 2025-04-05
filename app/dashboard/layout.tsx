"use client";
import { Navbar } from "@/components/navbar";
import OverLayEffect from "@/components/overlay-effect";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {/* <OverLayEffect /> */}
      {children}
    </div>
  );
};

export default layout;
