import axios from "axios";
import store from "../store";
import { getUser } from "../features/userSlice";

const checkAuth = () => {
        const TOKEN = localStorage.getItem("token");
        if(TOKEN){
        axios.defaults.headers.common["Authorization"] = TOKEN;
        store.dispatch(getUser())
        }
};

export default checkAuth;