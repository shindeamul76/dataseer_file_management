

import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@main/config"


export function generateToken (id: number) {
    return jwt.sign({id: id}, JWT_SECRET as string, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      })
}