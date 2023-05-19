<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

<b><em><u>FlytBase Assignment</u> :</b></em>

This Application is built on NestJS framework and MongoDB database. 

I have created 2 mongo collections with its fields:

<b>UserData </b>{
  userId: number;
  emailId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  hashedPassword?: string;
  status: USER_STATUS;
  createdAt?: Date;
  updatedAt?: Date;
}

<b>Activity </b>{
  activityId: string;
  activityName: string;
  userContributions: [{
    userId: number;
    amountPayable: number;
    paymentStatus: PAYMENT_STATUS;
  }];
  totalAmount: number;
  state: STATE;
}

This shows how I have designed the schema for collections to connect each other. 
I have created a postman collection which includes all the APIs with description and the API names are self explanatory. 

<p><p><b>All the schema, APIs and functionalities have been written handling appropriate checks, validations and logic</b></p></p>

## Installation

```bash
clone this repo
```
## Running the app

```bash

=> This application has been dockerized with the images of the codebase and database
   Make sure your Docker engine is running.
   Open command Prompt / terminal separately which is at this directory

=> $ docker-compose up

=> wait untill all the images are up and running

=> once the docker is up and running, you can hit the APIs using Postman and connect to the database in MongoDB compass: mongodb://localhost:27017/ , to see the data 

```

## Stay in touch
- Author - [Arvind Nath Rajesh](https://arvindnathr@gmail.com)

