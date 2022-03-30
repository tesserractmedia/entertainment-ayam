# Project Ayam > Entertainment Ayam

## See Live at: <https://tesserractmedia.github.io/entertainment-ayam/>

### Features
- Report Graph ( Day wise | Month wise | Year wise )
- Most Hinduphobic Content ( Category wise | Year Wise )
- Reported Category Share

---

## API Version 1

| API Endpoints | Type |
|-|-|
| <https://entertainment-ayam.herokuapp.com/api/v1/report> | POST |
| <https://entertainment-ayam.herokuapp.com/api/v1/report> | GET |
| <https://entertainment-ayam.herokuapp.com/api/v1/report/:id> | GET |
| <https://entertainment-ayam.herokuapp.com/api/v1/content> | GET |
| <https://entertainment-ayam.herokuapp.com/api/v1/content/:id> | GET |
| <https://entertainment-ayam.herokuapp.com/api/v1/category> | GET |
| <https://entertainment-ayam.herokuapp.com/api/v1/category/:id> | GET |
| <https://entertainment-ayam.herokuapp.com/api/v1/banned_word> | GET |

---

### <https://entertainment-ayam.herokuapp.com/api/v1/report>

Body

```json 
{
   "id":null,
   "email":"",
   "name":"",
   "year":2021,
   "category":"movie",
   "season":0,
   "episode":0,
   "time_stamp":{
      "second":0,
      "minute":0,
      "hour":0
   },
   "description":""
} 

```

Response

