import express from 'express'
import cors from 'cors'

import { dummyTodos, todosAllowedUpdates } from './data/data.js'

import { mongoose } from 'mongoose'

import * as dotenv from 'dotenv'
import { addTodoController, deleteTodoController, getAllTodosController, updateTodoController } from './controllers/Todos.js'

dotenv.config();
const { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

// server initialization
const app = express();

// middlewares for the server
app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', true);




// routes

// get - fetch from db - mongo function : findOne({condition:condition}) / find({condition:condition}) or find({})
// post - add an item to db - new Model({parameters:parameters}) --> model.save()
// put - edit an item inside the db - valid operations --> findOne({condition:condition}) --> model.save()
// delete - delete an item from the db - findOneAndDelete({condition:condition})

// build from path and a function that called controller

// app.get('/api/calculator', async (req, res) => {
//     res.send('5');
// });

// app.get('/api/todos/getAllTodos', async (req, res) => {      // before models, services, controllers folders
//     try {
//         const allTodos = await Todos.find({});
//         res.status(200).send(allTodos);
//     } catch(error) {
//         console.log(error);
//         res.status(500).send({message:{error}});
//     }
//     // res.send(dummyTodos);
// })


// routes for todos
app.get('/api/todos/getAllTodos', getAllTodosController);

app.post('/api/todos/addTodo', addTodoController);

app.put('/api/todos/updateTodo/:id', updateTodoController);

app.delete('/api/todos/deleteTodo/:id', deleteTodoController);


// without mongodb atlas :
// mongoose.connect('mongodb://127.0.0.1:27017/todos', {               // todos = db
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// // listener at the bottom which concludes the listening function to fulfill all of the requests
// app.listen(PORT, () => {
//     console.log('server listening at port *')
// });

// with mongodb atlas :
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {               
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (info) => {
    console.log('info ?', info);
    app.listen(PORT, () => {
        console.log('server listening at port *')
    })
})
