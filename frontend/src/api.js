
import axios from "axios";

const API = axios.create({
    baseURL: "https://campusconnect-v4lg.onrender.com/api"
});

export default API;
