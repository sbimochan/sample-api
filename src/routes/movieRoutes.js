import { Router } from 'express';

import * as movieController from '../controllers/movie';
import { createMovieValidator, findMovie, updateMovieValidator } from '../validators/movieValidator';

const router = Router();

/**
 * GET /api/movies.
 */
router.get('/', movieController.fetchAll);

/**
 * GET /api/movies/:id.
 */
router.get('/:id', movieController.fetchById);

/**
 * POST /api/movies.
 */
router.post('/', createMovieValidator, movieController.create);

/**
 * PATCH /api/movies/:id.
 */
router.patch('/:id', findMovie, updateMovieValidator, movieController.update);

/**
 * DELETE /api/movies/:id.
 */
router.delete('/:id', findMovie, movieController.remove);

export default router;
