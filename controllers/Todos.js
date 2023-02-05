
import { addTodo, getAllTodos, getOneTodo, deleteTodo } from "../services/Todos.js";
import { todosAllowedUpdates } from '../data/data.js'

export const getAllTodosController = async (req, res) => {
    try {
        const allTodos = await getAllTodos();
        res.status(200).send(allTodos);

    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }

    // res.send(dummyTodos);
};

export const addTodoController = async (req, res) => {
    try {
        const todoTitle = req.body.title;
        const newTodo = await addTodo(todoTitle);
        res.status(200).send(newTodo);

    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }
    
    // dummyTodos.push(todo);
    // console.log(dummyTodos);
    // res.send(dummyTodos);
};

export const updateTodoController = async (req, res) => {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => todosAllowedUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400).send({ message: "Invalid updates" });
    }

    try {
        const { id } = req.params;
        const todo = await getOneTodo(id);
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
};

export const deleteTodoController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await deleteTodo(id);
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
};

