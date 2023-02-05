import mongoose from "mongoose";

// schemas
const TodoSchema = new mongoose.Schema({                
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})


// model
export const Todos = mongoose.model('Todos', TodoSchema);      // Todos = collection, row = document