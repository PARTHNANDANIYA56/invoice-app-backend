import { number } from 'joi'
import mongoose from 'mongoose'
const invVoiceSchema = new mongoose.Schema({
    bill_date: { type: String, default: null },
    dueDate: { type: String, default: null },
    invoiceId: { type: Number, autoIncrement: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    item: [{
        itemName: { type: String, default: null },
        description: { type: String, default: null },
        qty_hour: { type: Number, default: 1 },
        price: { type: Number, default: null },
        total: { type: Number, default: null }
    }],
    taxNumber: { type: String, default: null },
    taxType: { type: String, default: null },
    taxRate: { type: Number, default: null },
    subTotal: { type: Number, default: null },
    total: { type: Number, default: null },
    currency: { type: String, default: null },
    notes: { type: String, default: "" },
    qty_hour: { type: Number, enum: [0, 1], default: 0 }, //  0 - QTY || 1 - hour 
    paymentStatus: { type: Number, enum: [0, 1, 2], default: 0 }, // 0-unpaid || 1-paid || 2-cancel
    isActive: { type: Boolean, default: true },
    
}, { timestamps: true })
export const invoiceModel = mongoose.model('invoice', invVoiceSchema)

