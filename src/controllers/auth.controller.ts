import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import bcrypt from 'bcrypt';
import userService from "../services/user.service";

class AuthController {

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            
            const { username, password } = req.body;

            const userSearched: User | null = await userService.findByUsername(username);
            if(!userSearched){
                return res.status(401).json({title: "Authentication Error", message: "The username or password is incorrect. Please check your credentials and try again."});
            }

            const isMatch = await bcrypt.compare(password, userSearched.password);
            if(!isMatch){
                return res.status(401).json({title: "Authentication Error", message: "The username or password is incorrect. Please check your credentials and try again."});
            }

            const token = await userService.generateToken(userSearched);

            return res.status(200).json({ 
                username: username,
                token: token
            });  
        } catch (err) {
            if(err instanceof Error){
                return res.status(500).json({ message: err.message });
            }else{
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    
    public async register(req: Request, res: Response): Promise<Response> {
        try {
            
            const { username, password } = req.body;

            const user = new User();
            user.username = username;
            user.password = await bcrypt.hash(password, 10);

            const userSearched: User | null = await userService.findByUsername(username);
            if(userSearched){
                return res.status(400).json({ message: 'User already exists' });
            }

            const userSaved = await userService.create(user);

            return res.status(200).json({ userSaved: userSaved });  
        } catch (err) {
            if(err instanceof Error){
                return res.status(500).json({ message: err.message });
            }else {
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    public async getall(req: Request, res: Response): Promise<Response> {
        try {
            
            const users = await User.find();

            return res.status(200).json({ users: users });  
        } catch (err) {
            return res.status(500).json({ message: err});

        }
    }
    

}

export default new AuthController();