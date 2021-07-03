// File to create test questions in mongoDB

const model = require('../model/model');
const mongoose = require('mongoose');
const Tenant = require('../model/tenant').Tenant;


model.connect(function () {


    mongoose.connection.collections['tenants'].drop(() => {
        // on supprimer tous les locataires et on en ajoute

        let t = new Tenant();
        t.email = "andranik@gmail.com"
        t.fistname = "Andranik"
        t.lastname = "Hayrapetyan"
        t.birthdate = new Date();
        t.address = "77 av de Victor Hugo"
        t.save()
    });


});








