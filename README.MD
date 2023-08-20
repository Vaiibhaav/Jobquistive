# Jobquisitive

## Table of contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Run](#run)
- [Technology](#technology)
- [Features](#features)
- [Database Models](#database)
- [Color Palette](#colors)
- [License](#license)

## Introduction

A website which keeps a track of your progress during the Job Search process implemented using Reactjs, Nodejs, Expressjs, and MongoDB.

NOTE: Please read the RUN section before opening an issue.

## Demo

######User Side

###### Landing Page

![screenshot](screenshots/1.png)

###### User Login Page

![screenshot](screenshots/2.png)

###### User Register Page

![screenshot](screenshots/3.png)

###### User DashBoard Page

![screenshot](screenshots/4.png)

###### User Tracked Jobs Page

![screenshot](screenshots/5.png)

###### User Add a Job Page

![screenshot](screenshots/6.png)

###### User Applied Jobs Page

![screenshot](screenshots/7.png)

###### User Profile Page

![screenshot](screenshots/8.png)

######Recruiter Side

###### Recruiter Login Page

![screenshot](screenshots/r9.png)

###### Recruiter Dashboard Page

![screenshot](screenshots/r10.png)

###### Recruiter AddJob Page

![screenshot](screenshots/r11.png)

###### Recruiter Profile Page

![screenshot](screenshots/r12.png)

You can add the jobs you've applied for and update their status to keep a track of your progress.

## Run

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

- MONGO_URI: this is the connection string of your MongoDB Atlas database.

- JWT_SECRET: a secret message for the session. You can use any string here.

- JWT_LIFETIME: the time up to which the session token will be active.

After you've set these environmental variables in the .env file at the root of the project, you can run "npm start" in the terminal and the application should work.

## Technology

The application is built with:

- Node.js version 16.13.2
- MongoDB version 6.0.2
- Express version 4.18.2
- Styled-Components version 5.3.6
- bcryptjs: used to store the hashed password in the database
- JSON Web Token: used for authentication
- Express Validator: used for form validation

## Features

Users can do the following:-

- Create an account, Login or Logout
- Add a job with job type and status
- Search for an applied job with various filters
- Edit and Delete a job
- Check the stats of all the applied jobs with a visual representation in the form of Area Chart and Bar Chart
- View and Update their details in the profile page

## Database

All the models can be found in the models directory created using mongoose.

### User Schema:

- name (String)
- email (String)
- password (String)
- lastName (String)
- location (String)

### Job Schema:

- company (String)
- position (String)
- status (String)
- jobType (String)
- jobLocation (String)
- createdBy (Mongoose.Types.ObjectId)

## Colors

Below is the color palette used in this application:

- ![#2cb1bc](https://via.placeholder.com/15/2cb1bc/000000?text=+) `#2cb1bc`
- ![#14919b](https://via.placeholder.com/15/14919b/000000?text=+) `#14919b`
- ![#627d98](https://via.placeholder.com/15/627d98/000000?text=+) `#627d98`
- ![#f0f4f8](https://via.placeholder.com/15/f0f4f8/000000?text=+) `#f0f4f8`
- ![#0f5132](https://via.placeholder.com/15/0f5132/000000?text=+) `#0f5132`
- ![#d1e7dd](https://via.placeholder.com/15/d1e7dd/000000?text=+) `#d1e7dd`
- ![#842029](https://via.placeholder.com/15/842029/000000?text=+) `#842029`
- ![#f8d7da](https://via.placeholder.com/15/f8d7da/000000?text=+) `#f8d7da`
- ![#e9b949](https://via.placeholder.com/15/e9b949/000000?text=+) `#e9b949`
- ![#fcefc7](https://via.placeholder.com/15/fcefc7/000000?text=+) `#fcefc7`
- ![#647acb](https://via.placeholder.com/15/647acb/000000?text=+) `#647acb`
- ![#e0e8f9](https://via.placeholder.com/15/e0e8f9/000000?text=+) `#e0e8f9`

## License

[![License](https://img.shields.io/:License-MIT-blue.svg?style=flat-square)](http://badges.mit-license.org)

- MIT License
- Copyright 2023 © [Vaibhav Saxena](https://github.com/Vaiibhaav)
