<template>
    <div class="taskEditor">
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
                <label>Task Creation Date: {{ taskCreationDateAndTimeOfDay }}</label>
            </div>
            <button type="submit" class="btn btn-success">Update Task</button>
        </form>
    </div>
</template>

<script>
    import { onMounted, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    import { db } from '../firebase'
    import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';

    export default {
        setup() {
            const tasksCollection = collection(db, "tasks");
            const route = useRoute()
            const router = useRouter()

            const taskID = ref(route.query.taskID)
            const taskDescription = ref('')
            const taskCompleted = ref(null)
            const taskCreationDateAndTimeOfDay = ref(0)

            // console.log(taskID)
            const getTask = async () => {
                try {
                    if (!taskID.value) {
                        console.error('No taskID provided')
                        return
                    }

                    const docRef = doc(tasksCollection, taskID.value);
                    
                    const docSnap = await getDoc(docRef);
                    
                    if (docSnap.exists()) {
                        // console.log(docSnap.data())
                        const taskData = docSnap.data();
                        taskDescription.value = taskData.description;
                        taskCompleted.value = taskData.completed;
                        taskCreationDateAndTimeOfDay.value = new Date(taskData.creationTime).toLocaleDateString('default', { 
                            month: 'long',
                            day: 'numeric', 
                            year: 'numeric', 
                        });
                    } else {
                        console.log("No such document!");
                        router.push('/')
                    }
                }
                catch (error) {
                    console.log("Error deleting document: ", error);
                    router.push('/')
                }
            };

            const updateTask = async () => {
                try {
                    if (!taskID.value) {
                        console.error('No taskID provided')
                        return
                    }

                    const docRef = doc(tasksCollection, taskID.value);
                    
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

            onMounted(() => {
                getTask(); // Fetch task data when component mounts
            });

            return {
                taskDescription,
                taskCompleted,
                taskCreationDateAndTimeOfDay,
                updateTask
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>