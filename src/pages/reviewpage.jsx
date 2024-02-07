import React from "react";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Flowbite, Button, TextInput, Select, Checkbox, Modal, Rating } from 'flowbite-react';
import axios, { all } from "axios";
import { BsReverseLayoutTextSidebarReverse, BsEmojiSmile, BsEmojiFrown } from "react-icons/bs";

import moment from 'moment'

import Header from '../components/header'
import LiftSide from "../components/liftside"

import config from "../app/config";

import lang from "../lang/lang";

function ReviewPage() {

  //condition
  const [keyword, setKeyword] = useState("")
  const [unread, setUnread] = useState("-1")

  const [yearCheck, setYearCheck] = useState(false)
  const [year, setYear] = useState("-1")

  const [monthCheck, setMonthCheck] = useState(false)
  const [month, setMonth] = useState("-1")

  const [dayCheck, setDayCheck] = useState(false)
  const [day, setDay] = useState("-1")

  const [sort, setSort] = useState("2")
  const [pageno, setPageNo] = useState(1)

  //datas
  const [reviewData, setReviewData] = useState([])
  const [allCount, setAllCount] = useState(0)
  const [matchCount, setMatchCount] = useState(0)

  //detail data
  const [detail_id, setDetail_id] = useState("-1")
  const [detail_happy, setDetail_happy] = useState("-1")
  const [detail_sex, setDetail_sex] = useState("-1")
  const [detail_age, setDetail_age] = useState("-1")
  const [detail_sex_doctor, setDetail_sex_doctor] = useState("-1")
  const [detail_age_doctor, setDetail_age_doctor] = useState("-1")
  const [detail_stage_today, setDetail_stage_today] = useState("-1")
  const [detail_cure, setDetail_cure] = useState("-1")
  const [detail_waiter, setDetail_waiter] = useState("-1")
  const [detail_technical, setDetail_technical] = useState("-1")
  const [detail_pointer, setDetail_pointer] = useState("-1")
  const [detail_createdAt, setDetail_createdAt] = useState("-1")
  const [detail_store_name, setDetail_store_name] = useState("-1")
  const [detail_store_business_url, setDetail_store_business_url] = useState("-1")
  const [detail_store_questionnare_url, setDetail_store_questionnare_url] = useState("-1")

  const detailView = (id, happy, sex, age, sex_doctor, age_doctor, stage_today, cure, waiter, technical, pointer, createdAt, store_name, store_business_url, store_questionnare_url) => {
    axios.post(`${config.server_url}/review/setReadState`, { id })
      .then(function (response) {
        setDetail_id(id)
        setDetail_happy(happy)
        setDetail_sex(sex)
        setDetail_age(age)
        setDetail_sex_doctor(sex_doctor)
        setDetail_age_doctor(age_doctor)
        setDetail_stage_today(stage_today)
        setDetail_cure(cure)
        setDetail_waiter(waiter)
        setDetail_technical(technical)
        setDetail_pointer(pointer)
        setDetail_createdAt(createdAt)
        setDetail_store_name(store_name)
        setDetail_store_business_url(store_business_url)
        setDetail_store_questionnare_url(store_questionnare_url)

        find()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const find = () => {
    let month1 = month;
    if (month1 !== "-1") month1 = parseInt(month1) - 1;
    axios.post(`${config.server_url}/review/getReviewData`, { keyword, unread, year, month: month1, day, sort, pageno })
      .then(function (response) {
        setReviewData(response.data.reviewData)
        setAllCount(response.data.allCount)
        setMatchCount(response.data.matchCount)
      })
      .catch(err => {
        console.log(err)
      })

  }

  const renderPagination = () => {

    let s_no = Math.floor(pageno / 5) + 1

    let end_no = Math.ceil(matchCount / 30)

    let temp = []

    if ((s_no + 5) <= end_no) {
      for (let i = s_no; i < (s_no + 6); i++) {
        if (i === pageno)
          temp.push(<a key={i} onClick={ () => { e.preventDefault(); setPageNo(i) }} href="#" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{i}</a>)
        else temp.push(<a key={i} onClick={ () => { e.preventDefault(); setPageNo(i) }} href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{i}</a>)
      }
      // return ([

      //   <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{s_no + 1}</a>,
      //   <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">{s_no + 1}</a>,
      //   <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">{s_no + 1}</a>,
      //   <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{s_no + 1}</a>
      // ])
    }
    else {
      for (let i = s_no; i < (end_no + 1); i++)
        if (i === pageno)
          temp.push(<a key={i} onClick={ (e) => { e.preventDefault(); setPageNo(i) }} href="#" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{i}</a>)
        else temp.push(<a key={i} onClick={ (e) => { e.preventDefault(); setPageNo(i) }} href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{i}</a>)

    }

    return temp;

  }

  useEffect(() => {
    let month1 = month;
    if (month1 !== "-1") month1 = parseInt(month1) - 1;

    // console.log(month1)
    axios.post(`${config.server_url}/review/getReviewData`, { keyword, unread, year, month: month1, day, sort, pageno })
      .then(function (response) {
        setReviewData(response.data.reviewData)
        setAllCount(response.data.allCount)
        setMatchCount(response.data.matchCount)
      })
      .catch(err => {
        console.log(err)
      })

  }, [unread, year, month, day, sort, pageno])

  useEffect(() => {
    axios.post(`${config.server_url}/review/getReviewData`, { keyword, unread, year, month, day, sort, pageno })
      .then(function (response) {
        setReviewData(response.data.reviewData)
        setAllCount(response.data.allCount)
        setMatchCount(response.data.matchCount)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const renderDay = () => {
    let temp = []
    if (month === "-1") {
      return temp;
    }

    if (year !== -1 && month !== -1 && (month === "1" || month === "3" || month === "5" || month === "7" || month === "8" || month === "10" || month === "12")) {
      for (let i = 0; i < 32; i++) {
        if (i === 0) {
          temp.push(
            <option value="-1"></option>
          )
        }
        else {
          temp.push(
            <option value={i}>{i}</option>
          )
        }
      }
    }
    else if (year !== -1 && month !== -1 && (month === "4" || month === "6" || month === "9" || month === "11")) {
      for (let i = 0; i < 31; i++) {
        if (i === 0) {
          temp.push(
            <option value="-1"></option>
          )
        }
        else {
          temp.push(
            <option value={i}>{i}</option>
          )
        }
      }
    }
    else if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
      for (let i = 0; i < 30; i++) {
        if (i === 0) {
          temp.push(
            <option value="-1"></option>
          )
        }
        else {
          temp.push(
            <option value={i}>{i}</option>
          )
        }
      }
    }
    else {
      for (let i = 0; i < 29; i++) {
        if (i === 0) {
          temp.push(
            <option value="-1"></option>
          )
        }
        else {
          temp.push(
            <option value={i}>{i}</option>
          )
        }
      }
    }

    console.log(temp)
    return temp;

  }

  return (
    <Flowbite>
      <Header></Header>
      <main className="flex flex-row width-1200 mx-auto my-0">
        <LiftSide select={2}></LiftSide>
        <div className="grow px-10 py-12 basis-6/7 flex flex-col">
          <h1 className="text-gray-900">調査調査</h1>
          <div className="flex flex-col mt-5">

            <div className="condition1 ml-5 flex flex-row">
              <TextInput onKeyDown={(e) => { e.which === 13 && find() }} onChange={(e) => { setKeyword(e.target.value) }} type="text" className="text-3xl width-50-rem" name="" id="" />
              <Button className="text-3xl ml-3" type="button" onClick={() => { find() }}>検索</Button>
            </div>

            <div className="condition2 ml-5 mt-3 flex flex-row border border-gray-300 rounded items-center">

              <div className="condition2_1 h-12 rounded  flex flex-row items-center">
                <Checkbox onChange={(event) => { event.target.checked ? setUnread(1) : setUnread(-1) }} className="text-sm mr-1" name="" id="" />
                <label htmlFor="">未読</label>
              </div>

              <div className="condition2_2 h-12 ml-5 rounded  flex flex-row items-center">
                {/* <Checkbox onChange={(event) => { event.target.checked ? setYearCheck(true) : setYearCheck(false) }} className="text-sm mr-1" name="" id="" /> */}
                <Select onChange={(e) => { setYear(e.target.value) }} className="text-sm py-1 px-1 rounded border-gray-500" name="year" id="">
                  <option value="-1"></option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                  <option value="2033">2033</option>
                  <option value="2034">2034</option>
                  <option value="2035">2035</option>
                  <option value="2036">2036</option>
                  <option value="2037">2037</option>
                  <option value="2038">2038</option>
                  <option value="2039">2039</option>
                  <option value="2040">2040</option>
                </Select>
                <label className="text-sm mr-3" htmlFor="">年</label>

                {/* <Checkbox onChange={(event) => { event.target.checked ? setMonthCheck(true) : setMonthCheck(false) && setMonth("-1") }} className="text-sm mr-1" name="" id="" /> */}
                <Select onChange={e => { setMonth(e.target.value) }} className="text-sm py-1 px-1 rounded border-gray-500" name="month" id="">
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
                </Select>
                <label className="text-sm mr-3" htmlFor="">月</label>

                {/* <Checkbox onChange={(event) => { event.target.checked ? setDayCheck(true) : setDayCheck(false) && setDay("-1") }} className="text-sm mr-1" name="" id="" /> */}
                <Select onChange={e => { setDay(e.target.value) }} className="text-sm py-1 px-1 rounded border-gray-500" name="day" id="" >
                  {
                    renderDay()
                  }

                </Select>
                <label className="text-sm" htmlFor="">日</label>

              </div>

              <div className="condition2_3 ml-5 h-12 rounded  flex flex-row items-center">
                <label htmlFor="" className="text-sm py-1 px-1">ソート</label>
                <Select name="sort" className="text-sm py-1 px-1 rounded border-gray-500" id="" onChange={e => { setSort(e.target.value) }}>
                  <option value="2">登録日の降順</option>
                  <option value="1">登録日の昇順</option>
                </Select>
              </div>
            </div>

            <div className="search_result ml-5 mt-8">
              合計{allCount}件中{matchCount}件検索済み
            </div>

            <table className="mt-2 ml-5 border-collapse	">
              <thead>
                <tr className="border border-slate-300 border-l-0 border-r-0">
                  <th className="text-sm px-1 py-4">ID</th>
                  <th className="text-sm px-1 py-4 w-28">店舗名</th>
                  <th className="text-sm px-1 py-4 w-28">店舗URL	</th>
                  <th className="text-sm px-1 py-4 w-16">満足度</th>
                  <th className="text-sm px-1 py-4 break-words w-15">性別</th>
                  <th className="text-sm px-1 py-4 w-16">年齢</th>
                  <th className="text-sm px-1 py-4 w-24">治療士性別</th>
                  <th className="text-sm px-1 py-4 w-24">治療士年齢</th>
                  <th className="text-sm px-1 py-4 w-28 break-all">来店の契機</th>
                  <th className="text-sm px-1 py-4">聴覚</th>
                  <th className="text-sm px-1 py-4">接客</th>
                  <th className="text-sm px-1 py-4">技術力</th>
                  <th className="text-sm px-1 py-4 break-all">ポイント</th>
                  <th className="text-sm px-1 py-4 break-all">登録日</th>
                  <th className="text-sm px-1 py-4 break-all">詳細ビュー</th>
                </tr>
              </thead>
              <tbody>
                {
                  reviewData.length !== 0 ? reviewData.map(item => (
                    <tr key={item.id} className={item.readState === 0 ? "border  cursor-pointer border-slate-300 border-l-0 border-r-0" : "border bg-gray-200 border-slate-300 border-l-0 border-r-0  cursor-pointer"}>
                      <td className="px-2 py-2 text-sm ">{item.id}</td>
                      <td className="px-2 py-2 text-sm break-words">{item.store_name && item.store_name.slice(0, 5) + "..."}</td>
                      <td className="px-2 py-2 text-sm break-all">{ item.store_business_url && item.store_business_url.slice(0, 7) + "..."}</td>
                      <td className="text-sm text-center">
                      {/* {detail_happy === "満足" && <BsEmojiSmile className="ml-2 text-yellow-400 text-3xl" />}
                      {detail_happy !== "満足" && <BsEmojiFrown className="ml-2 text-red-500 text-3xl" />} */}

                        {item.happy === "満足" && <BsEmojiSmile className="ml-2 text-yellow-400 text-xl" />}
                        {item.happy !== "満足" && <BsEmojiFrown className="ml-2 text-red-500 text-xl" />}
                      </td>
                      <td className="px-2 py-2 text-sm">{item.sex}</td>
                      <td className="px-2 py-2 text-sm">{item.age.slice(0, 3) + "..."}</td>
                      <td className="px-2 py-2 text-sm">{item.sex_doctor}</td>
                      <td className="px-2 py-2 text-sm">{item.age_doctor && item.age_doctor.slice(0, 3) + "..."}</td>
                      <td className="px-2 py-2 text-sm">{ item.stage_today && item.stage_today.slice(0, 3) + "..."}</td>
                      <td className="text-sm break-all">
                        {
                          item.cure === "かなり良い" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                          </Rating>
                        }
                        {
                          item.cure === "良い" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                          </Rating>
                        }
                        {
                          item.cure === "普通" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                          </Rating>
                        }
                        {
                          item.cure === "良くない" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                          </Rating>
                        }
                        {
                          item.cure === "悪い" && <Rating>
                            <Rating.Star />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                          </Rating>
                        }
                      </td>

                      <td className="text-sm">
                        {
                          item.waiter === "かなり良い" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                          </Rating>
                        }
                        {
                          item.waiter === "良い" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                          </Rating>
                        }
                        {
                          item.waiter === "普通" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                          </Rating>
                        }
                        {
                          item.waiter === "良くない" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                          </Rating>
                        }
                        {
                          item.waiter === "悪い" && <Rating>
                            <Rating.Star />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                          </Rating>
                        }

                      </td>

                      <td className="text-sm">
                        {
                          item.technical === "かなり良い" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                          </Rating>
                        }
                        {
                          item.technical === "良い" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                          </Rating>
                        }
                        {
                          item.technical === "普通" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                          </Rating>
                        }
                        {
                          item.technical === "良くない" && <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                          </Rating>
                        }
                        {
                          item.technical === "悪い" && <Rating>
                            <Rating.Star />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                            <Rating.Star filled={false} />
                          </Rating>

                        }
                      </td>
                      <td className="px-2 py-2 text-sm break-words">{item.pointer && item.pointer.slice(0, 2) + "..."}</td>
                      <td className="px-2 py-2 text-sm">{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                      <td className="px-2 py-2 text-sm text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"><BsReverseLayoutTextSidebarReverse onClick={() => { detailView(item.id, item.happy, item.sex, item.age, item.sex_doctor, item.age_doctor, item.stage_today, item.cure, item.waiter, item.technical, item.pointer, moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss"), item.store_name, item.store_business_url, item.store_questionnare_url) }} className="shadow-2xl" />
                      </td>
                    </tr>
                  )) :
                    <tr className="py-5 border border-slate-300 border-l-0 border-r-0">
                      <td className="px-2 py-3 text-sm " colSpan={10}>{lang("japan", "no_data")}</td>
                    </tr>
                }
              </tbody>
            </table>

            <div className="flex items-center justify-between border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
              </div>

              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a href="#" onClick={ e => { e.preventDefault(); if(pageno !== 1) setPageNo(pageno - 1) } } className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                      </svg>
                    </a>
                    {renderPagination()}
                    <a href="#" onClick={ e => { e.preventDefault(); if(pageno < (Math.ceil(matchCount / 30))) setPageNo(pageno + 1) } } className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={detail_id !== "-1"} onClose={() => setDetail_id("-1")}>
          <Modal.Header>詳細情報</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 flex flex-col">
              <div className="flex flex-row items-end">
                <label htmlFor="">店舗名	</label>
                <h2 className="text-2xl ml-3">{detail_store_name}</h2>
              </div>
              <div className="flex flex-row items-end">
                <label htmlFor="">満足度</label>
                {detail_happy === "満足" && <BsEmojiSmile className="ml-2 text-yellow-400 text-3xl" />}
                {detail_happy !== "満足" && <BsEmojiFrown className="ml-2 text-red-500 text-3xl" />}


                <label className="ml-5" htmlFor="">登録日	</label>
                <span className="ml-2">{detail_createdAt}</span>

              </div>
              {/* <div className="flex flex-row">
                <label htmlFor="">GoogleビジネスURL</label>
                <span>{detail_store_business_url}</span>
              </div>
              <div className="flex flex-row">
                <label htmlFor="">Questionnare_url</label>
                <span>{detail_store_questionnare_url}</span>
              </div> */}

              <div className="flex flex-row items-end">
                <label htmlFor="">性別</label>
                <span className="ml-2  border-b border-gray-500 w-28 text-center">{detail_sex}</span>
                <label className="ml-4" htmlFor="">年齢</label>
                <span className="ml-2 border-b border-gray-500 w-20 text-center">{detail_age}</span>
              </div>
              <div className="flex flex-row">
                <label htmlFor="">治療士性別	</label>
                <span className="ml-2  border-b border-gray-500 w-12 text-center">{detail_sex_doctor}</span>
                <label className="ml-4" htmlFor="">治療士年齢	</label>
                <span className="ml-2 border-b border-gray-500 w-20 text-center">{detail_age_doctor}</span>
              </div>
              <div className="flex flex-row">
                <label htmlFor="">来店の契機	</label>
                <span className="grow ml-2 border-b border-gray-500 pl-3">{detail_stage_today}</span>
              </div>
              <div className="flex flex-row">
                <label className="mr-3" htmlFor="">聴覚</label>
                {
                  detail_cure === "かなり良い" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                  </Rating>
                }
                {
                  detail_cure === "良い" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                }
                {
                  detail_cure === "普通" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                }
                {
                  detail_cure === "良くない" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                }
                {
                  detail_cure === "悪い" && <Rating>
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                }

              </div>
              <div className="flex flex-row">
                <label className="mr-3" htmlFor="">接客	</label>
                {
                  detail_waiter === "かなり良い" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                  </Rating>
                }
                {
                  detail_waiter === "良い" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                }
                {
                  detail_waiter === "普通" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                }
                {
                  detail_waiter === "良くない" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                }
                {
                  detail_waiter === "悪い" && <Rating>
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                }

              </div>
              <div className="flex flex-row">
                <label className="mr-3" htmlFor="">技術力	</label>
                {
                  detail_technical === "かなり良い" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                  </Rating>
                }
                {
                  detail_technical === "良い" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                }
                {
                  detail_technical === "普通" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                }
                {
                  detail_technical === "良くない" && <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                }
                {
                  detail_technical === "悪い" && <Rating>
                    <Rating.Star />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                    <Rating.Star filled={false} />
                  </Rating>
                }

              </div>

              <div className="flex flex-col">
                <label htmlFor="">GoogleビジネスURL</label>
                <span>
                  {detail_store_business_url}
                </span>
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Questionnaire URL</label>
                <span>
                  {detail_store_questionnare_url}
                </span>
              </div>

            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button> */}
          </Modal.Footer>
        </Modal>
      </main>
    </Flowbite>
  );
}

export default ReviewPage

