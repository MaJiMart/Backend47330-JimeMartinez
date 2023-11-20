import { Router } from "express";

const router = Router();

router.get('/adminproducts', (req, res) => {
    const userData = req.session.user;
res.render('adminProducts', { title: 'Admin Products' , user: userData})
})

export default router;