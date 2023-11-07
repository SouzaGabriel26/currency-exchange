import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { CustomRequest } from '../middlewares/userAuth';
import UsersRepository from "../repository/UsersRepository";
import { createUser } from './dtos/userDtos';

const secret = process.env.SECRET_KEY as string;

class UsersController {

  async signup(req: Request, res: Response) {
    const { email, name, password }: createUser = req.body;

    if (!email || !name || !password) {
      return res.status(402).json({ error: 'All fields required: email, name and password' });
    }

    if (password.length < 5) {
      return res.status(402).json({ error: 'Password must be at least 5 characters' });
    }

    const userExists = await UsersRepository.findUnique({
      where: {
        email
      }
    });

    if (userExists) {
      return res.status(409).json({ error: 'This email is already taken'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UsersRepository.create({
      data: {
        email,
        name,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    try {
      const token = generateAccessToken({ sub: user.id });
      return res.json({ token });
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).json({ error: 'All fields required: email and password' });
    }

    if (password.length < 5) {
      return res.status(402).json({ error: 'Password must be at least 5 characters' });
    }

    const user = await UsersRepository.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(409).json({ error: 'Invalid password' });
    }

    try {
      const token = generateAccessToken({ sub: user.id});
      return res.json({ token });
    } catch (error) {
      console.log(error);
      throw new Error();
    }

  }
  
  async findAll(req: Request, res: Response) {
    const users = await UsersRepository.findAll({
      select: {
        id: true,
        email: true,
        name: true,
        trades: true,
      }
    });

    return res.json(users);
  }
  
  async show(req: CustomRequest, res: Response) {
    const { userId } = req;

    const user = await UsersRepository.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        email: true,
        name: true,
        trades: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } 

  async update(req: CustomRequest, res: Response) {
    const { id } = req.params;

    const { email, name } = req.body;

    if (!email && !name) {
      return res.status(402).json({ error: 'At least one field is required: email or name' });
    }

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (email) {
      const isEmailAlreadyTaken = await UsersRepository.findUnique({ where: { email } });
  
      const isUserOwnEmail = isEmailAlreadyTaken?.id === id;
  
      if (isEmailAlreadyTaken && !isUserOwnEmail) {
        return res.status(404).json({ error: 'This email is already in use' });
      }
    }

    const newUser = await UsersRepository.update({
      where: {
        id
      },
      data: {
        email,
        name
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    return res.status(200).json({ newUser });
  }

  async delete(req: CustomRequest, res: Response) {
    const { id } = req.params;

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    await UsersRepository.delete({
      where: {
        id,
      }
    });

    return res.sendStatus(204);
  }

}

function generateAccessToken(payload: Record<string, any>) {
  return jwt.sign(payload, secret, {
    expiresIn: '1d',
  });
}

export default new UsersController();