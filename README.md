 # Project Ayam > Entertainment Ayam 

## See Live at: https://tesserractmedia.github.io/entertainment-ayam/

### API

| API Endpoints | Type | Params | Body
|-|-|-|-|
| /api/v1/report | POST | | ``` {
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
} ``` |
| /api/v1/report/:id | GET | | |
| /api/v1/report/search/ | GET | page,desc,day,year,month,category,range | |
| /api/v1/content/:id | GET | ||
| /api/v1/content/search | GET | page,name,sort,year,season,episode,category, ||
| /api/v1/category/:id | GET |||
| /api/v1/category/all | GET | | |
| /api/v1/banned_word | GET | | |

