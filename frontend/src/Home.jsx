import React from 'react';
import Header from './Header';
import TestList from './TestList'; // Import the TestList component

const Home = () => {
  return (
    <>
      <Header />
      <div className="home">
        <h2>Курсы</h2>
        <TestList /> {/* Display the test list */}
      </div>
    </>
  );
};

export default Home;
