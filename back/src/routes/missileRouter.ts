import express from 'express'
import { getMissiles, getOrganizations } from '../controllers/missileController';

const router = express.Router()

router.route('/').get(getMissiles)
router.route('/organization').get(getOrganizations)


export default router;