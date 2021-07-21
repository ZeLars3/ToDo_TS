interface Task {
    task: string,
    complete: boolean
}

class API {
    allTodos: Task[] = JSON.parse(window.localStorage.todos) || [];

    addTask(task: string): void {
        if (task === undefined || task === "") {
            alert('Вы ничего не добавили!');
        }

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
    appNewTaskInput: HTMLInputElement | null | any = document.querySelector('#addTaskText');
    appNewTaskAdd: HTMLInputElement | null | any = document.querySelector('#addTaskButton');
    appTaskList: Element | null | any= document.querySelector('.todoApp__list');

    constructor() {

        this.appNewTaskAdd.addEventListener('click', (e: Element) => {
            this.addTask(this.appNewTaskInput.value);
        });

        this.appNewTaskInput.addEventListener('keypress', (e: Element) => {
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
        const removeTaskButton: Element | null | any = document.querySelector('.removeTaskButton');

        appTaskCheckboxes.forEach((checkBox: Element) => {
            checkBox.addEventListener('change', e => {
                const event: Event | any = e.target;
                const todoID = parseInt(event.parentElement.parentElement.dataset.taskId);
                const allTasks = this.API.getTasks;

                allTasks[todoID].complete = event.checked;
                event.parentElement.classList.toggle('todoApp__todo--complete');

                this.API.saveTasks(allTasks);
                this.renderTasks();

            });
        });

        appTaskDeleteButtons.forEach(deleteltBtn => {
            deleteltBtn.addEventListener('click', e => {
                const event: Event | any = e.target;
                const todoID = parseInt(event.parentElement.dataset.taskId);
                const allTasks = this.API.getTasks;

                allTasks.splice(todoID, 1);
                this.API.saveTasks(allTasks);
                this.renderTasks();
            })
        });

        removeTaskButton.addEventListener('click', e => {
            const event: Event | any = e.target;
            const todoID = parseInt(event.dataset.taskId);
            const allTasks = this.API.getTasks;

            allTasks.splice(todoID, 1);
            this.API.saveTasks(allTasks);
            this.renderTasks();
        })
    }
}

const app = new App();
