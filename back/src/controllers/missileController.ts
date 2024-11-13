import { Request, Response } from 'express';
import Missile from '../models/MissileModel';
import Organization from '../models/OrganizationModel';

export const getMissiles = async (req: Request, res: Response) => {
  try {
    const missiles = await Missile.find();
    res.json(missiles);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const organization = await Organization.find();
    res.json(organization);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

