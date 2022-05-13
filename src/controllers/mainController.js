const { validationResult } = require("express-validator");
const path = require("path");
const bcryptjs = require("bcryptjs");
//const User = require(path.resolve("./src/model/model.js"));

const users = [
  {
    id: '1',
    email: 'federicor@onetree.com',
    firstName: 'federico',
    lastName: 'rezzano',
  },
  {
    id: '2',
    email: 'emanuel.jofre@onetree.com',
    firstName: 'emanuel',
    lastName: 'jofre',
  },
  {
    id: '3',
    email: 'hermione.granger@onetree.com',
    firstName: 'hermoine',
    lastName: 'granger',
  },
  {
    id: '4',
    email: 'harryPotter@onetree.com',
    firstName: 'harry',
    lastName: 'potter',
  },
];

const user = users.map( user => { return user})

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
    if (lastUser) {
      return lastUser.id+1;
    }
    return 1;
    
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
      return res.render("/index", {
        errors: {
          email: {
            msg: "This mail has been already register",
          },
        },
        old: req.body,
      });
    }
    
    let userToCreate = {
      id: this.generateId(),
      name: req.body.name,
      lastname: req.body.lastname,
      password: bcryptjs.hashSync(req.body.password, 10),
      confirmPassword: req.body.confirmPassword,
      email: req.body.email,
     //patientCaregiver: req.body.patientCaregiver.value

    }
    delete userToCreate.confirmPassword
    JSON.parse(userToCreate)
     users.push(userToCreate);
     console.log(users)


    return res.send('user created')
  },
  /*enterLogin: (req, res) => {
    let userToLogin = User.findByField("email", req.body.email);

    if (userToLogin) {
      let isPasswordOk = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (isPasswordOk) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.remember_me) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 2 });
        }
        return res.redirect("/users/userProfile");
      }
      return res.render("./users/login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }
    return res.render("./users/login", {
      errors: {
        email: {
          msg: "El Email ingresado no se encuentra registrado",
        },
      },
    });
  },*/
};
console.log(users)
module.exports = usersController;