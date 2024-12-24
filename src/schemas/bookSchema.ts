import { Schema, Document, model, ObjectId, mongoose, Enum } from "../helpers/path";

const requiredString = { type: String, required: true }
const requiredNumber = { type: Number, required: true }

const options = {
    timestamps: true,
    versionkey: true
}

interface IBooks extends Document {
    author: ObjectId,
    title: string,
    description: string,
    price: number,
    isbn: number,
    published_on: Date,
    active: number
}

const bookSchema = new Schema<IBooks>({
    author: requiredString,
    title: requiredString,
    description: String,
    price: requiredNumber,
    isbn: Number,
    published_on: Date,
    active: { type: Number, default: Enum.STATUS.ACTIVE }
}, options);

export const BookModel = model<IBooks>('book', bookSchema);