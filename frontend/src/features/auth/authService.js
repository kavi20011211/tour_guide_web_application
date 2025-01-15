import axios from 'axios'

const API_URL = '/api/users/'

const signUp = async(userData)=>{
    const response = await axios.post(API_URL+'protected/signup',userData);
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }

    return response.data
}

const signIn = async(userData)=>{
    const response = await axios.post(API_URL+'protected/signin',userData);
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }

    return response.data
}

const logout = async()=>{
    localStorage.removeItem('user');
}

const authService = {
    signIn,
    signUp,
    logout
}
export default authService