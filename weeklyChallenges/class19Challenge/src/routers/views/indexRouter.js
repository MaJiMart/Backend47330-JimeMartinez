import { Router } from 'express';

const router = Router();

router.get ('/', (req, res) => {
    /* if (req.session.user) {
        res.redirect ('/products')
    } */
    res.render('index', { title: 'Ecofriendly Shop', user: req.session.user })
})


export default router