import { Router } from 'express';
import UserModel from '../models/userModel.js';

const usersRouter = Router();

usersRouter.get ('/users', async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);
});

usersRouter.get ('/users/:uid', async (req, res) => {
    const { uid } = req.params;
    const user = await UserModel.findById({ _id: uid});
    if (!user) {
        return res.status(404).json({ message: 'User id not found' });
    }
    res.status(200).json(user);
});

usersRouter.post ('/users', async (req, res) => {
    const { body } = req;
    const user = await UserModel.create(body);
    res.status(201).json(user)
})

usersRouter.put ('/users/:uid', async (req, res) => {
    const { uid } = req.params;
    const { body } = req;
    await UserModel.updateOne({ _id: uid }, {$set: body});
    res.status(204).end();
})

usersRouter.delete ('/users/:uid', async (req, res) => {
    const { uid } = req.params;
    await UserModel.deleteOne({ _id: uid });
    res.status(204).end();
})


export default usersRouter