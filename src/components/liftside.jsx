
'use client';

import { Sidebar } from 'flowbite-react';
import { BiUser, BiSpreadsheet, BiTask, BiBarChartAlt, BiLogOut } from "react-icons/bi";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../features/userSlice'

function LiftSide() {

  const dispatch = useDispatch()
  const navaigate = useNavigate()

  function logout() {
    dispatch(logOut())
    navaigate('/login')
  }

  return (
    <Sidebar className='h-screen rounded-none basis-1/7 px-6 py-6 bg-gray-50 dark:bg-gray-600'>
      <Sidebar.Items className='pt-5 dark:bg-gray-800'>
        <Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/managestore" icon={BiTask}>
              店舗管理
            </Sidebar.Item>
            <Sidebar.Item href="/reviewpage" icon={BiSpreadsheet}>
              調査調査
            </Sidebar.Item>
            <Sidebar.Item href="/graph" icon={BiBarChartAlt}>
              グラフ表示
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className='!mt-0'>
            <Sidebar.Item href="/profile" icon={BiUser}>
              プロフィール
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={BiLogOut}>
              <span onClick={logout}>退会</span>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default LiftSide
