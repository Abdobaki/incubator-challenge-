import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import ProgramsOverview from '../components/home/ProgramsOverview';
import { StartupsPreview, Testimonials } from '../components/home/StartupTestimonials';
import { Partners, LatestNews } from '../components/home/PartnersNews';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Stats />
      <ProgramsOverview />
      <StartupsPreview />
      <Partners />
      <Testimonials />
      <LatestNews />
    </>
  );
}
