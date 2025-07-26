import React from 'react';
import Navbar from './Navbar';
import AboutMe from './AboutMe';
import ProfessionalExperience from './ProfessionalExperience';
import ContactMe from './ContactMe';

const MainPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <AboutMe />
        <ProfessionalExperience />
        <ContactMe />
      </main>
    </>
  );
};

export default MainPage;