import React from "react";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Flowbite, Button } from 'flowbite-react';

import Header from '../components/header'
import LiftSide from "../components/liftside"

const customTheme = {
  navbar: {
    color: {
      primary: 'bg-red-500 hover:bg-red-600',
    },
  },
};

function Home() {

  const navigate = useNavigate();

  const { token } = useSelector((store) => store.user);

  useEffect(() => {
  }, [])

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Header></Header>
      <main className="flex flex-row">
        <LiftSide></LiftSide>
        <div className="basis-6/7 px-10 py-12">
          <h1>home</h1>
        </div>
      </main>
    </Flowbite>
  );
}

export default Home

