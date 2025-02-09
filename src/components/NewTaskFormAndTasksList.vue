<template>
    <div class="newTaskFormAndTasksList">
        <NewTaskForm />
        <TasksLists />
    </div>
</template>

<script>

    import NewTaskForm from './components/NewTaskForm.vue';
    import TasksList from './components/TasksList.vue';
    
    export default {
        name: "App",
        components: {
            NewTaskForm,
            TasksList
        },
        data() {
            return {
                tasks: [],
                newTask: ''
            }
        },
        methods: {
            addTask() {
                this.tasks.push(this.newTask);
                this.newTask = '';
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>