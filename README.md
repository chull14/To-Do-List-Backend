# To-Do-List-Backend
This is a very small personal project that is meant to practice basic capabilities of node and express. Also to practice general workflow of web applications.

Language - JavaScript
Framework - Node.js, Express.js
Database - MongoDB

Dependencies - see package.json 
    (to install dependencies 'npm install' from package.json)

TO-DO-LIST APPLICATION (BACKEND): 

  DATA MODEL STRUCTURES:
  
    Task:
      Task ID
      Task Title
      Task Description
      Completion Status
      Time of Creation
      Time of Update

    User:
      User ID
      Email
      Password (will be encrypted in DB)

  ROUTES:

    Tasks:
      GET /tasks : fetch all tasks
      POST /tasks : create a new task
      PUT /tasks/:_id : update a specified task (completion, text edit)
      DELETE /tasks/:_id : delete a specified task

    Users:
      POST /users : create a new user (email, password)
      GET /users : fetch all users (for development)
      DELETE /users/:_id : delete a specified user
      GET /users/:_id : fetch specified user data (for development)
      PUT /users/:_id : working on this

  MIDDLEWARE:

    Logging:
      logEvents : log all incoming requests
    

