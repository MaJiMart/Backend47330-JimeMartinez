import { Router } from 'express';
import userModel from '../../models/userModel.js';

const router = Router();

router.post('/sessions/register', async(req, res) => {
    const { body } = req;
    const newUser = await userModel.create(body);
    res.redirect('/')
});

router.post('/sessions/login', async(req, res) => {
    const { body: { email, password } } = req;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).send('Wrong email or password.')
    }
    const validPass = user.password === password;
    if (!validPass) {
        return res.status(401).send('Wrong email or password.')
    }
    const { first_name, last_name, is_admin } = user
    req.session.user = { first_name, last_name, is_admin, email }
    if (is_admin === true){
        res.redirect('/realtimeproducts')
    }else{
        res.redirect('/products')
    }
});

export default router