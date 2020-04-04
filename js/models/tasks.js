import Utils from '../helpers/utils.js';

class Tasks {
    constructor() {
        this.defaultTasks = [
            {
                id: Utils.generateID(),
                title: 'Task 1',
                status: 'In Progress',
                description: 'None'
            },
            {
                id: Utils.generateID(),
                title: 'Task 2',
                status: 'In Progress',
                description: 'None'
            },
            {
                id: Utils.generateID(),
                title: 'Task 3',
                status: 'Done',
                description: 'None'
            },
            {
                id: Utils.generateID(),
                title: 'Task 4',
                status: 'In Progress',
                description: 'None'
            },
            {
                id: Utils.generateID(),
                title: 'Task 5',
                status: 'In Progress',
                description: 'None'
            }
        ];
    }

    getTasksFromLS() {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
            if (!tasks) {
            tasks = this.defaultTasks;
            Tasks.setTasksToLS(this.defaultTasks);
            }

        return Tasks.sortByStatus(tasks);
    }

    static setTasksToLS(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static sortByStatus(tasks) {
        return tasks.sort((a, b) => {
            if (a.status > b.status) {
                return -1;
            }
            if (a.status < b.status) {
                return 1;
            }
            return 0;
        });
    }
}

export default Tasks;
