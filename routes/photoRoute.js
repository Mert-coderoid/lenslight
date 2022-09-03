import express from 'express';
import * as photoController from '../controllers/photoController.js';

const router = express.Router();

router
    .route('/')
    .get(photoController.getPhotos)
    .post(photoController.createPhoto);

router
    .route('/:id')
    .get(photoController.getPhotoById);
    
export default router;