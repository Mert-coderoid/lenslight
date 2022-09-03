// @desc    Get all photos
// @route   GET /api/v1/photos
// @access  Public
export const getPhotos = asyncHandler(async (req, res, next) => {
    const photos = await Photo.find();
    res.status(200).json({
        success: true,
        count: photos.length,
        data: photos
    });
});

// @desc    Get single photo
// @route   GET /api/v1/photos/:id
// @access  Public
export const getPhoto = asyncHandler(async (req, res, next) => {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
        return next(new ErrorResponse(`Photo not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: photo
    });
});

// @desc    Create new photo
// @route   POST /api/v1/photos
// @access  Private
export const createPhoto = asyncHandler(async (req, res, next) => {
    const photo = await Photo.create(req.body);
    res.status(201).json({
        success: true,
        data: photo
    });
});

// @desc    Update photo
// @route   PUT /api/v1/photos/:id
// @access  Private
export const updatePhoto = asyncHandler(async (req, res, next) => {
    const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!photo) {
        return next(new ErrorResponse(`Photo not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: photo
    });
});

// @desc    Delete photo
// @route   DELETE /api/v1/photos/:id
// @access  Private
export const deletePhoto = asyncHandler(async (req, res, next) => {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
        return next(new ErrorResponse(`Photo not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Upload photo
// @route   POST /api/v1/photos/:id/upload
// @access  Private
export const photoUpload = asyncHandler(async (req, res, next) => {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
        return next(new ErrorResponse(`Photo not found with id of ${req.params.id}`, 404));
    }
    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }
    const file = req.files.file;
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }
    file.name = `photo_${photo._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }
        await Photo.findByIdAndUpdate(req.params.id, { photo: file.name });
        res.status(200).json({
            success: true,
            data: file.name
        });
    });
});

// @desc    Get photos within a radius
// @route   GET /api/v1/photos/radius/:zipcode/:distance
// @access  Private
export const getPhotosInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    const radius = distance / 3963;
    const photos = await Photo.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });
    res.status(200).json({
        success: true,
        count: photos.length,
        data: photos
    });
});
