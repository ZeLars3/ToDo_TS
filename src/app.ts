interface Task {
    task: string,
    complete: boolean
}

class API {
    allTodos: Task[] = JSON.parse(window.localStorage.getItem('todos')) || [];

    addTask(task: string): void {
        if (task === undefined || task === "") return;
        const todo: Task = {
            task: task,
            complete: false
        };

        this.allTodos.push(todo);
        this.saveTasks(this.allTodos);
    }

    deleteTask(taskID: number): void {
        this.allTodos.splice(taskID, 1);
        this.saveTasks(this.allTodos);
    }

    get getTasks(): Task[] {
        return this.allTodos;
    }

    saveTasks(allTodos: Task[]): void {
        window.localStorage.todos = JSON.stringify(allTodos);
    }
}

class App {
    API: API = new API();
    appNewTaskInput: HTMLInputElement = document.querySelector('#addTaskText');
    appNewTaskAdd = document.querySelector('#addTaskButton');
    appTaskList = document.querySelector('.todoApp__list');

    constructor() {

        this.appNewTaskAdd.addEventListener('click', e => {
            this.addTask(this.appNewTaskInput.value);
        });

        this.appNewTaskInput.addEventListener('keypress', e => {
            if (e.key.toLowerCase() !== "enter")
                return;
            this.addTask(this.appNewTaskInput.value);
        });

        this.renderTasks();
    }

    addTask(task: string): void {
        if (task === undefined || task === "")
            return;

        this.API.addTask(task);
        this.appNewTaskInput.value = "";
        this.renderTasks();
    }

    renderTasks(): void {
        this.appTaskList.innerHTML = "";

        const allTasks = this.API.getTasks;
        allTasks.forEach((task, index) => {
            let template = `<div class="todoApp__todo ${task.complete ? 'todoApp__todo--complete' : ''}" data-task-id="${index}">
        <label class="todo__label"><input type="checkbox" ${task.complete ? 'checked' : ''}> ${task.task} </label>
        <div class="todo__actions"><button class="todo__action-delete">Delete</button></div>
        </div>`;

            this.appTaskList.innerHTML += template;
        });
        this.bindEventListeners();
    }

    bindEventListeners(): void {
        const appTaskCheckboxes = document.querySelectorAll('.todoApp__todo input[type="checkbox"]');
        const appTaskDeleteButtons = document.querySelectorAll('.todoApp__todo .todo__action-delete');
        const _that = this;

        appTaskCheckboxes.forEach((checkkBox: Element) => {
            checkkBox.addEventListener('change', e => {
                const _this = e.target;
                const todoID = parseInt(_this.parentElement.parentElement.dataset.taskId);
                const allTasks = _that.API.getTasks;

                allTasks[todoID].complete = _this.checked;
                _this.parentElement.parentElement.classList.toggle('todoApp__todo--complete');

                _that.API.saveTasks(allTasks);
                _that.renderTasks();

            });
        });

        appTaskDeleteButtons.forEach(deleteltBtn => {
            deleteltBtn.addEventListener('click', e => {
                const _this = e.target;
                const todoID = parseInt(_this.parentElement.parentElement.dataset.taskId);
                const allTasks = _that.API.getTasks;

                allTasks.splice(todoID, 1);
                _that.API.saveTasks(allTasks);
                _that.renderTasks();
            })
        });
    }
}

const app = new App();