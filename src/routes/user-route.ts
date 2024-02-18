


import { createUser } from '@controllers/user/create-user-controller';
import { loginUser } from '@controllers/user/login-user-controller';
import express from 'express'


export const userRouters = express.Router();


userRouters.post('/create', createUser);

userRouters.post('/login', loginUser)
