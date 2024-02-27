import React from "react";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HiOutlineCheck, HiOutlineXCircle } from 'react-icons/hi';
import { Flowbite, Select, Table, Button, Checkbox, FloatingLabel, Modal, Label, TextInput, Alert } from 'flowbite-react';

import { view, createOrUpdate, deleteStore, resetError, resetStatus } from '../features/storeSlice'
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { HiInformationCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom'

import lang from "../lang/lang";

import config from "../app/config";

import Header from '../components/header'
import LiftSide from "../components/liftside"

import axios from "axios";

function PaperGroup() {

  //server data
  const [papergroup, setPaperGroup] = useState([])
  const [paperSetting, setPaperSetting] = useState([])

  const navigate = useNavigate();

  const getData = () => {
    axios.get(`${config.server_url}/group/view`)
      .then(function (response) {
        setPaperGroup(response.data.group)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get(`${config.server_url}/papersetting/view`)
      .then(function (response) {
        setPaperSetting(response.data.questions)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData();
  }, [])

  const createOne = () => {
    axios.post(`${config.server_url}/group/create`)
      .then(function (response) {
        getData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteOne = (value) => {
    axios.post(`${config.server_url}/group/delete`, { id: value })
      .then(function (response) {
        getData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const enterPaperSetting = (value) => {
    navigate('/papersetting?id=' + value, { replace: true });
  }

  return (
    <Flowbite>
      <Header></Header>
      <main className="flex flex-row width-1200 mx-auto my-0">
        <LiftSide select={0}></LiftSide>
        <div className="basis-6/7 px-10 py-12 flex flex-col grow">
          <h1 className="text-gray-900">アンケート設定</h1>
          <div className="mt-6">
            <Button type="button" onClick={() => { createOne() }} >新しく作成</Button>
          </div>
          <div className="flex flex-wrap mt-3">
            {papergroup.map(item => (
              <section onClick={() => { enterPaperSetting(item.id) }} key={item.id} className=" rounded-lg border border-gray-300 mt-5 mr-14 w-56 h-64 relative hover:shadow-lg cursor-pointer ease-in duration-300">
                <span className=" absolute left-1 top-1">{item.id}</span>
                <div className=" absolute -left-2 -top-2 w-56 h-64 border border-gray-300 rotate-6">
                </div>
                <div className=" absolute -left-2 -top-2 w-56 h-64 border border-gray-300 rotate-2">
                </div>
                <div className=" absolute top-16 left-10 z-10">
                  <label className=" font-bold text-gray-500" htmlFor="">アンケートペジ数</label><br></br>
                  {paperSetting.filter(item1 => parseInt(item1.group_id) === item.id).length < 10 && <span className=" text-6xl absolute top-10 left-12 text-gray-500">{paperSetting.filter(item1 => parseInt(item1.group_id) === item.id).length}</span>}
                  {paperSetting.filter(item1 => parseInt(item1.group_id) === item.id).length >= 10 && <span className=" text-6xl absolute top-10 left-6 text-gray-500">{paperSetting.filter(item1 => parseInt(item1.group_id) === item.id).length}</span>}
                </div>
                <div className="absolute bottom-5 right-7 flex flex-row">
                  <Button className="ml-1" onClick={(e) => { e.stopPropagation(); deleteOne(item.id) }} color="gray">削除</Button>
                </div>
              </section>
            ))}
          </div>
        </div>


      </main>
    </Flowbite>
  );
}

export default PaperGroup

