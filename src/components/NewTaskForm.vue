<template>
    <div>
        <h1>Create New Task</h1>
        <form @submit.prevent="createNewTask">
            <div class="form-group">
                <!-- <label for="newTask">New Task</label> -->
                <input type="text" class="form-control" v-model="newTask.description" placeholder="Enter new task" required>
            </div>
            <button type="submit" class="btn btn-success">Add Task</button>
        </form>
    </div>
</template>

<script>
    import { reactive } from 'vue'
    import { db } from '../firebase'
    import { collection, addDoc } from "firebase/firestore"

    export default {
        setup() {
            const newTask = reactive({
                description: '',
                creationTime: null,
                completed: false,
            })
            const tasksCollection = db.collection('tasks')
            
            const createNewTask = async () => {
                if (!newTask.description.trim()) return; // Prevent empty tasks

                try {
                    newTask.creationTime = Date.now();
                    await addDoc(collection(db, "tasks"), { ...newTask }); // ✅ Correct Firebase 9+ syntax

                    newTask.description = ""; // Clear input field
                } catch (error) {
                    console.error("Error adding task:", error);
                }
            };

            return {
                newTask,
                createNewTask,
            }
        }
    }
</script>

<style>

</style>