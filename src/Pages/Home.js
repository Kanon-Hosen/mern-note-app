import React from 'react';
import AddNote from '../components/AddNote';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <AddNote></AddNote>
        </div>
    );
};

export default Home;