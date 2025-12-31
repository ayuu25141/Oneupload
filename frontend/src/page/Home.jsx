import { useRef } from "react";
import WobbleCardDemo from "../component/WobbleCardDemo";
import Half from "../component/Half";
import Hero from "../component/Hero";
import Nav from "../component/Nav";
import TestimonialSection from "../component/TestimonialSection";
import Footer from "../component/Footer";
import Cta from "../component/Cta";
import Details from "@/component/Details";

function Home() {
  const heroRef = useRef(null);
  const detailsRef = useRef(null);   // <Half />
  const featuresRef = useRef(null);  // <WobbleCardDemo />

  return (
    <>
      <Nav
        heroRef={heroRef}
        detailsRef={detailsRef}
        featuresRef={featuresRef}
      />

      <div ref={heroRef}>
        <Hero />
        <Details />
      </div>

      <div ref={detailsRef}>
        <Half />
      </div>

      <div ref={featuresRef}>
        <WobbleCardDemo />
      </div>

      <TestimonialSection />
      <Cta />
      <Footer />
    </>
  );
}

export default Home;
