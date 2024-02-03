import React from "react";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HiEye, HiOutlineCheck, HiOutlineXCircle } from 'react-icons/hi';
import { Flowbite, Table, Button, FloatingLabel , Label, TextInput, Alert } from 'flowbite-react';

import { view, createOrUpdate, deleteStore, resetError, resetStatus } from '../features/storeSlice'

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

  useEffect(() => {
    dispatch(view())
  }, [])

  useEffect(() => {
    dispatch(view())
  }, [status])

  function edit(store_name1, store_url_name, store_business_url1) {
    setStoreName(store_name1)
    setStoreURLName(store_url_name)
    setStoreBusinessURL(store_business_url1)
  }

  function getStatus() {
    if (status === lang("en", "created")) {
      return (
        <Alert className="mt-8 -mb-8" theme={customTheme1} color="success" icon={HiOutlineCheck} onDismiss={() => dispatch(resetStatus())} rounded>
          <span className="font-medium">{lang("japan", "created")}</span>
        </Alert>
      )
    }
    else if (status === lang("en", "updated")) {
      return (
        <Alert className="mt-8 -mb-8" theme={customTheme1} color="success" icon={HiOutlineCheck} onDismiss={() => dispatch(resetStatus())} rounded>
          <span className="font-medium">{lang("japan", "updated")}</span>
        </Alert>
      )
    }
    else if (status === lang("en", "deleted")) {
      return (
        <Alert className="mt-8 -mb-8" theme={customTheme1} color="success" icon={HiOutlineCheck} onDismiss={() => dispatch(resetStatus())} rounded>
          <span className="font-medium">{lang("japan", "deleted")}</span>
        </Alert>
      )
    }
    else if (status === lang("en", "failed")) {
      return (
        <Alert className="mt-8 -mb-8" theme={customTheme1} color="failure" icon={HiOutlineXCircle} onDismiss={() => dispatch(resetStatus())} rounded>
          <span className="font-medium">{lang("japan", "failed1")}</span>
        </Alert>
      )
    }
  }

  return (
    <Flowbite>
      <Header></Header>
      <main className="flex flex-row">
        <LiftSide></LiftSide>
        <div className="basis-6/7 px-10 py-12 flex flex-col vw-75">
          <h1 className="text-gray-900">店舗管理</h1>
          {getStatus()}
          <div className="py-10 flex flex-col">
            <div className="px-8 py-6 dark:bg-gray-800">
              <div className="flex flex-row gap-4 items-center">
                <FloatingLabel variant="outlined" label="店舗名" value={store_name} onChange={e => setStoreName(e.target.value)} />
                <FloatingLabel variant="outlined" label="URLの名前" value={store_url_name} onChange={e => setStoreURLName(e.target.value)} />
                <FloatingLabel className="w-80" variant="outlined" label="店舗Googleビジネスurl" value={store_business_url} onChange={e => setStoreBusinessURL(e.target.value)} />
                <FloatingLabel className="w-80" variant="outlined" label="調査調査url" value={(store_name !== "" && store_business_url !== "") ? `${config.server_url}/questionnaire?name=${store_url_name}` : ""} readOnly/>
                <Button type="button" onClick={() => { dispatch(createOrUpdate({ store_name, store_url_name, store_business_url })) }}>登録 / 変更</Button>
              </div>
            </div>
            <div className="overflow-x-auto pt-10 rounded-none">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell className="text-xl">店舗名</Table.HeadCell>
                  <Table.HeadCell className="text-xl">URLの名前</Table.HeadCell>
                  <Table.HeadCell className="text-xl">店舗Googleビジネスurl</Table.HeadCell>
                  <Table.HeadCell className="text-xl">調査調査url</Table.HeadCell>
                  <Table.HeadCell className="text-xl">
                    <span >操作</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {(store === null || store.length === 0) ?
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell colSpan={4} className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-xl text-red-600	">
                        登録された店舗はありません。
                      </Table.Cell>
                    </Table.Row>
                    : store.map(item => (
                      <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {item.store_name}
                        </Table.Cell>
                        <Table.Cell>{item.store_url_name}</Table.Cell>
                        <Table.Cell>{item.store_business_url}</Table.Cell>
                        <Table.Cell>{item.questionnare_url}</Table.Cell>
                        <Table.Cell className="flex flex-row">
                          <a href="#" onClick={() => edit(item.store_name, item.store_url_name, item.store_business_url)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            Edit
                          </a>
                          <a href="#" onClick={() => dispatch(deleteStore({ store_name: item.store_name }))} className="ml-3 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            Delete
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  }
                </Table.Body>
              </Table>
            </div>
          </div>

        </div>
      </main>
    </Flowbite>
  );
}

export default ManageStore

