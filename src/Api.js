BASE_URL = "localhost:8000/api/"
V1 = "v1/"

export const API = {
    V1: {
        REPORT: {
            CREATE: BASE_URL + V1 + `report`,
            GET: (id = null) => {
                return BASE_URL + V1 + `report/${id}`
            },
            GET_ALL: BASE_URL + V1 + `report`
        },
        CONTENT : {
            GET : (id = null)=>{
                return BASE_URL + V1 + `content/${id}`;
            },
            GET_ALL : BASE_URL + V1 + `content`
        },
        BANNED_WORD: (banned_word = null) => {
            return BASE_URL + V1 + `banned-word/${banned_word}`;
        }
    }
}



API.V1.CONTENT.GET()