import { Schema, Document, model, ObjectId, mongoose } from "../helpers/path";

const requiredString = { type: String, required: true }

const options = {
    timestamps: true,
    versionkey: true
}

interface IBooks extends Document {
    author: ObjectId,
    title: string,
    published_on: Date
}

const bookSchema = new Schema<IBooks>({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: requiredString,
    published_on: Date
}, options);

export const BookModel = model<IBooks>('book', bookSchema);