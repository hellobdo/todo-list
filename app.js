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
    const newProject = {
        id: generateID(),
        title: title,
        description: description
    }
    projects.push(newProject);
    console.log(newProject);
    console.log(projects);
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
// Function to handle Enter key press only in the title input field
function handleEnterKey(event) {
    if (event.key === "Enter" && event.target.id === "project-title" || event.target.id === "project-description") {
        handleCreateProject();
    }
}

function handleCreateProject() {
    createProject(projectTitle, projectDescription);
    projectTitle.value = "";
    projectDescription.value = "";
}

// Attach event listeners
document.getElementById("createProjectBtn").addEventListener("click", handleCreateProject);
const projectTitle = document.getElementById("project-title");
const projectDescription = document.getElementById("project-description");
projectTitle.addEventListener("keypress", handleEnterKey);
projectDescription.addEventListener("keypress", handleEnterKey);