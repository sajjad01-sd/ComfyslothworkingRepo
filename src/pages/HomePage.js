import React from "react";
import { FeaturedProducts, Hero, Services, Contact } from "../components";
import useGlobalState from "../globalState/globalState";
const HomePage = () => {
 
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
