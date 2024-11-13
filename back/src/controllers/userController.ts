import { Request, Response } from 'express';
import User from '../models/userModel';



export const registerUser = async (req: Request, res: Response):Promise<void> => {
  const { username, password, organization, location } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      {res.status(400).json({ message: 'Username already exists' });
        return  
      }    

    const newUser = new User({
      username,
      password: password,
      organization,
      location: organization === 'IDF' ? location : undefined,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });


  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response):Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)  {
      res.status(400).json({ message: 'Invalid credentials' });
      return
    }
    res.json({ message: 'Login successful',
      user: { username: user.username, organization: user.organization, location: user.location },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};