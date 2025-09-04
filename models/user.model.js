import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter your name"],
            unique: true
        },
        displayname: {
            type: String,
            required: [true, "Please enter your display name"]
        },
        password: {
            type: String,
            required: [true, "Please enter your password"]
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema);