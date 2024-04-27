# Leave Management Application

This is a basic leave Management Application to demonstrate interaction between admin and employee.

It contains two folder
 1. leave-management-ui (Angular 17) 
 2. backend (Node - Express)

Mongo Db is used here and connection string can be updated in backend/dbconnect/mongoose.js

If changing port for backend, update the same in common-api.service of leave-management-ui

## App Setup

* Pre-Requisite : Node and angular is installed

Navigate to this leave-management-ui folder in cmd. Run the following command : 

```bash
npm install
```

Similarly, navigate to backend folder in cmd. Run the same command.

## Run application

### To run Frontend Application

Navigate to leave-management-ui folder. Run following command

```bash
ng serve
```
### To run Backend Application

Navigate to backend folder. Run following command

```bash
node server.js
```
Install nodemon to restart server on save.
