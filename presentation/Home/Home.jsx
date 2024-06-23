import { useEffect, useState } from "react";
import { Carousel } from "../../components/Carousel/Carousel";
import './Home.css'

export const Home = () => {
  return (
    <>
      <h1 className="home-head">Welcome to the Pod... We've Bean waiting for you.</h1>
      <h2 className="home-heading">Step into our Library to explore all the shows you've Bean craving</h2>
      <Carousel />
    </>
  );
};
