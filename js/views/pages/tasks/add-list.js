import Utils from '../../../helpers/utils.js';

import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`                     
                <h1 class="page-title">My To-Do List</h1>

                <h2></h2>
    
                <div class="task-add">
                    <input class="task-add__title" type="text" placeholder="What needs to be done?">
    
                    <textarea class="task-add__description" placeholder="Task description"></textarea>
    
                    <button class="task-add__btn-add" title="Add task"></button>
                </div>  
    
                <div class="tasks">
                    <div class="tasks__clear">
                        <div class="count-tasks"></div>
                        <button id="buttonClear" class="button" ${!this.tasks.length ? 'disabled' : ''}>Clear All</button>
                    </div>
    
                    <div class="tasks__list">
                        ${this.tasks.map(task => this.getTaskHTML(task)).join('\n ')}
                    </div>
                </div>            
            `);
        });
    }

    afterRender() {
        this.setActions();
        this.countNumberTasks();
        this.showDate();
    }

    showDate() {
        const currentDate = new Date(2020, 0, 21),
            year = currentDate.getFullYear(),
            date = currentDate.getDate(),
            months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
            monthIndex = currentDate.getMonth(),
            monthName = months[monthIndex],
            days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
            dayName = days[currentDate.getDay()];
        document.getElementsByTagName('h2')[0].textContent = `${dayName}, ${monthName} ${date}, ${year}`;

    }

    setActions() {
        const addTaskTitle = document.getElementsByClassName('task-add__title')[0],
            addTaskDescription = document.getElementsByClassName('task-add__description')[0],
            addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
            tasksContainer = document.getElementsByClassName('tasks')[0],
            tasksList = document.getElementsByClassName('tasks__list')[0],
            buttonClear = document.getElementById('buttonClear');

        addTaskTitle.addEventListener('keyup', () => addTaskBtn.disabled = !addTaskTitle.value.trim());
        addTaskBtn.addEventListener('click', () => {
            this.addTask(addTaskTitle, addTaskDescription, addTaskBtn, tasksList);
            this.setBtnVisibility(buttonClear, false);
        });

        tasksList.addEventListener('click', (event) => {
            if (event.target.classList.contains('task')) {
                event.target.classList.toggle('open');
            }
        });

        buttonClear.addEventListener('click', () => this.clearTasks());

        tasksContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
                    break;

                case targetClassList.contains('task__btn-done'):
                    this.setTaskIsDone(target.parentNode);
                    break;

                case targetClassList.contains('task__btn-remove'):
                    this.removeTask(target.parentNode.parentNode);
                    break;
            }
        });
    }

    addTask(addTaskTitle, addTaskDescription, addTaskBtn, tasksList) {
        const newTask = {
            id: Utils.generateID(),
            title: addTaskTitle.value.trim(),
            description: addTaskDescription.value.trim() || 'None',
            status: 'In Progress'
        };

        this.tasks.push(newTask);
        Tasks.setTasksToLS(this.tasks);

        this.clearFormAddTask(addTaskTitle, addTaskDescription, addTaskBtn);

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));
        this.countNumberTasks();

    }

    getTaskHTML(task) {
        return `
            <div class="task" data-id="${task.id}">
                <button class="task__btn-done" title="Done"></button>
                <a class="task__title ${task.status === 'Done' ? 'is-done' : ''}" data-id="${task.id}">${task.title}</a>
            
                <div class="task__buttons">
                    <a class="task__btn-edit" href="#/task/${task.id}/edit" title="Edit"></a> 
                    <button class="task__btn-remove" title="Delete"></button>   
                </div> 
                
                <div class="description">Description: ${task.description}</div>                           
            </div>
        `;
    }

    clearFormAddTask(addTaskTitle, addTaskDescription, addTaskBtn) {
        addTaskTitle.value = '';
        addTaskDescription.value = '';
        addTaskBtn.disabled = true;
        this.setBtnVisibility(buttonClear, true);
    }

    clearTasks() {
        if (confirm('Delete all tasks? Are you sure?')) {
            Tasks.setTasksToLS([]);
            document.getElementsByClassName('tasks__list')[0].innerHTML = '';
            this.tasks = [];
            this.countNumberTasks();
            this.setBtnVisibility(buttonClear, true);
        }
    }

    countNumberTasks() {
        let numberTasks = document.getElementsByClassName('task').length,
            doneAmount = document.getElementsByClassName('is-done').length,
            toBeForm = (doneAmount === 1) ? 'is' : 'are',
            taskWordForm = (doneAmount === 1) ? 'task' : 'tasks';

        document.getElementsByClassName('count-tasks')[0].innerHTML = !numberTasks ?
            'There are no tasks.' :
            `There ${toBeForm} <span class="tasks__counter-done"> ${doneAmount} </span> ${taskWordForm} of <span class="tasks__counter-total">${numberTasks} </span> ${toBeForm} done`;
    }

    setTaskIsDone(taskContainer) {
        this.task = this.tasks.find(task => task.id === taskContainer.dataset.id);
        this.tasks = this.tasks.filter(task => task.id !== taskContainer.dataset.id);
        this.task.status = this.task.status === 'Done' ? this.task.status = 'In Progress' : this.task.status = 'Done';
        this.tasks.push(this.task);
        this.tasks = Tasks.sortByStatus(this.tasks);
        Tasks.setTasksToLS(this.tasks);

        let taskList = document.querySelector('.tasks__list'),
            tasks = document.querySelectorAll('.task');

        tasks.forEach(task => task.remove());
        const newTasks = this.tasks.map(task => this.getTaskHTML(task)).join('\n ');
        taskList.insertAdjacentHTML('beforeend', newTasks);

        this.countNumberTasks();
    }


    removeTask(taskContainer) {
        if (confirm('Are you sure?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskContainer.dataset.id);
            Tasks.setTasksToLS(this.tasks);

            taskContainer.remove();
            this.countNumberTasks();
        }
        if (!this.tasks.length) {
            this.setBtnVisibility(buttonClear, true);
        }
    }

    setBtnVisibility(btn, flag) {
        btn.disabled = flag;
    }

}

export default AddAndList;
