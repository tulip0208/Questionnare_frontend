
'use client';
import React from 'react';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { signin, resetError } from '../features/userSlice'

function Login() {

    // const navigate = useNavigate();

    const { user, error } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // useEffect(() => {
    //     // inputRef.current.focus();
    // }, [])
    // useEffect(() => {
    //     if (user) {
    //         navigate('/managestore', { replace: true });
    //     }
    // }, [user]);
    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(resetError());
    //     }, 3000);
    // }, [error])

    const submitForm = async (e) => {
        e.preventDefault();
        dispatch(signin({ username, password }))
    }

    return (
        <form className="flex max-w-md flex-col gap-4 mx-auto my-0 mt-56 rounded-xl px-5 py-8 dark:bg-gray-900" onSubmit={submitForm}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="メールアドレス" />
                </div>
                <TextInput id="name1" type="email" placeholder="メールアドレスを入力" onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="パスワード" />
                </div>
                <TextInput id="password1" placeholder='パスワードを入力' type="password" onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit">ログイン</Button>
        </form>
    );
}

export default Login;
