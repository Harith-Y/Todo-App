<template>
    <div>
        <h1>Create New Task</h1>
        <form @submit.prevent="createNewTask">
            <div class="form-group">
                <input type="text" class="form-control" v-model="newTask.description" placeholder="Enter new task" required>
            </div>
            <button type="submit" class="btn btn-success">Add Task</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

export default {
    setup() {
        const newTask = ref({ 
            description: '', 
            creationTime: null, 
            completed: false,
        });
        
        const tasksCollection = collection(db, "tasks");

        const createNewTask = async () => {
            if (!newTask.value.description.trim()) return; // Prevent empty tasks

            try {
                newTask.value.creationTime = Date.now();
                await addDoc(tasksCollection, { ...newTask.value });

                // Reset task after adding
                newTask.value = { description: '', creationTime: null, completed: false };
            } catch (error) {
                console.error("Error adding task:", error);
            }
        };

        return {
            newTask,
            createNewTask,
        };
    }
};
</script>