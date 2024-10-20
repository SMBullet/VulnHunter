import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import demoUrl from '../../assets/Hero.png';

function LandingPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate('/scanner'); // Navigate to /scanner when clicked
  };

  return (
    <section className='hero-section text-center mt-32 flex flex-col'>
      <h1 className='text-4xl font-extrabold leading-[1.15] text-white sm:text-6xl'>
        Secure Your Systems
        <br />
        <span className='bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent'>
          With a single click
        </span>
      </h1>
      <h2 className='mt-5 text-gray-400 sm:text-xl'>
        Vulnhunter is a tool that integrates multiple security scanners to identify vulnerabilities in your systems.
      </h2>
      <div className='mx-auto mt-5 flex max-w-fit space-x-4'>
        <button
          onClick={handleGetStarted}  // Call handleGetStarted on click
          className='rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm border-white bg-white text-black hover:bg-transparent hover:text-white hover:ring-gray-400 hover:ring-2 transition duration-300 ease-in-out'
        >
          Get Started
        </button>
      </div>
      <div className='mt-1 items-center justify-center'>
        <img src={demoUrl} alt='Demo' className='mx-auto size-[300px]' />
      </div>
    </section>
  );
}

export default LandingPage;
