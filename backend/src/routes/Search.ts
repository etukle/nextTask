import express from 'express';
import controller from '../controllers/Search';

const router = express.Router();

router.post('/', controller.getSongs);

export = router;
