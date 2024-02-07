
'use client';
import { Avatar, Dropdown, Navbar, DarkThemeToggle, Button } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../features/userSlice'
import { BsBell } from "react-icons/bs";


function Header() {

  const dispatch = useDispatch()
  const navaigate = useNavigate()

  const { user } = useSelector((store) => store.user);

  function logout() {
    dispatch(logOut())
    navaigate('/login')
  }

  return (
    <Navbar fluid className='navbar bg-stone-200 px-2'>
      <Navbar.Brand href="/managestore">
        <img src="./public/vite.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MEO</span>
      </Navbar.Brand>
      <div className="flex items-center">

        {/* <Dropdown
          className='px-0 py-0'
          arrowIcon={false}
          inline
          label={
            <div className="relative">
              <BsBell className='text-2xl text-gray-600' />
              <span className='text-xs w-5 h-5 bg-red-700 rounded absolute -top-3 -right-2 	text-gray-100'>1</span>
            </div>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.username}</span>
            <span className="block truncate text-sm font-medium">{ }</span>
          </Dropdown.Header>
          <Dropdown.Item>プロフィール設定</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>退会</Dropdown.Item>
        </Dropdown> */}

        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar className='p-1 ring-2 ring-gray-300 dark:ring-gray-500 rounded-full w-10 h-10 relative overflow-hidden bg-gray-100 dark:bg-gray-600' />
            // <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.username}</span>
            <span className="block truncate text-sm font-medium">{ }</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={ () => { navaigate('/profile') }}>プロフィール設定</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>退会</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>

    </Navbar>
  );
}

export default Header

