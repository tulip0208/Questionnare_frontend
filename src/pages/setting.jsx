import React from "react";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HiOutlineCheck, HiOutlineXCircle } from 'react-icons/hi';
import { Flowbite, Select, Table, Button, Checkbox, FloatingLabel, Modal, Label, TextInput, Alert } from 'flowbite-react';

import { view, createOrUpdate, deleteStore, resetError, resetStatus } from '../features/storeSlice'
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { HiInformationCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

import lang from "../lang/lang";

import config from "../app/config";

import Header from '../components/header'
import LiftSide from "../components/liftside"

import axios from "axios";

function Setting() {
  const location = useLocation();

  // Access the query string from the location object
  const queryString = location.search;

  // You can also parse the query string into an object
  const queryParams = new URLSearchParams(queryString);
  const group_id = queryParams.get('id'); // Replace 'paramName' with your actual parameter name

  //option1
  const [select_type, setSelect_type] = useState('-1')
  const [require, setRequire] = useState(false)
  const [questionId, setQuestionId] = useState('')
  const [questionNo, setQuestionNo] = useState('Q1')
  const [questionName, setQuestionName] = useState('')
  const [select1, setSelect1] = useState({})
  const [select2, setSelect2] = useState({})
  const [connect, setConnect] = useState('')

  //extra
  const [countArr, setCountArr] = useState([])
  const [detailId, setDetailId] = useState('')
  const [editId, setEditId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  //edit data
  const [editSelect_type, setEditSelect_type] = useState('')
  const [editRequire, setEditRequire] = useState(false)
  const [editQuestionId, setEditQuestionId] = useState('')
  const [editQuestionNo, setEditQuestionNo] = useState('')
  const [editQuestionName, setEditQuestionName] = useState('')
  const [editSelect1, setEditSelect1] = useState('')
  const [editSelect1_1, setEditSelect1_1] = useState({})
  const [editSelect2, setEditSelect2] = useState('')
  const [editSelect2_1, setEditSelect2_1] = useState({})
  const [editConnect, setEditConnect] = useState('')

  const [editSelectCount, setEditSelectCount] = useState('')

  //server data
  const [questions, setQuestions] = useState([])
  //error
  const [errorStatus, setErrorStatus] = useState(false)
  const [successStatus, setSuccessStatus] = useState(false)

  const [errorStatus1, setErrorStatus1] = useState(false)
  const [successStatus1, setSuccessStatus1] = useState(false)

  //modal
  const [modalOpen1, setModalOpen1] = useState(false)
  const [modalOpen2, setModalOpen2] = useState(false)

  const getData = () => {
    axios.get(`${config.server_url}/papersetting/view`)
      .then(function (response) {
        setQuestions(response.data.questions.filter(item => item.group_id === group_id))
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    setErrorStatus1(false)
    setSuccessStatus1(false)
    if (editId !== '') {
      setDetailId('')
      setEditSelect_type(questions.filter(item => item.id === editId)[0].select_type)
      setEditRequire(questions.filter(item => item.id === editId)[0].require)
      setEditQuestionId(questions.filter(item => item.id === editId)[0].question_id)
      setEditQuestionNo(questions.filter(item => item.id === editId)[0].question_no)
      setEditQuestionName(questions.filter(item => item.id === editId)[0].question_name)
      setEditSelect1(questions.filter(item => item.id === editId)[0].select1)
      setEditSelect2(questions.filter(item => item.id === editId)[0].select2)
      setEditConnect(questions.filter(item => item.id === editId)[0].connect)
      if (questions.filter(item => item.id === editId)[0].select_type === '1')
        setEditSelectCount(questions.filter(item => item.id === editId)[0].select1.split(',').length - 1)
    }
    else {
      setEditSelect_type('')
      setEditRequire(false)
      setEditQuestionId('')
      setEditQuestionNo('')
      setEditQuestionName('')
      setEditSelect1('')
      setEditSelect1_1({})
      setEditSelect2('')
      setEditSelect2_1({})
      setEditConnect('')
      setEditSelectCount('')
    }
  }, [editId])

  useEffect(() => {
    if (deleteId) {
      setDetailId('')
    }
  }, [deleteId])

  useEffect(() => {
    if (!modalOpen1) {
      setSuccessStatus(false)
      setErrorStatus(false)
      setSelect_type('-1')
      setRequire(false)
      setQuestionId('')
      setQuestionNo('Q1')
      setQuestionName('')
      setSelect1({})
      setSelect2({})
      setConnect('')
    }
  }, [modalOpen1])

  useEffect(() => {
    if (editSelect1) {
      setEditSelect1_1({})
      editSelect1.split(',').forEach((item, idx) => {
        if (item === '' || item === null || item === undefined) return;
        setEditSelect1_1((prevSelect1Status) => ({
          ...prevSelect1Status,
          ['option' + (idx + 1)]: item === '$' ? '' : item
        }));
      })
      setEditSelect2_1({})
      editSelect2.split(',').forEach((item, idx) => {
        setEditSelect2_1((prevSelect1Status) => ({
          ...prevSelect1Status,
          ['option' + (idx + 1)]: item
        }));
      })
    }
  }, [editSelect1])

  //set select count
  const setSelectCount = (value) => {
    let value1 = parseInt(value);
    let temp = []
    for (let i = 1; i <= value1; i++) {
      temp.push("option" + i)
    }
    setCountArr(temp)
  }

  const sendData1 = () => {
    //no choice
    if (select_type === '-1' || (select_type !== '1' && select_type !== '2')) {
      setErrorStatus(true)
      return;
    }
    //check empty
    let select1Value = '', select2Value = ''
    if (select_type === '1') {
      if (questionId === '' || questionName === '') {
        setErrorStatus(true)
        return;
      }
      if (Object.keys(select1).length === 0) {
        setErrorStatus(true)
        return;
      }
      for (let i in select1) {
        if (select1[i] === '' || select1[i] === null || select1[i] === undefined) {
          setErrorStatus(true)
          return;
        }
      }
      for (let i in select1) {
        select1Value += select1[i] + ','
        if (select1[i] === '' || select1[i] === null || select1[i] === undefined) {
          select2Value += ','
        }
        else select2Value += select2[i] + ','
      }
    }
    if (select_type === '2') {
      if (questionId === '' || questionName === '') {
        setErrorStatus(true)
        return;
      }
    }

    axios.post(`${config.server_url}/papersetting/create`, {
      select_type,
      group_id,
      questionId,
      questionNo,
      questionName,
      select1: select1Value,
      select2: select2Value,
      connect,
      require
    })
      .then(function (response) {
        if (response.data.message === 'created') {
          setSuccessStatus(true)
          getData()
        }
        else {
          setErrorStatus(true)
        }
      })
      .catch(err => {
        setErrorStatus(true)
        console.log(err)
      })

  }

  const sendData = () => {
    setSuccessStatus(false)
    setErrorStatus(false)

    setTimeout(() => { sendData1() }, 500)
  }

  const deleteData = () => {
    axios.post(`${config.server_url}/papersetting/delete`, {
      id: deleteId
    })
      .then(function (response) {
        setDeleteId('')
        getData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const renderSelect1 = () => {
    let select2 = questions.filter(item => item.id === detailId)[0].select2.split(',');

    return (
      questions.filter(item => item.id === detailId)[0].select1.split(',').map((item, idx) => {
        if (item !== '') {
          return (<div key={idx} className="flex flex-row items-center">
            <input className="text-xl enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500" type="radio" name="" id="" disabled />
            <label className="ml-2 text-xl flex w-56" htmlFor="">{item}</label>
            <span className="text-xl ml-5 w-48">{(select2[idx] === 'undefined' || select2[idx] === 'null' || select2[idx] === '' || select2[idx] === '-1') ? '未定' : select2[idx]}</span>
          </div>)
        }
      })
    )
  }

  const renderEditSelect1 = () => {
    return (
      editSelect1.split(',').map((item, idx) => {
        if (item !== '') {
          return (<div key={idx} className="flex flex-row items-center">
            <input className="text-2xl enabled:hover:border-gray-400 appearance-none checked:bg-gray-500 w-5 h-5 checked:bg-[length:1.5em_1.5em] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-500" type="radio" name="" id="" />
            <TextInput className="ml-2" value={editSelect1_1['option' + (idx + 1)] ? editSelect1_1['option' + (idx + 1)] : ''} onChange={e => {
              setEditSelect1_1((prevSelect1Status) => ({
                ...prevSelect1Status,
                ['option' + (idx + 1)]: e.target.value
              }))
            }} />
            <label className="text-xl ml-4" htmlFor="">割り当て</label>
            <Select value={editSelect2_1['option' + (idx + 1)]} onChange={e => {
              setEditSelect2_1((prevSelect2Status) => ({
                ...prevSelect2Status,
                ['option' + (idx + 1)]: e.target.value
              }));
            }} className="text-sm py-1 px-1 rounded border-gray-500 ml-2">
              <option value="-1"></option>
              {
                questions.map((item1, idx1) => (
                  <option key={idx1} value={item1.question_id}>{item1.question_id}</option>
                ))
              }
              <option value="最後のアンケート1">最後のアンケート1</option>
              <option value="最後のアンケート2">最後のアンケート2</option>
            </Select>
          </div>)
        }
      })
    )
  }

  const change_edit_select_count = (value) => {
    let temp = editSelect1.split(',').filter(item => item !== '');
    let temp1 = ''
    for (let i = 0; (i < temp.length || i < value); i++) {
      if (i >= value) break;
      if (i >= temp.length) {
        temp1 += '$,'
      }
      else {
        temp1 += temp[i] + ','
      }
    }

    let temp0 = editSelect2.split(',').filter(item => item !== '')
    let temp0_1 = ''
    if (value < temp0.length) {
      for (let i = 0; i < value; i++) temp0_1 += temp0[i] + ','
      setEditSelect2(temp0_1)
    }


    setEditSelectCount(value)
    setEditSelect1(temp1)
  }

  const sendData2 = () => {
    let send2_id = editId;
    let send2_select_type = editSelect_type
    let send2_question_id = editQuestionId
    let send2_question_no = editQuestionNo
    let send2_question_name = editQuestionName
    let send2_select1 = ''
    for (let i in editSelect1_1) {
      if (editSelect1_1[i] === '' || editSelect1_1[i] === null || editSelect1_1[i] === undefined) {
        setErrorStatus1(true);
        return;
      }
      send2_select1 += editSelect1_1[i] + ','
    }
    let send2_select2 = ''
    for (let i in editSelect2_1) {
      send2_select2 += editSelect2_1[i] + ','
    }
    let send2_connect = editConnect
    let send2_require = editRequire

    axios.post(`${config.server_url}/papersetting/update`, {
      id: send2_id,
      group_id,
      select_type: send2_select_type,
      questionId: send2_question_id,
      questionNo: send2_question_no,
      questionName: send2_question_name,
      select1: send2_select1,
      select2: send2_select2,
      connect: send2_connect,
      require: send2_require
    })
      .then(function (response) {
        if (response.data.message === 'success') {
          setSuccessStatus1(true)
          setTimeout(() => { getData() }, 500)
        }
        else {
          setErrorStatus1(true)
        }
      })
      .catch(err => {
        setErrorStatus1(true)
      })

  }

  const send2 = () => {
    setErrorStatus1(false)
    setSuccessStatus1(false)

    setTimeout(() => { sendData2() }, 500)
  }

  return (
    <Flowbite>
      <Header></Header>
      <main className="flex flex-row width-1200 mx-auto my-0">
        <LiftSide select={0}></LiftSide>
        <div className="basis-6/7 px-10 py-12 flex flex-col grow">
          <h1 className="text-gray-900">アンケート</h1>
          <div className="mt-6">
            <Button type="button" onClick={() => setModalOpen1(true)} >新しく作成</Button>
          </div>
          <div className="flex flex-wrap mt-3">
            {questions.map(item => (
              <section onClick={() => { setDetailId(item.id) }} key={item.id} className=" rounded-lg border border-gray-300 mt-3 ml-3 w-56 h-64 relative hover:shadow-lg cursor-pointer ease-in duration-300">
                <div className=" absolute top-16 left-16">
                  <label className=" font-bold text-gray-500" htmlFor="">{item.select_type === '1' ? '選択形式' : '入力形式'}</label>
                </div>
                <div className=" absolute top-24 left-16">
                  <label className=" font-bold text-gray-500" htmlFor="">識別子:</label>
                  <span className="ml-3 text-gray-500">{item.question_id}</span>
                </div>
                <div className="absolute top-32 left-16">
                  <label className="font-bold text-gray-500" htmlFor="">質問:</label>
                  <span className="ml-3 text-gray-500">{item.question_no}</span>
                </div>
                <label htmlFor=""></label>
                <div className="absolute bottom-1 right-1 flex flex-row">
                  <Button color="gray" onClick={() => { setEditId(item.id) }}>変更</Button>
                  <Button className="ml-1" onClick={() => { setDeleteId(item.id) }} color="gray">削除</Button>
                </div>
              </section>
            ))}
          </div>
        </div>
        {/* create modal */}
        <Modal size='7xl' show={modalOpen1} onClose={() => { setModalOpen1(false) }}>
          <Modal.Header>新しく作成</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 flex flex-col">
              <div className="modal-first-part flex flex-row items-center">
                <Select onChange={(e) => { setSelect_type(e.target.value); setErrorStatus(false); setSuccessStatus(false) }} className="text-sm py-1 px-1 rounded border-gray-500" name="year" id="">
                  <option value="-1"></option>
                  <option value="1">選択形式</option>
                  <option value="2">入力形式</option>
                </Select>
                {select_type === "1" &&
                  <div className="flex flex-row items-center">
                    <label htmlFor="カウント">カウント</label>
                    <Select onChange={(e) => { setSelectCount(e.target.value) }} className="text-sm py-1 px-1 rounded border-gray-500" name="year" id="">
                      <option value="-1"></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                    </Select>
                  </div>
                }
              </div>
              <div className="alert">
                {errorStatus === true &&
                  <Alert color="failure" icon={HiInformationCircle}>
                    <span className="font-medium">失敗</span> データを正確に入力してください。
                  </Alert>
                }
                {successStatus === true &&
                  <Alert color="info" icon={HiOutlineCheck}>
                    <span className="font-medium">成功</span> 操作に成功しました。
                  </Alert>
                }
              </div>
              <div className="modal-second-part">
                {(select_type === "1" || select_type === "2") &&
                  <div className="modal-second-part-01 flex flex-row">
                    <div className="flex flex-row items-center">
                      <label htmlFor="識別子"><small className="text-xl text-red-500">*</small>識別子</label>
                      <TextInput value={questionId} onChange={e => setQuestionId(e.target.value)} className="ml-2 w-16" />
                    </div>
                    <div className="flex flex-row items-center ml-5">
                      <label htmlFor="識別子"><small className="text-xl text-red-500">*</small>質問番号</label>
                      <Select onChange={(e) => { setQuestionNo(e.target.value) }} className="text-sm py-1 px-1 rounded border-gray-500" name="year" id="">
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                        <option value="Q4">Q4</option>
                        <option value="Q5">Q5</option>
                        <option value="Q6">Q6</option>
                        <option value="Q7">Q7</option>
                        <option value="Q8">Q8</option>
                        <option value="Q9">Q9</option>
                        <option value="Q10">Q10</option>
                        <option value="Q11">Q11</option>
                        <option value="Q12">Q12</option>
                        <option value="Q13">Q13</option>
                        <option value="Q14">Q14</option>
                        <option value="Q15">Q15</option>
                        <option value="Q16">Q16</option>
                        <option value="Q17">Q17</option>
                        <option value="Q18">Q18</option>
                      </Select>
                    </div>
                    {select_type === "2" &&
                      <div className="flex flex-row items-center ml-5">
                        <label htmlFor="必須">必須</label>
                        <Checkbox value={require} onChange={(event) => { event.target.checked ? setRequire(true) : setRequire(false) }} />
                      </div>
                    }
                  </div>
                }
                {(select_type === "1" || select_type === "2") &&
                  <div className="flex flex-row items-center mt-5 flex-grow">
                    <label htmlFor="質問"><small className="text-xl text-red-500">*</small>質問</label>
                    <TextInput value={questionName} onChange={e => setQuestionName(e.target.value)} className="ml-2 flex-grow" />
                  </div>
                }
                {select_type === '1' &&
                  <div className="modal-second-part-02 mt-5">
                    {
                      countArr.map((item, idx) => (
                        <div key={idx} className="flex flex-row items-center ml-28">
                          <label htmlFor={item}><small className="text-xl text-red-500">*</small>{"選択" + (idx + 1)}</label>
                          <TextInput className="ml-2" onChange={e => {
                            setSelect1((prevSelect1Status) => ({
                              ...prevSelect1Status,
                              [item]: e.target.value
                            }));
                          }} />
                          <label className="ml-5" htmlFor="割り当て">割り当て</label>
                          <Select onChange={e => {
                            setSelect2((prevSelect2Status) => ({
                              ...prevSelect2Status,
                              [item]: e.target.value
                            }));
                          }} className="text-sm py-1 px-1 rounded border-gray-500 ml-2" name="year" id="">
                            <option value="-1"></option>
                            {
                              questions.map((item1, idx1) => (
                                <option key={idx1} value={item1.question_id}>{item1.question_id}</option>
                              ))
                            }
                            <option value="最後のアンケート1">最後のアンケート1</option>
                            <option value="最後のアンケート2">最後のアンケート2</option>
                          </Select>
                        </div>
                      ))
                    }

                  </div>
                }
                {select_type === '2' &&
                  <div className="modal-second-part-02 flex flex-row items-center mt-5">
                    <label className="" htmlFor="割り当て">割り当て</label>
                    <Select onChange={e => { setConnect(e.target.value) }} className="text-sm py-1 px-1 rounded border-gray-500 ml-2" name="year" id="">
                      <option value="-1"></option>
                      {
                        questions.map((item1, idx1) => (
                          <option key={idx1} value={item1.question_id}>{item1.question_id}</option>
                        ))
                      }
                      <option value="最後のアンケート1">最後のアンケート1</option>
                      <option value="最後のアンケート2">最後のアンケート2</option>
                    </Select>
                  </div>
                }
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { sendData() }}>保管</Button>
            <Button color="gray" onClick={() => { setModalOpen1(false) }}>
              取り消す
            </Button>
          </Modal.Footer>
        </Modal>
        {/* view modal */}
        {detailId !== '' &&
          <Modal size='3xl' show={detailId !== ''} onClose={() => { setDetailId('') }}>
            <Modal.Header >詳細ビュー</Modal.Header>
            <Modal.Body >
              <div className="space-y-6 flex flex-col">
                <div className="flex flex-row items-center">
                  <label className=" text-xl" htmlFor="">識別子:</label>
                  <span className="ml-2 text-xl">{questions.filter(item => item.id === detailId)[0].question_id}</span>
                  {questions.filter(item => item.id === detailId)[0].select_type === '2' && <label className="ml-5 text-2xl" htmlFor="">必須:</label>}
                  {questions.filter(item => item.id === detailId)[0].select_type === '2' && <Checkbox className=" text-2xl" checked={questions.filter(item => item.id === detailId)[0].require === true} onChange={(event) => { event.target.checked ? setRequire(true) : setRequire(false) }} />}
                </div>
                <div className=" bg-white rounded-lg pt-2 pb-2">
                  <label className=" text-xl" htmlFor="">{questions.filter(item => item.id === detailId)[0].question_no + ". "}</label>
                  <span className=" text-xl">{questions.filter(item => item.id === detailId)[0].question_name}</span>
                </div>
                {questions.filter(item => item.id === detailId)[0].select_type === '1' &&
                  <div>
                    {renderSelect1()}
                  </div>
                }
                {questions.filter(item => item.id === detailId)[0].select_type === '2' &&
                  <div className="">
                    <label className=" text-xl" htmlFor="">割り当て:</label>
                    <span className="ml-2 text-xl">{questions.filter(item => item.id === detailId)[0].connect}</span>
                  </div>
                }
              </div>
            </Modal.Body>
            <Modal.Footer >
            </Modal.Footer>
          </Modal>
        }
        {/* edit modal */}
        {editId !== '' &&
          <Modal size='7xl' show={editId !== ''} onClose={() => { setEditId('') }}>
            <Modal.Header>修正</Modal.Header>
            <Modal.Body>
              <div className="space-y-6 flex flex-col">
                <div className="alert">
                  {errorStatus1 === true &&
                    <Alert color="failure" icon={HiInformationCircle}>
                      <span className="font-medium">失敗</span> データを正確に入力してください。
                    </Alert>
                  }
                  {successStatus1 === true &&
                    <Alert color="info" icon={HiOutlineCheck}>
                      <span className="font-medium">成功</span> 操作に成功しました。
                    </Alert>
                  }
                </div>
                <div className="flex flex-row items-center">
                  <label className="font-medium text-xl" htmlFor="">識別子:</label>
                  <TextInput className="ml-2" value={editQuestionId} onChange={e => setEditQuestionId(e.target.value)} />
                  <label className="ml-5 font-medium text-xl" htmlFor="">質問番号:</label>
                  <Select value={editQuestionNo} onChange={(e) => { setEditQuestionNo(e.target.value) }} className="ml-2 text-sm py-1 px-1 rounded border-gray-500 ml-1">
                    <option value="Q1">Q1</option>
                    <option value="Q2">Q2</option>
                    <option value="Q3">Q3</option>
                    <option value="Q4">Q4</option>
                    <option value="Q5">Q5</option>
                    <option value="Q6">Q6</option>
                    <option value="Q7">Q7</option>
                    <option value="Q8">Q8</option>
                    <option value="Q9">Q9</option>
                    <option value="Q10">Q10</option>
                    <option value="Q11">Q11</option>
                    <option value="Q12">Q12</option>
                    <option value="Q13">Q13</option>
                    <option value="Q14">Q14</option>
                    <option value="Q15">Q15</option>
                    <option value="Q16">Q16</option>
                    <option value="Q17">Q17</option>
                    <option value="Q18">Q18</option>
                  </Select>
                  {editSelect_type === '1' &&
                    <div className="flex flex-row items-center">
                      <label className="ml-2 font-medium text-xl" htmlFor="カウント">カウント:</label>
                      <Select value={editSelectCount} onChange={(e) => { change_edit_select_count(e.target.value) }} className="text-sm py-1 px-1 rounded border-gray-500 ml-1" name="year" id="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                      </Select>
                    </div>
                  }
                  {editSelect_type === '2' &&
                    <label className="ml-5 font-medium text-xl" htmlFor="">必須:</label>
                  }
                  {editSelect_type === '2' &&
                    <Checkbox className="font-medium text-xl" checked={editRequire === true} onChange={(event) => { event.target.checked ? setEditRequire(true) : setEditRequire(false) }} />
                  }
                </div>
                <div className="flex flex-row items-center">
                  <label className="font-medium text-xl" htmlFor="">質問名:</label>
                  <TextInput className=" ml-2 flex-grow" onChange={(e) => { setEditQuestionName(e.target.value) }} value={editQuestionName} />
                </div>
                {editSelect_type === '1' &&
                  <div>
                    {renderEditSelect1()}
                  </div>
                }
                {editSelect_type === '2' &&
                  <div className="flex flex-row items-center">
                    <label className="text-2xl" htmlFor="">割り当て:</label>
                    <Select value={editConnect} onChange={e => { setEditConnect(e.target.value) }} className="ml-2 text-sm rounded border-gray-500">
                      <option value="-1"></option>
                      {
                        questions.map((item1, idx1) => (
                          <option key={idx1} value={item1.question_id}>{item1.question_id}</option>
                        ))
                      }
                      <option value="最後のアンケート1">最後のアンケート1</option>
                      <option value="最後のアンケート2">最後のアンケート2</option>
                    </Select>
                  </div>
                }
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => { send2() }}>変更</Button>
              <Button color="gray" onClick={() => { setEditId('') }}>
                取り消す
              </Button>
            </Modal.Footer>
          </Modal>
        }
        <Modal show={deleteId !== ''} size="md" onClose={() => { setDeleteId('') }} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                このアンケートを削除しますか？
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => { deleteData() }}>
                  {"はい"}
                </Button>
                <Button color="gray" onClick={() => { setDeleteId('') }}>
                  {'いいえ'}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </main>
    </Flowbite>
  );
}

export default Setting

