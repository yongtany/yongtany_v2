import { Router } from 'express';
import auth from '../middleware/auth';
import * as favoriteControllers from '../controllers/favorite.controllers';

const router = Router();

router.post('/favoriteNumber', auth, favoriteControllers.favoriteNumber);
router.post('/favorited', auth, favoriteControllers.favorited);
router.post('/addToFavorite', auth, favoriteControllers.addToFavorite);
router.post('/removeFromFavorite', auth, favoriteControllers.removeFromFavorite);

export default router;
