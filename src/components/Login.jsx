import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/syn_logo.png";
import jwt_decode from "jwt-decode";

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const successHandler = (credentialResponse) => {
    const decodedCredential = jwt_decode(credentialResponse.credential);
    decodedCredential.googleId = decodedCredential.aud;
    decodedCredential.imageUrl = decodedCredential.picture;

    localStorage.setItem('user', JSON.stringify(decodedCredential));

    const { name, googleId, imageUrl } = decodedCredential;
    // Saving user data to sanity
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl
    }

    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', {replace : true});
    })
  }

  const errorHandler = () => {
    console.log('Login Failed');
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        ></video>
      </div>

      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="p-3">
          <img src={logo} alt="logo" width="200px"/>
        </div>
        <div className="shadow-2xl">
          <GoogleLogin
            onSuccess={successHandler}
            onError={errorHandler}
          />;
        </div>
      </div>
    </div>
  );
};

export default Login;
