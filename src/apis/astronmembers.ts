import axios from "axios";

const astronmembers = axios.create({
  baseURL: 'https://central.astronmembers.com.br/'
})

export default astronmembers;
