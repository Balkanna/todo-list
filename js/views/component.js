import Utils from '../helpers/utils.js';

import Tasks from '../models/tasks.js';

class Component {
    constructor() {
        this.request = Utils.parseRequestURL();
        this.tasks = new Tasks().getTasksFromLS();
    }

    afterRender() {}
}

export default Component;
