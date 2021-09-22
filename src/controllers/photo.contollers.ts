import {Request, Response} from 'express';
import Photo from '../models/Photo';
import fs from 'fs-extra';
import path from 'path';

// Get
export async function getPhotos(req: Request, res: Response){
    const photos = await Photo.find();
    return res.json(photos);
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const photo = await Photo.findById(req.params.id);
    return res.json(photo);
}

// Post
export async function createPhoto(req: Request, res: Response){
    const {title, description} = req.body;
    const newPhoto = {
        title,
        description,
        imagePath: req.file?.path
    }
    const photo = new Photo(newPhoto);
    await photo.save();
    
    return res.json({
        message: 'Photo saved successfully',
        photo
    })
}

// Delete
export async function deletePhoto(req: Request, res: Response):Promise<Response> {
    const photo = await Photo.findByIdAndRemove(req.params.id);
    if(photo){
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.send({
        message: 'Photo deleted successfully'
    })
}

// update
export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    const {title, description} = req.body;
    const updatePhoto = await Photo.findByIdAndUpdate(id,{ 
        title,
        description
    });
    return res.send({message: 'Photo updated successfully', updatePhoto});
}