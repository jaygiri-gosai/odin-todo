import UI from "./ui.js";
import { addProject } from "./projects.js";
import { addToDo } from "./todos.js";
import { load, save } from "./localStorage.js";
let projects = {},
  todos = {};
function init() {
  projects = load("projects");
  todos = load("todos");

  UI.renderHeader();
  UI.renderProjectsSidebar(projects, loadProject);
  UI.renderAddProjectButton(loadProjectModal);
  UI.renderMainContent();
  if (Object.keys(projects).length) loadProject(projects[0].id);
  UI.renderFooter();
}

function loadProject(projectID) {
  projects = load("projects");
  todos = load("todos");
  if (projectID) {
    let project = projects.find((project) => project.id === projectID);
    let projectToDos = [];
    if (project) {
      let todoIDs = project.todos;
      if (todoIDs.length > 0) {
        todoIDs.forEach((element) => {
          const found = todos.find((todo) => todo.id === element);
          if (found) {
            projectToDos.push(found);
          }
        });
      }
    }
    UI.renderProjectContainer(
      project,
      projectToDos,
      loadToDoModal,
      deleteToDoItem
    );
  }
}

function addToDoProject(projectName) {
  let project = addProject(projectName);
  projects.push(project);
  save("projects", projects);
  projects = load("projects");
  UI.renderProjectsSidebar(projects, loadProject);
  loadProject(project.id);
}

function appendProject(projectID, todoObj) {
  let todo = addToDo(
    todoObj.title,
    todoObj.desc,
    todoObj.dueDate,
    todoObj.priority,
    todoObj.status
  );
  let stored = load("todos");
  if (Object.hasOwn(todoObj, "todoID")) {
    const todoIndex = stored.findIndex((todo) => todo.id === todoObj.todoID);
    if (todoIndex !== -1) {
      stored[todoIndex].title = todoObj.title;
      stored[todoIndex].desc = todoObj.desc;
      stored[todoIndex].dueDate = todoObj.dueDate;
      stored[todoIndex].priority = todoObj.priority;
      stored[todoIndex].status = todoObj.status;
      save("todos", stored);
      loadProject(projectID);
    }
  } else {
    stored.push(todo);
    save("todos", stored);
    const project = projects.find((project) => project.id === projectID);
    if (project) {
      project.todos.push(todo.id);
      save("projects", projects);
      loadProject(projectID);
    }
  }
}

function loadProjectModal() {
  UI.renderProjectModal(addToDoProject);
}

function loadToDoModal(projectID, todoID = "") {
  UI.renderToDoModal(projectID, appendProject, todoID);
}

function deleteToDoItem(todoObj, projectID) {
  let permit = UI.renderConfirmation();
  if (permit) {
    const todoIndex = todos.findIndex((todo) => todo.id === todoObj.id);
    if (todoIndex !== -1) {
      const project = projects.find((project) => project.id === projectID);
      if (project) {
        const projectToDoIndex = project.todos.findIndex(
          (element) => element === todoObj.id
        );
        if (projectToDoIndex !== -1) project.todos.splice(projectToDoIndex, 1);
      }
      todos.splice(todoIndex, 1);
      save("projects", projects);
      save("todos", todos);
      loadProject(projectID);
    }
  }
}

init();
