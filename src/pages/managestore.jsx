import React from "react";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HiOutlineCheck, HiOutlineXCircle } from 'react-icons/hi';
import { Flowbite, Table, Button, FloatingLabel, Modal, Label, TextInput, Alert } from 'flowbite-react';

import { view, createOrUpdate, deleteStore, resetError, resetStatus } from '../features/storeSlice'
import { BsPencilSquare, BsTrash  } from "react-icons/bs";

import lang from "../lang/lang";

import config from "../app/config";

import Header from '../components/header'
import LiftSide from "../components/liftside"

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

function ManageStore() {

  const dispatch = useDispatch()

  const [store_name, setStoreName] = useState("")
  const [store_business_url, setStoreBusinessURL] = useState("")
  const [store_url_name, setStoreURLName] = useState("")

  const { store, isLoading, status, error } = useSelector((store) => store.store);

  const [edit_store_id, setEditStoreId] = useState("-1")
  const [edit_store_name, setEditStoreName] = useState("")
  const [edit_store_url_name, setEditStoreURLName] = useState("")
  const [edit_store_business_url, setEditStoreBusinessURL] = useState("")

  useEffect(() => {
    dispatch(view())
  }, [])

  useEffect(() => {
    dispatch(view())
  }, [status])

  const edit = (store_id1, store_name1, store_url_name1, store_business_url1) => {
    setEditStoreId(store_id1)
    setEditStoreName(store_name1)
    setEditStoreURLName(store_url_name1)
    setEditStoreBusinessURL(store_business_url1)
  }

  const initializeState = () => {
    setStoreId(-1)
    setStoreName("")
    setStoreURLName("")
    setStoreBusinessURL("")
  }

  function getStatus() {
    if (status === lang("en", "created")) {
      return (
        <Alert className="mt-8 mb-2" theme={customTheme1} color="success" icon={HiOutlineCheck} onDismiss={() => dispatch(resetStatus())} rounded>
          <span className="font-medium">{lang("japan", "created")}</span>
        </Alert>
      )
    }
    else if (status === lang("en", "updated")) {
      return (
        <Alert className="mt-8 mb-2" theme={customTheme1} color="success" icon={HiOutlineCheck} onDismiss={() => dispatch(resetStatus())} rounded>
          <span className="font-medium">{lang("japan", "updated")}</span>
        </Alert>
      )
    }
    else if (status === lang("en", "deleted")) {
      return (
        <Alert className="mt-8 mb-2" theme={customTheme1} color="success" icon={HiOutlineCheck} onDismiss={() => dispatch(resetStatus())} rounded>
          <span className="font-medium">{lang("japan", "deleted")}</span>
        </Alert>
      )
    }
    else if (status === lang("en", "failed")) {
      return (
        <Alert className="mt-8 mb-2" theme={customTheme1} color="failure" icon={HiOutlineXCircle} onDismiss={() => dispatch(resetStatus())} rounded>
          <span className="font-medium">{lang("japan", "failed1")}</span>
        </Alert>
      )
    }
  }

  return (
    <Flowbite>
      <Header></Header>
      <main className="flex flex-row width-1200 mx-auto my-0">
        <LiftSide select={1}></LiftSide>
        <div className="basis-6/7 px-10 py-12 flex flex-col grow">
          <h1 className="text-gray-900">店舗管理</h1>
          {getStatus()}
          <div className="mt-5 flex flex-col">
            <div className="px-8 dark:bg-gray-800">
              <div className="flex flex-row gap-4 items-center">
                <FloatingLabel variant="outlined" label="店舗名" value={store_name} onChange={e => setStoreName(e.target.value)} />
                <FloatingLabel variant="outlined" label="URLの名前" value={store_url_name} onChange={e => setStoreURLName(e.target.value)} />
                <FloatingLabel className="w-72" variant="outlined" label="店舗Googleビジネスurl" value={store_business_url} onChange={e => setStoreBusinessURL(e.target.value)} />
                <FloatingLabel className="w-72" variant="outlined" label="調査調査url" value={(store_name !== "" && store_business_url !== "") ? `${config.server_url}/questionnaire?name=${store_url_name}` : ""} readOnly />
                <Button type="button" onClick={() => { dispatch(createOrUpdate({ store_id: -1, store_name, store_url_name, store_business_url })) }}>登録</Button>
              </div>
            </div>
            <div className="overflow-x-auto   rounded-none">

              <table className="mt-2 ml-5 border-collapse	">
                <thead>
                  <tr className="border border-slate-300 border-l-0 border-r-0">
                    <th className="text-sm px-1 py-4">ID</th>
                    <th className="text-sm px-1 py-4">店舗名</th>
                    <th className="text-sm px-1 py-4">URLの名前	</th>
                    <th className="text-sm px-1 py-4">店舗Googleビジネスurl</th>
                    <th className="text-sm px-1 py-4 break-words">調査調査url</th>
                    <th className="text-sm px-1 py-4 ">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (store === null || store.length === 0) ?
                      <tr className="py-5 border border-slate-300 border-l-0 border-r-0">
                        <td className="px-2 py-3 text-sm " colSpan={10}>{lang("japan", "no_data")}</td>
                      </tr>
                      : store.map(item => (
                        <tr key={item.id} className="border  cursor-pointer border-slate-300 border-l-0 border-r-0">
                          <td className="px-2 py-2 text-sm ">{item.id}</td>
                          <td className="px-2 py-2 text-sm">{item.store_name}</td>
                          <td className="px-2 py-2 text-sm break-all">{item.store_url_name}</td>
                          <td className="text-sm text-center">
                            {item.store_business_url}
                          </td>
                          <td className="px-2 py-2 text-sm">{item.questionnare_url}</td>
                          <td className="px-2 py-2 text-sm flex flex-row">
                            <a href="#" onClick={() => edit(item.id, item.store_name, item.store_url_name, item.store_business_url)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            <BsPencilSquare />

                            </a>
                            <a href="#" onClick={() => dispatch(deleteStore({ store_id: item.id }))} className="ml-3 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            <BsTrash />
                            </a>
                            {/* <a target="_blank" href={item.questionnare_url} className="ml-3 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                              Run
                            </a> */}

                          </td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>


            </div>
          </div>

        </div>
        <Modal show={edit_store_id !== "-1"} onClose={() => setEditStoreId("-1")}>
          <Modal.Header>詳細情報</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 flex flex-col">
              <div className="">
                <label htmlFor="">ID</label>
                <TextInput value={edit_store_id} disabled onChange={ e => { setEditStoreId(e.target.value) } }/>
              </div>
              <div className="">
                <label htmlFor="">店舗名</label>
                <TextInput value={edit_store_name} onChange={ e => { setEditStoreName(e.target.value) } }/>
              </div>
              <div className="">
                <label htmlFor="">URLの名前</label>
                <TextInput value={edit_store_url_name} onChange={ e => { setEditStoreURLName(e.target.value) } }/>
              </div>
              <div className="">
                <label htmlFor="">店舗Googleビジネスurl</label>
                <TextInput value={edit_store_business_url} onChange={ e => { setEditStoreBusinessURL(e.target.value) } }/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { dispatch(createOrUpdate({ store_id: edit_store_id, store_name: edit_store_name, store_url_name: edit_store_url_name, store_business_url: edit_store_business_url })) }}>更新</Button>
            <Button color="gray" onClick={() => setEditStoreId("-1")}>
              取り消し
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </Flowbite>
  );
}

export default ManageStore

