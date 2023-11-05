import { Router } from 'express';

const router = Router();

router.get ('/', (req, res) => {
    const user ={
        name: 'Juanito'
    }
    res.render('home', user)
})


export default router