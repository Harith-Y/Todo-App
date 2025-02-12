<template>
    <div class = 'taskEditor'>
        <router-link :to="'/'" class="btn btn-primary">Back</router-link>
        <h1>Task Editor</h1>
        <form @submit.prevent="updateTask">
            <div class="form-group">
                <label for="taskDescription">Task Description</label>
                <input type="text" class="form-control" id="taskDescription" v-model="taskDescription" placeholder="Add new Task Description here" required>
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="taskCompletionStatus" v-model="taskCompleted"/>
                <label for="taskCompletionStatus" class="form-check-label">Completed</label>
            </div>
            <div class="form-group">
                <label for="">Task Creation Date: {{ taskCreationDateAndTimeOfDay }}</label>
            </div>
            <button type="submit" class="btn btn-primary">Update Task</button>
        </form>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'

    import { db } from '../firebase'
    import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';

    export default {
        setup() {
            const tasksCollection = collection(db, "tasks");
            const route = useRoute()
            const taskID = route.query.taskID

            console.log(taskID)
            const getTask = async (taskID) => {
                    try {
                        const docRef = doc(tasksCollection, taskID);
                        
                        const docSnap = await getDoc(docRef);
                        
                        if (docSnap.exists()) {
                            // Testing
                            await console.log(docSnap.data());
                        } else {
                            console.log("No such document!");
                        }
                    } catch (error) {
                        console.log("Error deleting document: ", error);
                    }
            };

            return {
                // taskDescription,
                // updateTask,
            }
        } 
    }
</script>

<style lang="scss" scoped>

</style>