import axios from "axios";

const sniperx = axios.create({
  baseURL: 'https://sniperx.co/api'
})

export default sniperx;
