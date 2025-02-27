'use strict'

import jwt from 'jsonwebtoken'
import { findAdmin } from '../utils/db.validators'

export const validateJwt = async(req, res, next) => {
    try{
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
        let admin = jwt.verify(authorization, secretKey)
        const validateAdmin = await findAdmin(admin.uid)
        if(!validateAdmin) return res.status(404).send(
            {
                success: false,
                message: 'Admin not found - unauthorized'
            }
        )
        req.admin = admin
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid credentials'})
    }
}
