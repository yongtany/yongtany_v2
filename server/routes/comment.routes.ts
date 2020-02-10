import { Router } from 'express';
import auth from '../middleware/auth';
import * as commentControllers from '../controllers/comment.controllers';

const router = Router();

router.post('/saveComment', auth, commentControllers.saveComment);
router.get('/:id/getComments', commentControllers.getComments);

export default router;
