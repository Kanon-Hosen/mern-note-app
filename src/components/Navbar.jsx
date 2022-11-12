import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const handleLogout = () => {
        signOut(auth)
        .then(()=>console.log('successfully logout'))
    }
    return (
        <div className='w-full md:px-20 px-10 mx-auto flex items-center justify-between h-14 shadow-sm'>
            <div className='flex gap-1 text-xl cursor-pointer'><p className='text-teal-500 font-bold'>My</p>Note</div>
            <div className='flex items-center gap-5'>
                {
                    user && <p className='cursor-pointer text-sm'>Hi, {user.displayName}</p>
                }
                <Link onClick={handleLogout} className='px-4 py-2 text-white bg-teal-500 rounded-full'>Logout</Link>
            </div>
        </div>
    );
};

export default Navbar;