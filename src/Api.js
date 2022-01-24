const DEBUG = true
var BASE_URL = "https://entertainment-ayam.herokuapp.com/api"

if(DEBUG){
    BASE_URL = "http://localhost:8000/api"
}

const V = (num) => {
    return `/v${num}`
}

export const API = {
    V1 : {
        report : BASE_URL + V(1) + '/report',
        content : BASE_URL + V(1) + '/content',
        category : BASE_URL + V(1) + '/category',
        banned_word : BASE_URL + V(1) + '/banned-word'
    }
}


