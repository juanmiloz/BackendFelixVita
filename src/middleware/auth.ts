import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'; 
import { JwtInfoInterface } from "../interface/jwt.interface";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{

        let token = req.headers.authorization;
        if(!token){
            return res.status(401).json({ message: "Unauthorized" });
        }

        token = token.replace('Bearer ', '');
        const decoded: JwtInfoInterface = await jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtInfoInterface;
        
        if(decoded.username !== req.params.username){
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.body.loggedUser = decoded;
        next();
    }catch (err){
        if( err instanceof Error){
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}