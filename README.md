# Noted app APIs

## Routes

- _Routes that are **PRIVATE** require a token to use. To get a token, simply perform a register or login_

- _The token will be required to set under the header of_ `auth-token: token`

Unless specify otherwise, all routes start in http://localhost:3000/api

POST request also require an additional header:
`Content-Type: application/json`

### User routes: /user

> Register an user
```
POST /register
Sample
{
    "name": "Sample",
    "username": "sample1234",
    "email": "sample@email.com",
    "password": "samplepassword"
}
```

> Login an user
```
POST /login
Sample
{
    "email": "sample@email.com",
    "password": "samplepassword"
}
```

## Repository details

### Technology used

- ExpressJS
- MongoDB

### Library used

- express
- mongoose
- joi
- bcryptjs
- jsonwebtoken
- nodemon
