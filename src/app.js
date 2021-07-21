var API = /** @class */ (function () {
    function API() {
        this.allTodos = JSON.parse(window.localStorage.todos) || [];
    }
    API.prototype.addTask = function (task) {
        if (task === undefined || task === "") {
            alert('Вы ничего не добавили!');
        }
        var todo = {
            task: task,
            complete: false
        };
        this.allTodos.push(todo);
        this.saveTasks(this.allTodos);
    };
    API.prototype.deleteTask = function (taskID) {
        this.allTodos.splice(taskID, 1);
        this.saveTasks(this.allTodos);
    };
    Object.defineProperty(API.prototype, "getTasks", {
        get: function () {
            return this.allTodos;
        },
        enumerable: false,
        configurable: true
    });
    API.prototype.saveTasks = function (allTodos) {
        window.localStorage.todos = JSON.stringify(allTodos);
    };
    return API;
}());
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.API = new API();
        this.appNewTaskInput = document.querySelector('#addTaskText');
        this.appNewTaskAdd = document.querySelector('#addTaskButton');
        this.appTaskList = document.querySelector('.todoApp__list');
        this.appNewTaskAdd.addEventListener('click', function (e) {
            _this.addTask(_this.appNewTaskInput.value);
        });
        this.appNewTaskInput.addEventListener('keypress', function (e) {
            if (e.key.toLowerCase() !== "enter")
                return;
            _this.addTask(_this.appNewTaskInput.value);
        });
        this.renderTasks();
    }
    App.prototype.addTask = function (task) {
        if (task === undefined || task === "")
            return;
        this.API.addTask(task);
        this.appNewTaskInput.value = "";
        this.renderTasks();
    };
    App.prototype.renderTasks = function () {
        var _this = this;
        this.appTaskList.innerHTML = "";
        var allTasks = this.API.getTasks;
        allTasks.forEach(function (task, index) {
            var template = "<div class=\"todoApp__todo " + (task.complete ? 'todoApp__todo--complete' : '') + "\" data-task-id=\"" + index + "\">\n        <label class=\"todo__label\"><input type=\"checkbox\" " + (task.complete ? 'checked' : '') + "> " + task.task + " </label>\n        <div class=\"todo__actions\"><button class=\"todo__action-delete\">Delete</button></div>\n        </div>";
            _this.appTaskList.innerHTML += template;
        });
        this.bindEventListeners();
    };
    App.prototype.bindEventListeners = function () {
        var _this = this;
        var appTaskCheckboxes = document.querySelectorAll('.todoApp__todo input[type="checkbox"]');
        var appTaskDeleteButtons = document.querySelectorAll('.todoApp__todo .todo__action-delete');
        var removeTaskButton = document.querySelector('.removeTaskButton');
        appTaskCheckboxes.forEach(function (checkBox) {
            checkBox.addEventListener('change', function (e) {
                var event = e.target;
                var todoID = parseInt(event.parentElement.parentElement.dataset.taskId);
                var allTasks = _this.API.getTasks;
                allTasks[todoID].complete = event.checked;
                event.parentElement.classList.toggle('todoApp__todo--complete');
                _this.API.saveTasks(allTasks);
                _this.renderTasks();
            });
        });
        appTaskDeleteButtons.forEach(function (deleteltBtn) {
            deleteltBtn.addEventListener('click', function (e) {
                var event = e.target;
                var todoID = parseInt(event.parentElement.dataset.taskId);
                var allTasks = _this.API.getTasks;
                allTasks.splice(todoID, 1);
                _this.API.saveTasks(allTasks);
                _this.renderTasks();
            });
        });
        removeTaskButton.addEventListener('click', function (e) {
            var event = e.target;
            var todoID = parseInt(event.dataset.taskId);
            var allTasks = _this.API.getTasks;
            allTasks.splice(todoID);
            _this.API.saveTasks(allTasks);
            _this.renderTasks();
        });
    };
    return App;
}());
var app = new App();
