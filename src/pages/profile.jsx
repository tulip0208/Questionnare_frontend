import React from "react";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Flowbite, Button, TextInput, Alert } from 'flowbite-react';

import Header from '../components/header'
import LiftSide from "../components/liftside"

import config from "../app/config";
import axios from "axios";

import { HiOutlineCheck, HiOutlineXCircle } from 'react-icons/hi';
import lang from "../lang/lang";

function Profile() {

  const navigate = useNavigate();

  const { token } = useSelector((store) => store.user);

  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("")
  const [status, setStatus] = useState("")

  const customTheme1 = {
    "base": "flex flex-col gap-2 p-3 text-sm",
    "borderAccent": "border-t-4",
    "closeButton": {
      "base": "ml-auto inline-flex h-8 w-8 rounded-lg p-1.5",
      "icon": "w-5 h-5",
      "color": {
        "failure": "bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300",
        "success": "bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300",
      }
    },
    "color": {
      "failure": "text-red-700 bg-red-100 border-red-500 dark:bg-red-200 dark:text-red-800",
      "success": "text-green-700 bg-green-100 border-green-500 dark:bg-green-200 dark:text-green-800",
    },
    "icon": "mr-3 inline h-5 w-5 flex-shrink-0",
    "rounded": "rounded-lg",
    "wrapper": "flex items-center"
  };

  useEffect(() => {
  }, [])

  const changePassword = () => {
    setStatus("")
    axios.post(`${config.server_url}/putpassword`, { password, newPassword })
          .then( response => {
            if(response.data.message === "sucess") {
              setStatus("sucess")
            }
          })
          .catch( err => {
            setStatus("failed")
          } )
  }

  const renderStatus = () => {
    if (status === "sucess") {
      return (
        <Alert className="mt-8 mb-2" theme={customTheme1} color="success" icon={HiOutlineCheck} onDismiss={() => dispatch(resetStatus())} rounded>
        <span className="font-medium">{lang("japan", "created")}</span>
      </Alert>

      )
    }
    else if(status === "failed") {
      return(      <Alert className="mt-8 mb-2" theme={customTheme1} color="failure" icon={HiOutlineXCircle} onDismiss={() => dispatch(resetStatus())} rounded>
        <span className="font-medium">{lang("japan", "failed")}</span>
      </Alert>
)    }
    else if(status === "no match") {
      return(      <Alert className="mt-8 mb-2" theme={customTheme1} color="failure" icon={HiOutlineXCircle} onDismiss={() => dispatch(resetStatus())} rounded>
        <span className="font-medium">{lang("japan", "no_match")}</span>
      </Alert>
)    }
  }

  return (
    <Flowbite>
      <Header></Header>
      <main className="flex flex-row width-1200 mx-auto my-0">
        <LiftSide select={4}></LiftSide>
        <div className="basis-6/7 px-10 py-12 grow">
          <h1>プロフィール</h1>
          {renderStatus()}
          <div className="mt-5 flex flex-col w-6/12">
            <label htmlFor="">古いパスワード</label>
            <TextInput type="password" value={password} onChange={e => { setPassword(e.target.value) }} />
            <label htmlFor="">新しいパスワード</label>
            <TextInput type="password" value={newPassword} onChange={e => { setNewPassword(e.target.value) }} />
            <label htmlFor="">パスワード確認</label>
            <TextInput type="password" value={newPasswordConfirm} onChange={e => { setNewPasswordConfirm(e.target.value); if(newPassword !== e.target.value) {setStatus("no match")} else setStatus("match") }} />
            <Button onClick={() => { changePassword() }} type="button">暗号変更</Button>
          </div>
        </div>
      </main>
    </Flowbite>
  );
}

export default Profile

