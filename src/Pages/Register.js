import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import RegisterImg from "../image/Prototyping process-pana.png";

const Register = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const handleRegister = (e) => {
    setLoader(true);
    e.preventDefault();
    const name = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        e.target.reset();
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            navigate("/");
            setLoader(false);
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => {
        setError(err.message);
        e.target.reset();
        setLoader(false);
      });
  };

  //Google :::::::::::::::::::::

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/");
  };

  const handleFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/");
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full px-10 md:px-32 h-full md:h-full mx-auto shadow-lg p-5 gap-4 md:gap-0 relative">
      {loader ? (
        <div className="w-full h-full z-40 bg-black bg-opacity-20 absolute top-0 left-0 flex items-center justify-center">
          <div>
            <div className="flex items-center z-50 justify-center space-x-2">
              <div className="w-4 h-4 rounded-full animate-pulse bg-teal-500"></div>
              <div className="w-4 h-4 rounded-full animate-pulse bg-teal-500"></div>
              <div className="w-4 h-4 rounded-full animate-pulse bg-teal-500"></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full md:w-1/2">
        <img src={RegisterImg} alt="" />
      </div>
      <div className="w-96 p-6">
        <h1 className="text-4xl font-bold mb-8">Register</h1>
        <div>
          <form onSubmit={handleRegister} className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              className="border p-3 border-gray-500 rounded mb-2"
              type="text"
              required
              placeholder="Username"
            />
            <label htmlFor="Email">Email</label>
            <input
              name="email"
              className="border p-3 border-gray-500 rounded mb-2"
              type="email"
              required
              placeholder="Enter your email"
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              className="border p-3 border-gray-500 rounded mb-5"
              type="password"
              required
              placeholder="Enter your password"
            />
            <p className="font-semibold text-red-500 text-sm">{error}</p>
            <button
              type="submit"
              className="btn bg-teal-500 border-none p-3 rounded text-white"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-5 font-semibold">Or register with </p>
          <div className="mt-3 flex items-center justify-center gap-8">
            <div
              onClick={handleGoogle}
              className="flex items-center text-base font-semibold gap-1 cursor-pointer hover:text-teal-500 transition-colors"
            >
              <BsGoogle></BsGoogle>
              <p>Google</p>
            </div>
            <div
              onClick={handleFacebook}
              className="flex items-center text-base font-semibold gap-1 cursor-pointer hover:text-teal-500 transition-colors"
            >
              <BsFacebook></BsFacebook>
              <p>Facebook</p>
            </div>
          </div>
          <p className="mt-3 text-center text-sm">
            Already have an account ?{" "}
            <Link
              className="font-semibold hover:underline transition-all"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
