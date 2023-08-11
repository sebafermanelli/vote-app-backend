import {Router} from 'express';
import {loginAdmin, newAdmin} from "../controllers/admin.controller";

const router = Router();

//router.get('/', getAll);
//router.get('/:id', getById);

router.post('/', newAdmin);
router.post('/login', loginAdmin);

//router.put('/:id', update);

//router.delete('/:id', destroy);

export default router;