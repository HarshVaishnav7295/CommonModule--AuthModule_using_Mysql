# NestJS & MySQL : Auth module ( MySQL )

## About
```bash
This is auth module project built in NestJS as backend and MySQL as database.
In this project, below functionalities exists.
    a> Register
    b> Login
    c> Send OTP
    d> Verify OTP
    e> User Profile Get-Update
    f> Account Delete
    g> Change Password
    h> Forgot Password
    i> Social Login
    j> Logout
```

## 0> env configuration
```bash
$ cp .env.local .env
-> Add required details in .env file
```

## 1> Installation
```bash
$ npm install
```

## 2> Build
```bash
$ npm run build
```

## 3> Database migrations
```bash
$ npm run typeorm migration:run
```

## 4> Running the app

```bash
# watch mode -- development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 5> Calling APIs

```bash
# using Swagger
-> visit "http://localhost:8001/" for accessing apis.

# using Postman
-> Here, Postman collection is provided, so use it to access apis.
```
