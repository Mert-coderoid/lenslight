import Photo from "../models/photoModel.js";
import asyncHandler from "express-async-handler";

// @desc    create photo
// @route   POST /photos
// @access  
const createPhoto = asyncHandler(async (req, res, next) => {
    try {
        console.log(`photoController.createPhoto: req.body = ${JSON.stringify(req.body)}`);
        const photo = await Photo.create(req.body);
        res.status(201).json({
            success: true,
            photo: photo
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        });
        console.log(`photoController.createPhoto: error = ${error}`);
        next(error);
    }
});

// @desc    get all photos
// @route   GET /photos
// @access
const getPhotos = asyncHandler(async (req, res, next) => {
    try {
        const photos = await Photo.find({})
        res.status(200).render('photos', { 
            photos: photos,
            active_page: 'photos'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        });
        console.log(`photoController.getPhotos: error = ${error}`);
        next(error);
    }
});

// @desc    get photo by id
// @route   GET /photos/:id
// @access
const getPhotoById = asyncHandler(async (req, res, next) => {
    try {
        const photo = await Photo.findById({
            _id : req.params.id
        });
        res.status(200).render('photo', {
            photo: photo,
            active_page: 'photos'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        });
        console.log(`photoController.getPhotoById: error = ${error}`);
        next(error);
    }
})

export { createPhoto, getPhotos, getPhotoById };