import mongoose from 'mongoose';

const userGoogleSchema = mongoose.Schema(
    {
        googleId: {
            type: String,
            required: true,
            unique: true
        },
        displayName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }   
)

export const UserGoogle = mongoose.model("UserGoogle", userGoogleSchema);