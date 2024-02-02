'use client';
import axios from 'axios';
import { useSelector, } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from './pages/home.jsx'
import ManageStore from './pages/managestore.jsx';
import ReviewPage from './pages/reviewpage.jsx';
import Profile from './pages/profile.jsx';
import Login from './pages/login.jsx'
import Questionnaire from './pages/questionnaire.jsx'
import { getUser } from './features/userSlice.js';
import store from './store'

const data = [{
  id: 1,
  name: "aaaaa",
}, {
  id: 2,
  name: "bbbbb",
}, {
  id: 3,
  name: "cccccc",
}
]

const TOKEN = localStorage.getItem("token");
if (TOKEN) {
  axios.defaults.headers.common["Authorization"] = `${TOKEN}`;
  store.dispatch(getUser())
}

function App() {
  const { user } = useSelector((store) => store.user);

  return (
    <Router>
      <Routes>
        {data.map(item => {
          <Route id={item.id} path={"/questionnaire?name=" + item.name} element={<Questionnaire />} />
        })}
        <Route path="/login" element={<Login />} />
        {user && <Route path="/home" element={<Home />} />}
        {user && <Route path="/managestore" element={<ManageStore />} />}
        {user && <Route path="/reviewpage" element={<ReviewPage />} />}
        {user && <Route path="/graph" element={<ReviewPage />} />}
        {user && <Route path="/profile" element={<Profile />} />}
      </Routes>
    </Router>
  );
}

export default App

