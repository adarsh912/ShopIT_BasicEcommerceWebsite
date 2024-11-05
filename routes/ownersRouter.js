const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model')


// console.log(process.env.NODE_ENV); //gives 'undefine if the env is not setup...to set env ...:  export NODE_ENV=development  

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        // res.send("its working owner");
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
                .status(500)
                .send("you dont have permision to create the owner");
        }


        // res.send("we can create a newowner");
        let { fullname, email, password } = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,

        });

        res.status(201).send(createdOwner);

    });
}

router.get('/admin', (req, res) => {
    let success = req.flash("success");
    res.render('createproducts', { success });
});


module.exports = router;