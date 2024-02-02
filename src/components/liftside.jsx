
'use client';

import { Label, Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiUser, HiShoppingBag, HiTable } from 'react-icons/hi';
import { BiUser, BiSpreadsheet, BiTask, BiBarChartAlt, BiLogOut } from "react-icons/bi";

function LiftSide() {
  return (
    <Sidebar className='h-screen rounded-none basis-1/7 px-6 py-6 bg-gray-50 dark:bg-gray-600'>
      <Sidebar.Items className='pt-5 dark:bg-gray-800'>
        <Sidebar.ItemGroup>
          {/* <Label className='text-xl'>業務</Label> */}
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={BiTask}>
              店舗管理
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={BiSpreadsheet}>
              調査調査
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={BiBarChartAlt}>
              グラフ表示
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          {/* <Label className='text-xl mt-10'>ユーザー管理</Label> */}
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={BiUser}>
              プロフィール
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={BiLogOut}>
              退会
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default LiftSide
