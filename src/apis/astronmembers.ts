import axios from "axios";

const astronmembers = axios.create({
  baseURL: 'https://webhook.astronmembers.com.br/'
})

export default astronmembers;
