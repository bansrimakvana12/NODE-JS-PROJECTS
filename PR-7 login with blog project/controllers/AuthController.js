const addModal = require('../models/addModal');

const UserModel = require('../models/UserModel');

const loginPage = (req, res) => {
    if (res.locals.users) {
        return res.redirect('viewblog')
    }
    return res.render('index')
}
const loginUser = (req, res) => {
    return res.redirect('viewblog')
}
const viewblogpage = (req, res) => {
    return res.render('viewblog')
}
const registerPage = (req, res) => {
    return res.render('register');
}



const addblogPage = (req,res) => {
    return res.render('addblog')
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        console.log("user successfully create");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;

    }
}


const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/');
    });
}




const addblogRecord = async (req, res) => {
    try {
        const { movie, moviename, movieintro, movieprice } = req.body;
        await addModel.create({
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
const viewblogData = async (req, res) => {
    try {
        let data = await addModel.find({});
        return res.render('viewblog', {
            data
        })
    } catch (err) {
        console.log(err);
        return false
    }
}


module.exports = {
    loginPage, loginUser,  registerUser, registerPage, logout , viewblogpage , addblogPage , addblogRecord , viewblogData
}