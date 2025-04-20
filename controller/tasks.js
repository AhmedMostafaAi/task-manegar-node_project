const Task = require('../models/Task');
const mongoose = require('mongoose');





const getAllTasks =async (req, res) => {
    try {
    const tasks = await Task.find();
    res.json({tasks});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }  // end try-catch block
};




const createTasks = async(req, res) => {
    try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
}; 


const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        if (!taskID) {
            return res.status(400).json({ error: 'Task ID is missing in request' });
        }
        if (!mongoose.Types.ObjectId.isValid(taskID)) {
            return res.status(400).json({ error: 'Invalid task ID format' });
        }
        const task = await Task.findById(taskID);
        if (task) {
            res.json({ task });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
};


;const updateTask = async(req, res) => {
    try {
        const { id: taskID } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(taskID, req.body,{
            new : true,
            validatores: true
        });
        if (updatedTask) {
            res.json({ task: updatedTask });
        } else {
            return res.status(404).json({ message: 'Task not found' });
        }
        } catch (err) {
        return res.status(400).json({ error: err.message });
    

    }};

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID }); // Using _id instead of id

        if (task) {
            return res.json({ message: 'Task deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllTasks,
    createTasks,
    getTask,
    updateTask,
    deleteTask,
 };
