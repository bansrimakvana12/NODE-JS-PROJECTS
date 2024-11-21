const UserModel = require('../models/UserModel');

const fs = require('fs');

const formPage = (req, res) => {
    return res.render('form')
}
const addRecord = async (req, res) => {
    try {
        const { movie, moviename, movieintro, movieprice } = req.body;
        await UserModel.create({
            movie: movie,
            moviename: moviename,
            movieintro: movieintro,
            movieprice: movieprice,
            image: req.file.path,
        })
        return res.redirect('back')
    } catch (err) {
        console.log(err);
        return false;

    }
}
const viewData = async (req, res) => {
    try {
        let users = await UserModel.find({});
        return res.render('view', {
            users
        })
    } catch (err) {
        console.log(err);
        return false
    }
}
const deleteRecord = async (req, res) => {
    try {
        let id = req.query.id;
        console.log(id);
        
        let single = await UserModel.findById(id);
       
        
        fs.unlinkSync(single.image);
        await UserModel.findByIdAndDelete(id);
        console.log(`user delete`);
        return res.redirect('viewrecord');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const editRecord = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await UserModel.findById(id);
        return res.render('edit', {
            single
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateRecord = async (req, res) => {
    try {
        const { editid, name, email, password, gender, hobby, city } = req.body;
        if (req.file) {
            let single = await UserModel.findById(editid);
            fs.unlinkSync(single.image);
            await UserModel.findByIdAndUpdate(editid, {
                name: name,
                email: email,
                password: password,
                gender: gender,
                hobby: hobby,
                city: city,
                image: req.file.path
            })
            console.log("record update");
            return res.redirect('/view');
        } else {
            let single = await UserModel.findById(editid);
            await UserModel.findByIdAndUpdate(editid, {
                name: name,
                email: email,
                password: password,
                gender: gender,
                hobby: hobby,
                city: city,
                image: single.image
            })
            console.log("record update");
            return res.redirect('/view');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    formPage, addRecord, viewData, deleteRecord, editRecord, updateRecord
}