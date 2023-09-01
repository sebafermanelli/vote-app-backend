import { Router } from 'express';
import { loginAdmin, newAdmin, getAdmins } from '../services/admin.service';

const router = Router();

router.get('/', getAdmins);

router.post('/', newAdmin);
router.post('/login', loginAdmin);

export default router;
