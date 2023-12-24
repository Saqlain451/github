
import express from 'express';
import cors from 'cors';
import * as env from 'dotenv'
import axios from 'axios';
env.config();
const app = express();
app.use(cors());

const port = process.env.PORT



const getAuthorizaionCode = async (req, res) => {
    try {
        const redirect_url = req.query.url;
        console.log(redirect_url);
        const rootURl = 'https://github.com/login/oauth/authorize';
        const options = {
            client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
            redirect_uri: redirect_url,
            scope: 'user:email',
        };
        const qs = new URLSearchParams(options);
    
        res.redirect(`${rootURl}?${qs.toString()}`);
    } catch (error) {
        console.log(error);
    }
}


const getAccessToken = async (req, res) => {
    
    try {
        const result = await axios.get(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}&client_secret=${process.env.GITHUB_OAUTH_CLIENT_SECRET}&code=edf5fa81458336291a23`);
        console.log(result);
        res.status(201).json({message:"success", result: result.data})
    } catch (error) {
        console.log(error)
    }
}







app.get("/github/login", getAuthorizaionCode)
app.get("/github/token", getAccessToken)


app.get("/", (req, res) => {
    res.status(201).json({ message: "Hi this is home route" });
})


app.listen(port, () => {
    console.log(`App is running at port ${port}`)
})