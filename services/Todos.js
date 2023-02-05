
import { Todos } from '../models/Todos.js';

export const getAllTodos = () => {
    return Todos.find({});
}

export const getOneTodo = (id) => {
    return Todos.findOne({ _id: id })
}

export const addTodo = (todoTitle) => {
    const newTodo = new Todos({ title: todoTitle });
    return newTodo.save();
}

export const deleteTodo = (id) => {
    return Todos.findOneAndDelete({ _id: id })
}