import { Router } from 'express';

const router = Router();

router.get ('/', (req, res) => {
    const user = {
        name: 'Juanito'
    }
    res.render('index', user)
})


export default router