import React from "react";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HiOutlineCheck, HiOutlineXCircle } from 'react-icons/hi';
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


  return (
    <Flowbite>
      <Header></Header>
      <main className="flex flex-row width-1200 mx-auto my-0">
        <LiftSide select={3}></LiftSide>
        <div className="basis-6/7 px-10 py-12 flex flex-col grow">
          <h1 className="text-gray-900">グラフ表示</h1>
        </div>
      </main>
    </Flowbite>
  );
}

export default ManageStore

