import React from "react";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Header from '../components/header'
import LiftSide from "../components/liftside"

function Profile() {

  const navigate = useNavigate();

  const { token } = useSelector((store) => store.user);

  useEffect(() => {
  }, [])

  return (
    <>
      <Header></Header>
      <LiftSide></LiftSide>
    </>
  );
}

export default Profile

