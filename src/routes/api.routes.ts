import { Router } from 'express';
import { getApi } from '../services/api.service';

const router = Router();

router.get('/', getApi);

export default router;
