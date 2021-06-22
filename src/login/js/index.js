import axios from 'axios';

const ENDPOINT_PATH = 'http://127.0.0.1:8000/';

export default {
    register(username, password,first_name, last_name, email){
    const user = {username, password,first_name,last_name,email};
    return axios.post(ENDPOINT_PATH + "api/token/", user);
    },
    login(username, password){
        const user = {username, password};
        return axios.post(ENDPOINT_PATH + "auth/", user)
    },
    logout(){
        localStorage.removeItem('user-token');
    },
};