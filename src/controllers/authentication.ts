import express from "express";

import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from "../helpers";


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password} = req.body

        if (!email || !password ) {
            return res.sendStatus(400);
        }
        
        const user = await getUserByEmail(email);
        
        if (!user) {
            return res.sendStatus(400);
        }

        if (!user.authentication) {
            return res.sendStatus(401);
        }
        
        // const hashedPassword = authentication(user.authentication.sessionToken, password);




    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const register = async (req: express.Request, res: express.Response) => {
    try {
        res.setHeader('Content-Type', 'application/json');

        const { email, password, username } = req.body

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication:{
                sessionToken: salt,
                password: authentication(salt, password),
            }
            
        });

        return res.status(200).json(user).end();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}