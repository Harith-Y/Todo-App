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
    import { onUnmounted, ref } from 'vue'
    import { useRoute } from 'vue-router'

    import { db } from '../firebase'
    import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';
    
    import router from '@/router';

    export default {
        setup() {
            const tasksCollection = collection(db, "tasks");
            const route = useRoute()
            const taskID = route.query.taskID
            const taskDescription = ref('')
            const taskCompleted = ref(null)
            const taskCreationDateAndTimeOfDay = ref(0)

            // console.log(taskID)
            const getTask = async (taskID) => {
                try {
                    const docRef = doc(tasksCollection, taskID);
                    
                    const docSnap = await getDoc(docRef);
                    
                    if (docSnap.exists()) {
                        // console.log(docSnap.data())
                        taskDescription.value = docSnap.data().description
                        taskCompleted.value = docSnap.data().completed
                        taskCreationDateAndTimeOfDay.value = new Date(docSnap.data().creationTime).toLocaleTimeString('default', { 
                            // hour12: false,
                            month: 'long',
                            day: 'numeric', 
                            year: 'numeric', 
                        })
                    } else {
                        console.log("No such document!");
                    }
                }
                catch (error) {
                    console.log("Error deleting document: ", error);
                }

                onUnmounted(getTask)

                const updateTask = async (taskID) => {
                    try {
                        const docRef = doc(tasksCollection, taskID);
                        
                        const docSnap = await getDoc(docRef);
                        
                        if (docSnap.exists()) {
                            await updateDoc(docRef, {
                                description: taskDescription.value,
                                completed: taskCompleted.value
                            });
                            
                            console.log("Task updated successfully!");
                            router.push('/')
                        } else {
                            console.log("No such document!");
                        }
                    }
                    catch (error) {
                        console.log("Error updating document: ", error);
                    } 
                };

                return {
                    updateTask,
                    taskDescription,
                    taskCompleted,
                    taskCreationDateAndTimeOfDay,
                }
            } 
        }
    }
</script>

<style lang="scss" scoped>

</style>