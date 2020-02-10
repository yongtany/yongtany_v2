<h1 align="center">
<br>
  <a href="https://yongtany-v2.herokuapp.com/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlFrdi3Hoz4pV_yyca2V6_po8TjOOQuhQUqOq6UcIabiLA7sAU" alt="yongtany" width="128"></a>
<br>
<br>
yongtany.com
</h1>

<p align="center">TIL(Today I Learn)</p>

<p align="center">
  <a href="https://github.com/yongtany/yongtany.com/edit/master/README.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="Welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License MIT">
  </a>
</p>

<hr />

## Introduction

> This blog is a place for me to write down what I think. This helps me first with my English which is not my native language, and that also help me empty my brain. By doing this I hope I can help people with some of the thinking, tutorial or whatever stuff I wrote here.

https://yongtany-v2.herokuapp.com/

## Project Stack

### Client

Following items are core frontend technologies used in this project:

- React
- React Router v5
- React Hook
- Redux
- Redux-Thunk
- Ant design
- Quill
- Only funtional Compoent(with out quill)

### Server

Following items are core backend technologies used in this project:

- Node.js
- express
- mongoDB
- mongoose
- jsonwebtoken
- Typescript-Node
- cloudinary(media storage)
- heroku(Automedically deploy)

## Getting started

1. Clone this repo using `https://github.com/yongtany/yongtany.com.git`
2. Move to the appropriate directory: `cd yongtany`.
3. Run `npm` or `yarn install` to install dependencies.
4. Create `/server/config/dev.ts` file with your mongoURI, JWT_SECRET, Cloudinary stuff.
5. Run `mongod` to open mognodb server.
6. Run `yarn dev` to see the example app at `http://localhost:5000/`.
7. Move to the apropriate directory: `cd client`.
8. Run `yarn start` to see the example app at `http://localhost:3000/`.

## License

MIT license, Copyright (c) 2020 Yongtany.
