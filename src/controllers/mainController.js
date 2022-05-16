const { validationResult } = require("express-validator");
const path = require("path");
const bcryptjs = require("bcryptjs");
const users = require('./dataUsers')
//const User = require(path.resolve("./src/model/model.js"));



//const user = users.map( user => { return user})

const patients = [];
const patient = patients.map( patient => { return patient})

const caregivers = [];
const caregiver = caregivers.map( caregiver => { return caregiver})


const usersController = {
  index: (req, res) => {},
  register: (req, res) => {
    res.render("./index.ejs");
  },
  generateId: function () {
    let lastUser = users.pop();
    console.log(lastUser.id)
    if (lastUser) {
      return lastUser.id + 1;
    }
    
  },
  findByField:(field, text)  => {
    let userFound = users.find(userField => userField[field] === text)
    return userFound
},
  create: (req, res) => {
    const resultValidation = validationResult(req);
    console.log(req.body)
    if (resultValidation.errors.length > 0) {
      return res.render("./index.ejs", {
        errors: resultValidation.mapped(),
        old: req.body,
      });
    }

    let userByEmailInDB = usersController.findByField("email", req.body.email);
    

    if (userByEmailInDB) {
      return res.render("./index.ejs", {
        errors: {
          email: {
            msg: "This mail has been already register",
          },
        },
        old: req.body,
      });
    }
    
    let userToCreate = {
      id: usersController.generateId(),
      email: req.body.email,
      firstName: req.body.name,
      lastName: req.body.lastname,
    }
    delete userToCreate.confirmPassword
    console.log(userToCreate)
    console.log(users)
    

  
    usersController.createUser()

    return res.send('user created')
  },
  createUser: function ()  {
    users.push(usersController.create.userToCreate);
  }
};

module.exports = usersController;