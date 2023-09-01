import { Router } from 'express';
import {
	createStudent,
	destroyStudent,
	getStudentById,
	getStudents,
	updateStudent,
} from '../services/student.service';

const router = Router();

router.get('/', getStudents);
router.get('/:dni', getStudentById);
router.post('/', createStudent);
router.put('/:dni', updateStudent);
router.delete('/:dni', destroyStudent);

export default router;
