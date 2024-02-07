
'use client';

import { Sidebar } from 'flowbite-react';
import { BiUser, BiSpreadsheet, BiTask, BiBarChartAlt, BiLogOut } from "react-icons/bi";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../features/userSlice'

function LiftSide(props) {

  const dispatch = useDispatch()
  const navaigate = useNavigate()

  function logout() {
    dispatch(logOut())
    navaigate('/login')
  }

  const renderItem = () => {
    if(props.select === 1){
      return [
        <Sidebar.Item key={1} className='bg-gray-200' href="/managestore" icon={BiTask}>
        店舗管理
      </Sidebar.Item>,
<Sidebar.Item key={2} href="/reviewpage" icon={BiSpreadsheet}>
        調査調査
      </Sidebar.Item>,
      <Sidebar.Item key={3} href="/graph" icon={BiBarChartAlt}>
        グラフ表示
      </Sidebar.Item>,
    
      ]
        }

  else if(props.select === 2) {
    return [
      <Sidebar.Item key={1} href="/managestore" icon={BiTask}>
      店舗管理
    </Sidebar.Item>,
<Sidebar.Item key={2} className='bg-gray-200' href="/reviewpage" icon={BiSpreadsheet}>
      調査調査
    </Sidebar.Item>,
    <Sidebar.Item key={3} href="/graph" icon={BiBarChartAlt}>
      グラフ表示
    </Sidebar.Item>,
  
    ]

  }
  else if(props.select === 3) {
    return [
      <Sidebar.Item key={1} href="/managestore" icon={BiTask}>
    店舗管理
  </Sidebar.Item>,
<Sidebar.Item key={2}  href="/reviewpage" icon={BiSpreadsheet}>
    調査調査
  </Sidebar.Item>,
  <Sidebar.Item key={3} className='bg-gray-200' href="/graph" icon={BiBarChartAlt}>
    グラフ表示
  </Sidebar.Item>

  ]

  }
  else {
    return [
      <Sidebar.Item key={1} href="/managestore" icon={BiTask}>
    店舗管理
  </Sidebar.Item>,
<Sidebar.Item key={2} href="/reviewpage" icon={BiSpreadsheet}>
    調査調査
  </Sidebar.Item>,
  <Sidebar.Item key={3} href="/graph" icon={BiBarChartAlt}>
    グラフ表示
  </Sidebar.Item>

  ]

  }
}

  return (
    <Sidebar className='height-700 rounded-none basis-1/7 px-6 py-6 bg-gray-50 dark:bg-gray-600'>
      <Sidebar.Items className='pt-5 dark:bg-gray-800'>
        <Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            { renderItem() }
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className='!mt-0'>
            { props.select === 4 &&             <Sidebar.Item href="/profile" icon={BiUser} className="bg-gray-200">
              プロフィール
            </Sidebar.Item>
}
{
props.select !== 4 &&             <Sidebar.Item href="/profile" icon={BiUser}>
プロフィール
</Sidebar.Item>

}
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
