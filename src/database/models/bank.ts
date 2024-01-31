import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({

    bankName: { type: String, default: null },
    accountNumber: { type: String, default: null },
    IFSCcode: { type: String, default: null },
    taxNumber: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: true })

export const bankModel = mongoose.model('bank', bankSchema);  