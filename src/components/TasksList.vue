<template>
    <div class = 'tasksList'>
        <h2> List of Tasks go here.</h2>

        <table class="table">
            <thead class="table-dark">
                <tr>
                    <th class="description">Description</th>
                    <th class="edit">Edit</th>
                    <th class="delete">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="{ id, description, completed } in tasks" :key="id">
                    <td class="description" v-bind:class="{completed: completed}" @click='updateTaskCompletion(id)'>{{ description }}</td>
                    <td> 
                        <router-link :to="'/editTask?taskID=' + id" class="btn btn-primary">
                            Edit
                        </router-link>
                    </td>
                    <td><button class="btn btn-danger" @click='deleteTask(id)'>Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { ref, onUnmounted } from 'vue'

    import { db } from '../firebase'
    import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
    import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

    export default {
        setup() {
            const tasksCollection = collection(db, "tasks");

            const tasks = ref([]);

            const tasksQuery = query(tasksCollection, orderBy('creationTime', 'asc'));

            const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
                tasks.value = snapshot.docs.map(doc => ({ 
                    id: doc.id, ...doc.data() 
                }));
            });

            onUnmounted(unsubscribe);

            const updateTaskCompletion = async (taskID) => {
                try {
                    // Create a reference to the document
                    const docRef = doc(tasksCollection, taskID);
                    
                    // Get the document first to check if it exists
                    const docSnap = await getDoc(docRef);
                    
                    if (docSnap.exists()) {
                        // Get current completion status
                        const currentStatus = docSnap.data().completed;
                        // console.log('Current completion status:', currentStatus);
                        
                        const newStatus = !currentStatus;
                        // console.log('New completion status will be:', newStatus);
                        
                        await updateDoc(docRef, {
                            completed: newStatus
                        });
                        
                        console.log("Task completion status updated successfully from", currentStatus, "to", newStatus);
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error updating document: ", error);
                    // Log the full error details
                    // console.error("Error details:", {
                    //     message: error.message,
                    //     code: error.code,
                    //     stack: error.stack,
                    // });
                }
            }
            
            const deleteTask = async (taskID) => {
                try {
                    const docRef = doc(tasksCollection, taskID);
                    
                    const docSnap = await getDoc(docRef);
                    
                    if (docSnap.exists()) {
                        // Delete the document
                        await deleteDoc(docRef);
                        console.log("Document Deleted Successfully");
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.log("Error deleting document: ", error);
                }
            };

            return {
                tasks,
                deleteTask,
                updateTaskCompletion,
            }
        }
        
    }
</script>

<style>
.tasksList table th.edit,
.tasksList table th.delete {
    width: 100px;
}

.tasksList tbody td.description {
    cursor: pointer
}

.completed {
    text-decoration: line-through;
}
</style>