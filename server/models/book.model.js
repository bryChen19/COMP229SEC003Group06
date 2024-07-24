import mongoose from 'mongoose'
const BookSchema = new mongoose.Schema({
title: {
type: String,
trim: true,
required: 'Title is required'
},
author: {
type: String,
trim: true,
required: 'Author is required'
},
genre: {
    type: String,
    trim: true
},
created: {
type: Date,
default: Date.now
},
updated: {
type: Date,
default: Date.now
}
})

export default mongoose.model('Book', BookSchema);
