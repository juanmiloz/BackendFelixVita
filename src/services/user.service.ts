import { AppDataSource } from "../config/db";
import { User } from "../entities/user.entity";
import jwt from "jsonwebtoken";

class UserService {
  private userRepository = AppDataSource.getRepository(User);

  public async findByUsername(username: string): Promise<User | null> {
    try {
      return this.userRepository.findOne({
        where: {
          username: username,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  public async create(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      throw err;
    }
  }

  public async generateToken(user: User): Promise<string> {
    const token = await jwt.sign(
      {
        user_id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "5m" }
    );

    return token;
  }
}

export default new UserService();
