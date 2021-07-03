import axios from "axios"
import { getUserToken } from './auth-api'



class APIService {
    constructor() {
        this.url = "http://10.238.72.38:3100"
    }



    loginUser = async (token) => {
        return axios.post(this.url + "/user/login", {}, { headers: { token } })
    }


    registerUser = async (token, data) => {
        console.log(token)
        console.log(data)
        return axios.post(this.url + "/user/register", data, { headers: { token } })
    }


    getUser = async () => {
        const token = await getUserToken()
        return axios.get(this.url + "/user/get/my-profile", { headers: { token } })

    }

    setDiagnosis = async(data) => {
        const token = await getUserToken()
        return axios.get(this.url + "/diagnosis/new", data, {headers: {token} })
    }

    getQuestions = async() => {
        const token = await getUserToken()
        console.log(token)
        return axios.get(this.url + "/question/all", { headers: { token } })
    }

    getAnswers = async(id) => {
        const token = await getUserToken()
        console.log(token)
        
        return axios.get(this.url + "/answer/question/id/" + id, { headers: { token } })
    }

    sendAnswer = async(data, id) => {
        const token = await getUserToken()
        console.log(token)
        return axios.post(this.url + "/answer/new/question/id/" + id, data, { headers: { token } })
    }

    newQuestion = async(data) => {
        const token = await getUserToken()
        console.log(token)
        return axios.post(this.url + "/question/new", data, { headers: { token } })
    }

}


const apiService = new APIService()

export default apiService;
