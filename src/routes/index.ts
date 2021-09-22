import {Router} from 'express';
import {createPhoto,getPhotos,getPhoto,deletePhoto,updatePhoto} from '../controllers/photo.contollers'

import multer from '../libs/multer';

const router = Router();

router.post('/photo', multer.single('image'),createPhoto);
router.get('/photo', getPhotos);
router.route('/photo/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto)


export default router;