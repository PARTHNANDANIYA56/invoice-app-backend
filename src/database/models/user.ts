
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email: { type: String, default: null },
    password: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    phoneNumber: { type: Number, default: null },
    address: { type: String, default: null },
    companyName: { type: String, default: null },
    taxNumber: { type: String, default: null },
    taxType: { type: String, default: null },
    userType: { type: Number, enum: [0, 1, 2] },// 0-Admin ||1-User || 2-Client
    isActive: { type: Boolean, default: true },
}, { timestamps: true })


export const userModel = mongoose.model('user', userSchema);
