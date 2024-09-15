import React, { useRef } from 'react';
import LandingPage from './LandingPage';
import FirstHome from './FirstHome';

const Home = () => {
  const firstHomeRef = useRef(null); // Create a reference for FirstHome section

  const scrollToFirstHome = () => {
    if (firstHomeRef.current) {
      firstHomeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <LandingPage/>
    </div>
  );
};

export default Home;
