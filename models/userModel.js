import mongoose from "mongoose";
import bcrypt from "bcrypt";

/*  
    @info: Schema is a blueprint for how the data should look like.
        tr: Şema, verinin nasıl görüneceğini belirten bir taslaktır.

    @info: unique: true, means that the data will be unique.
        tr: unique: true, verinin benzersiz olacağını belirtir.
*/

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},  
    {
        timestamps: true,
    }
);

// hash password before saving to database
userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});


const User = mongoose.model("User", userSchema);

export default User;