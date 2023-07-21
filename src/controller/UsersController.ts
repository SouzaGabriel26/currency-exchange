import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createUser } from './dtos/userDtos';
import UsersRepository from "../repository/UsersRepository";
import { CustomRequest } from "../interfaces/CustomRequest";

class UsersController {

  async signup(req: Request, res: Response) {
    const { email, name, password }: createUser = req.body;

    if (!email || !name || !password) {
      return res.status(402).json({ error: 'All fields required' });
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
      const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY!);
      return res.json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  async signin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).json({ error: 'All fields required' });
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
      const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY!);
      return res.json({ token });
    } catch (error) {
      console.log(error);
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
    const { id } = req.params;

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await UsersRepository.findUnique({
      where: {
        id
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

    if (!email || !name) {
      return res.status(402).json({ error: 'All fields required' });
    }

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const isEmailAlreadyTaken = await UsersRepository.findUnique({ where: { email } });

    const isUserOwnEmail = isEmailAlreadyTaken?.id === id;

    if (isEmailAlreadyTaken && !isUserOwnEmail) {
      return res.status(404).json({ error: 'This email is already in use' });
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

export default new UsersController();