import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

class Edit extends Component {
    constructor() {
        super();

        this.task = this.tasks.find(task => task.id === this.request.id);
    }

    render() {
        return new Promise(resolve => {
            let html;

            if (this.task) {
                const {title, description} = this.task;

                html = `
                            
                    <h1 class="page-title">You can change the task:</h1>
                    
                    <div class="task-edit">
                        <p>
                            <b>Task Title:</b>
                            <input class="task-edit__title" type="text" value="${ title }">
                        </p>
                        
                        <p>
                            <b>Task Description:</b>
                            <input class="task-edit__description" type="text" value="${ description }">
                        </p>
                        
                        <div class="task-edit__buttons">
                            <button class="task-edit__btn-save button">Save Task</button>
                            <a class="task-edit__btn-back button" href="#/tasks"/>Back to List</a>
                        </div>
                    </div>
                `;
            } else {
              html = new Error404().render();
            }

            resolve(html);
        });
    }

    afterRender() {
        this.task && this.setActions();
    }

    setActions() {
        const editTaskTitle = document.getElementsByClassName('task-edit__title')[0],
            saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0],
            editDescription = document.getElementsByClassName('task-edit__description')[0];

        editTaskTitle.addEventListener('keyup', () => saveTaskBtn.disabled = !editTaskTitle.value.trim());
        saveTaskBtn.addEventListener('click', () => this.editTask(editTaskTitle, editDescription));
    }

    editTask(editTaskTitle, editDescription) {
        this.task.title = editTaskTitle.value.trim();
        this.task.description = editDescription.value.trim();
        Tasks.setTasksToLS(this.tasks);

    }

}

export default Edit;
