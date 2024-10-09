import { Router } from 'express';

import * as moviesController from '../controllers/moviesController';
import { createMovieValidator, findMovie, updateMovieValidator } from '../validators/movieValidator';

const router = Router();

/**
 * GET /api/movies.
 */
router.get('/', moviesController.fetchAll);

/**
 * GET /api/movies/:id.
 */
router.get('/:id', moviesController.fetchById);

/**
 * POST /api/movies.
 */
router.post('/', createMovieValidator, moviesController.create);

/**
 * PATCH /api/movies/:id.
 */
router.patch('/:id', findMovie, updateMovieValidator, moviesController.update);

/**
 * DELETE /api/movies/:id.
 */
router.delete('/:id', findMovie, moviesController.remove);

export default router;
