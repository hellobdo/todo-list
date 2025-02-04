let projects = [];
let priority = ['high', 'medium', 'low'];
let tasks = [];

// Factory function to create tasks
function createTask(title, description, dueDate, notes, priority, checklistDescription, project) {
    tasks.push(
        {
        id: generateID(),
        title: title,
        description: description,
        dueDate: dueDate,
        notes: notes,
        priority: priority,
        checklist: {
            description: checklistDescription,
            check: false,
        },
        project: project,
        status: 'notDone',
        }
    )
}

// Factory function to create projects
function createProject(title, description) {
    if(projects.length != 0) {
        for (i = 0; i < projects.length; i++) {
            if(projects[i].title === title) {
                newTitle = prompt("please provide another title, that title is already in use");
                createProject(newTitle, description);
            } 
        }
    }
    const newProject = {
        id: generateID(),
        title: title,
        description: description
    }
    projects.push(newProject);
    return newProject;
}

function setTaskComplete (task) {
    task.status = 'done';
}

function generateID () {
    const now = new Date();
    // Get the individual components (year, month, day, hour, minute, second)
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    // Combine them into the Zettelkasten ID format
    const id = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return id;
}

function deleteProject(title) {
    const index = projects.findIndex(item => item.title === title);
    projects.splice(index, 1);
}

function setPriority (task, index) {
    task.priority = priority[index];
}

// DOM generation

const projectTemplate = document.getElementById('project-template');

function renderProjects() {
    projects.forEach(project => {
        const projectClone = document.importNode(projectTemaplate.content, true);
        const projectTitle = projectClone.querySelector('.project-title');
        projectTitle.textContent = project.title;

        const todoList = projectClone.querySelector('.todo-list');

        project.todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            todoItem.textContent = `${todo.title} (Due: ${todo.dueDate})`;

            todoItem.classList.add(getPriorityClass(todo.priority));
            todoList.appendChild(todoItem);
        });
    projectsList.appendChild(projectClone);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();

    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addChecklistItem();
    });
});

function addChecklistItem() {
    const checklistDescriptionInput = document.getElementById('task-checklistDescription');
    const checklistContainer = document.querySelector('.checklist-section');

    const checklistItem = document.createElement('div');
    checklistItem.classList.add('checklist-input-container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'task-checklist';
    checkbox.id = `task-checklist-${Date.now()}`;

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.name = 'task-checklistDescription';
    textInput.value = checklistDescriptionInput.value;
    textInput.placeholder = 'Enter task description';
    textInput.classList.add('checklist-description');

    checklistItem.appendChild(checkbox);
    checklistItem.appendChild(textInput);

    checklistContainer.appendChild(checklistItem);

    // Clear the input field
    checklistDescriptionInput.value = '';
}