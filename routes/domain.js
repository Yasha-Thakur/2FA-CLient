require('dotenv').config()
const express = require('express')
const axios = require('axios');
const router = express.Router()


router.post('/savedomain', async (req, res) => {
    try {
        const clientid = req.cookies.clientid;
        const token = "Bearer " + req.cookies.token;
        const response = await axios.post(`${process.env.BACKENDSERVER}/domain/savedomain/${clientid}`, {
            domainname: req.body.domainname
        }, {
            headers: {
                "Authorization": token
            }
        })
        if (response.data.error == false) {
            return res.redirect('/dashboard')
        }
        return res.send("Some unknown error occured")
    } catch (error) {
        if (error.response.data.error) {
            const errorMessage = error.response.data.errorMessage;
            res.cookie('errorMessage', errorMessage, {
                httpOnly: true,
                maxAge: 60 * 1000,
                secure: true,
                path: "/"
            })
            return res.redirect('/dashboard')
        }
        return res.send(error)
    }

})

router.post('/verifydomain', async (req, res) => {
    try {
        const clientid = req.cookies.clientid;
        const token = "Bearer " + req.cookies.token;
        const response = await axios.post(`${process.env.BACKENDSERVER}/domain/verifytxt/${clientid}`, {
            domainname: req.body.domainname
        }, {
            headers: {
                "Authorization": token
            }
        })
        if (response.data.error == false) {
            return res.redirect('/dashboard')
        }
        return res.send("Some unknown error occured")
    } catch (error) {
        if (error.response.data.error) {
            const verifyMessage = error.response.data.errorMessage;
            res.cookie('verifyMessage', verifyMessage, {
                httpOnly: true,
                maxAge: 60 * 1000,
                secure: true,
                path: "/"
            })
            return res.redirect('/dashboard')
        }
        return res.send(error)
    }
})

module.exports = router
