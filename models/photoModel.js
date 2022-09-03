import mongoose from "mongoose";

/*  
    @info: Schema is a blueprint for how the data should look like.
        tr: Şema, verinin nasıl görüneceğini belirten bir taslaktır.

    @info: trim: true, means that the data will be trimmed before saving to the database.
        tr: trim: true, verinin veritabanına kaydedilmeden önce boşlukları temizleyeceğini belirtir.
*/

const { Schema } = mongoose;

const photoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
});

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;