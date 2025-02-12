let projects = [];
let priority = ['high', 'medium', 'low'];
let tasks = [];

// DOM variables

const projectTitle = document.getElementById("project-title");
const createProjectBtn = document.getElementById("createProjectBtn");
const projectDescription = document.getElementById("project-description");
const projectsContainer = document.getElementById("projects-container");
const listOfProjects = document.getElementById("list-of-projects");
const warningProject = document.getElementById("warning-project");
const projectsHeader = document.getElementById("projects-header");


// backend functions
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

function checkProjectTitle () {
    return projectTitle.value !== "" ? true : (warningProject.textContent = "please add a title to insert a project", false);
}


// Function to handle Enter key press only in the title input field
function handleEnterKey(event) {
    if (event.key === "Enter" && event.target.id === "project-title") {
        if( checkProjectTitle() ) handleCreateProject();
    }
}

function handleCreateProject() {
    createProject(projectTitle.value, projectDescription.value);
    projectTitle.value = "";
    projectDescription.value = "";
    handleProjectsDisplay();
}

function handleClick() {
    if(checkProjectTitle()) handleCreateProject();
}

// Attach event listeners


// .addEventListener("click", handleCreateProject);
createProjectBtn.addEventListener("click", handleClick);
projectTitle.addEventListener("keypress", handleEnterKey);
projectDescription.addEventListener("keypress", handleEnterKey);

function handleProjectsDisplay() {
    while (listOfProjects.firstChild) {
        listOfProjects.removeChild(listOfProjects.firstChild);
    }
    projectsHeader.textContent = "List of Projects";
    if (projects.length > 0) {
        for (i = 0; i < projects.length; i++) {
            let newDiv = document.createElement("div");
            newDiv.textContent = projects[i].title;
            listOfProjects.appendChild(newDiv);
        }
    }
}