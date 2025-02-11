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
                    <td class="description" v-bind:class="{completed: completed}">{{ description }}</td>
                    <td> 
                        <router-link :to="'/editTask?taskID=' + id" class="btn btn-primary">
                            Edit
                        </router-link>
                    </td>
                    <td><button class="btn btn-danger">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { ref, onUnmounted } from 'vue'

    import { db } from '../firebase'
    import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

    export default {
        setup() {
            const tasksCollection = collection(db, "tasks");

            const tasks = ref([]);

            const tasksQuery = query(tasksCollection, orderBy('creationTime', 'asc'));

            const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
                console.log(snapshot.docs.map(doc => doc.data()));
            });

            onUnmounted(unsubscribe);

            return {
                tasks,
            }
        }
        
    }
</script>

<style>
.tasksList table th.edit,
.tasksList table th.delete {
    width: 100px;
}

.completed {
    text-decoration: line-through;
}
</style>