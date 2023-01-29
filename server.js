import express from 'express'
import cors from 'cors'

import { dummyTodos, todosAllowedUpdates } from './data/data.js'

import { mongoose } from 'mongoose'

import { dotenv } from 'dotenv'

dotenv.config();
const PORT = process.env

// server initialization
const app = express();

// middlewares for the server
app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', true);


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
const Todos = mongoose.model('Todos', TodoSchema);      // Todos = collection, row = document


// routes

// get - fetch from db - mongo function : findOne({condition:condition}) / find({condition:condition}) or find({})
// post - add an item to db - new Model({parameters:parameters}) --> model.save()
// put - edit an item inside the db - valid operations --> findOne({condition:condition}) --> model.save()
// delete - delete an item from the db - findOneAndDelete({condition:condition})

// build from path and a function that called controller

// app.get('/api/calculator', async (req, res) => {
//     res.send('5');
// });

app.get('/api/todos/getAllTodos', async (req, res) => {
    try {
        const allTodos = await Todos.find({});
        res.status(200).send(allTodos);
    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }
    // res.send(dummyTodos);
})

app.post('/api/todos/addTodo', async (req, res) => {
    try {
        const todoTitle = req.body.title;
        const newTodo = new Todos({title: todoTitle}); // insertMany
        await newTodo.save();
        res.status(200).send(newTodo);
    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }
    

    // dummyTodos.push(todo);
    // console.log(dummyTodos);
    // res.send(dummyTodos);
});

app.put('/api/todos/updateTodo/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => todosAllowedUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({ message: "Invalid updates" });
    }

    try {
        const { id } = req.params;
        const todo = await Todos.findOne({ _id: id });
        if (!todo) {
            res.status(404).send({ message: 'todo does not exist' });
        }

        updates.forEach((update) => (todo[update] = req.body[update]));
        await todo.save();
        res.status(200).send(todo);
    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }

    // const newTitle = req.body.title;

    // const clone = [...dummyTodos];      // not needed with db
    
    // const todoIndex = clone.findIndex((todo) => todo.id === +id);
    // clone[todoIndex].title = newTitle;
    
    // res.send(clone);


})

app.delete('/api/todos/deleteTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todos.findOneAndDelete({_id: id});
        if (!deletedTodo) {
            res.status(404).send({message: "no todo with such id"});
        }
        res.status(200).send(deletedTodo);
    } catch(error) {
        console.log(error);
        res.status(500).send({message:error});
    }
    // const { id } = req.params;

    // const clone = [...dummyTodos];      // not needed with db
    
    // const todoIndex = clone.findIndex((todo) => todo.id === +id);
    // if (todoIndex === -1) {
    //     res.status(404).send({message:'no todo at such index'});
    // }
    // clone.splice(todoIndex, 1);
    
    // res.send(clone);
})


// without mongodb atlas :
mongoose.connect('mongodb://127.0.0.1:27017/todos', {               // todos = db
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// listener at the bottom which concludes the listening function to fulfill all of the requests
app.listen(PORT, () => {
    console.log('server listening at port *')
});


// with mongodb atlas :
// mongoose.connect('mongodb at atlas', {               
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (info) => {
//     console.log('info ?', info);
//     app.listen(PORT, () => {
//         console.log('server listening at port *')
//     })
// })