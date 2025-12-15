import "../styles/style.css";
import { format } from "date-fns";
const UI = {
  // Function to create and render the header
  renderHeader() {
    const app = document.getElementById("app");
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "My Todo List";
    header.appendChild(title);
    app.appendChild(header);
    return header;
  },

  // Function to create and render projects sidebar on the left side
  renderProjectsSidebar(projects, handleProjectClick) {
    const app = document.getElementById("app");
    const sidebar = document.createElement("aside");
    const projectList = document.createElement("ul");
    if (Object.keys(projects).length > 0) {
      sidebar.style.display = "block";
      projects.forEach((project) => {
        const projectItem = document.createElement("li");
        const projectLink = document.createElement("a");
        projectLink.textContent = project.name;
        projectLink.href = "javascript:void(0)";
        projectLink.addEventListener("click", () =>
          handleProjectClick(project.id)
        );
        projectItem.appendChild(projectLink);
        projectList.appendChild(projectItem);
      });
      sidebar.appendChild(projectList);
    } else {
      sidebar.style.display = "none";
    }

    app.appendChild(sidebar);
    return sidebar;
  },

  // Function to create and render the add project button
  renderAddProjectButton(handleAddProject) {
    const app = document.getElementById("app");
    const button = document.createElement("button");
    button.textContent = "Add Project";
    button.addEventListener("click", handleAddProject);
    app.appendChild(button);
    return button;
  },

  // Function to create and render the main content area.
  renderMainContent() {
    const app = document.getElementById("app");
    const main = document.createElement("main");
    main.id = "mainContainer";
    main.innerHTML = "";

    const projectContainer = document.createElement("div");
    projectContainer.id = "projectContainer";
    projectContainer.style.display = "none";

    const projectHeader = document.createElement("div");
    projectHeader.id = "projectHeader";

    const projectTitle = document.createElement("h2");
    projectTitle.id = "project-title";
    projectHeader.appendChild(projectTitle);

    const addToDoLink = document.createElement("a");
    addToDoLink.id = "todo-tag";
    addToDoLink.textContent = "+ Add To Do";
    addToDoLink.href = "javascript:void(0);";
    projectHeader.appendChild(addToDoLink);
    projectContainer.appendChild(projectHeader);

    const todoContainer = document.createElement("div");
    todoContainer.id = "items-container";
    projectContainer.appendChild(todoContainer);
    main.appendChild(projectContainer);
    app.appendChild(main);
    return main;
  },

  renderProjectContainer(project, todos, handleAddTodo, handleDeleteToDo) {
    const app = document.getElementById("app");
    const main = document.getElementById("mainContainer");
    const projectContainer = document.getElementById("projectContainer");
    const projectTitle = document.getElementById("project-title");
    const itemContainer = document.getElementById("items-container");
    itemContainer.innerHTML = "";
    projectTitle.textContent = project.name;

    const addToDoLink = document.getElementById("todo-tag");

    // remove old handler if we stored it
    if (addToDoLink._todoHandler) {
      addToDoLink.removeEventListener("click", addToDoLink._todoHandler);
    }

    // create a new handler that captures this project's id
    const id = project.id;
    addToDoLink._todoHandler = function () {
      handleAddTodo(id);
    };
    addToDoLink.addEventListener("click", addToDoLink._todoHandler);

    projectContainer.style.display = "block";
    const todoList = document.createElement("ul");
    todoList.id = "item-list";

    if (todos.length > 0) {
      todoList.innerHTML = "";
      todos.forEach((todo) => {
        const todoItem = document.createElement("li");

        const iconContainer = document.createElement("div");
        iconContainer.className = "action-items";
        const icon = document.createElement("img");
        icon.src = "./assets/images/edit.png";
        icon.className = "editIcon";
        iconContainer.appendChild(icon);
        // todoItem.appendChild(iconContainer);
        // todoList.appendChild(todoItem);

        // remove old handler if we stored it
        if (icon._edittodoHandler) {
          icon.removeEventListener("click", icon._edittodoHandler);
        }

        // create a new handler that captures this project's id
        icon._edittodoHandler = function () {
          handleAddTodo(id, todo);
        };
        icon.addEventListener("click", icon._edittodoHandler);

        const deleteIcon = document.createElement("img");
        deleteIcon.src = "./assets/images/delete.png";
        deleteIcon.className = "deleteIcon";
        iconContainer.appendChild(deleteIcon);
        todoItem.appendChild(iconContainer);
        todoList.appendChild(todoItem);
        // remove old handler if we stored it
        if (deleteIcon._deletetodoHandler) {
          deleteIcon.removeEventListener(
            "click",
            deleteIcon._deletetodoHandler
          );
        }

        // create a new handler that captures this todo's id
        deleteIcon._deletetodoHandler = function () {
          handleDeleteToDo(todo, id);
        };
        deleteIcon.addEventListener("click", deleteIcon._deletetodoHandler);

        const titleContainer = document.createElement("div");
        titleContainer.className = "info";
        const titleP = document.createElement("p");
        titleP.className = "title";
        titleP.textContent = `${todo.title}`;
        titleContainer.appendChild(titleP);

        const descP = document.createElement("p");
        descP.className = "desc";
        descP.textContent = `${todo.desc}`;
        titleContainer.appendChild(descP);

        const dateP = document.createElement("p");
        dateP.textContent = `${format(todo.dueDate, "MM/dd/yyyy")}`;
        titleContainer.appendChild(dateP);

        const priorityP = document.createElement("p");
        let priorityText = "";
        console.log(typeof todo.priority);
        if (todo.priority === "1") {
          priorityText = "High";
        } else if (todo.priority === "2") {
          priorityText = "Medium";
        } else {
          priorityText = "Low";
        }

        priorityP.textContent = priorityText;
        titleContainer.appendChild(priorityP);

        const statusP = document.createElement("p");
        statusP.textContent = `${todo.status}`;

        titleContainer.appendChild(statusP);
        todoItem.appendChild(titleContainer);
      });
    } else {
      const todoItem = document.createElement("li");
      todoItem.textContent = `No To Do items found!`;
      todoList.appendChild(todoItem);
    }
    itemContainer.appendChild(todoList);
    main.appendChild(projectContainer);
    app.appendChild(main);
  },

  // Write a function to render a modal with a form to add a new project
  renderProjectModal(addProject) {
    const app = document.getElementById("app");
    const modalContainer = document.createElement("div");
    modalContainer.id = "myModal";
    modalContainer.className = "modal";
    modalContainer.style.display = "block";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const span = document.createElement("span");
    span.className = "close";
    span.textContent = `x`;
    span.onclick = function () {
      modalContainer.style.display = "none";
    };

    const form = document.createElement("form");
    form.method = "post";

    const nameContainer = document.createElement("div");
    const nameLabel = document.createElement("label");
    nameLabel.htmlFor = "name";
    nameLabel.textContent = "Project Name: ";

    const nameInput = document.createElement("input");
    nameInput.name = "name";
    nameInput.id = "name";
    nameInput.required = true;
    nameInput.autocomplete = "off";

    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);
    form.appendChild(nameContainer);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Project";
    submitButton.onclick = function (event) {
      const projectName = nameInput.value.trim();
      if (projectName) {
        event.preventDefault();
        addProject(projectName);
        modalContainer.style.display = "none";
      }
    };

    form.appendChild(submitButton);

    modalContent.appendChild(span);
    modalContent.appendChild(form);
    modalContainer.appendChild(modalContent);
    app.appendChild(modalContainer);
  },

  renderToDoModal(projectID, appendProject, todoObj = "") {
    const app = document.getElementById("app");
    const modalContainer = document.createElement("div");
    modalContainer.id = "myToDoModal";
    modalContainer.className = "modal";
    modalContainer.style.display = "block";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const span = document.createElement("span");
    span.className = "close";
    span.textContent = `x`;
    span.onclick = function () {
      modalContainer.style.display = "none";
    };

    const form = document.createElement("form");
    form.name = "todoform";
    form.method = "post";

    const nameContainer = document.createElement("div");
    const nameLabel = document.createElement("label");
    nameLabel.htmlFor = "title";
    nameLabel.textContent = "Title: ";

    const nameInput = document.createElement("input");
    nameInput.name = "title";
    nameInput.id = "title";
    nameInput.required = true;
    nameInput.value = todoObj ? todoObj.title : "";

    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);
    form.appendChild(nameContainer);

    const descContainer = document.createElement("div");
    const descLabel = document.createElement("label");
    descLabel.htmlFor = "desc";
    descLabel.textContent = "Description: ";

    const descInput = document.createElement("textarea");
    descInput.rows = 5;
    descInput.cols = 5;
    descInput.name = "desc";
    descInput.id = "desc";
    descInput.required = true;
    descInput.value = todoObj ? todoObj.desc : "";
    descContainer.appendChild(descLabel);
    descContainer.appendChild(descInput);
    form.appendChild(descContainer);

    const dateContainer = document.createElement("div");
    const dateLabel = document.createElement("label");
    dateLabel.htmlFor = "dueDate";
    dateLabel.textContent = "Due Date: ";

    const dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.name = "dueDate";
    dueDate.id = "dueDate";
    dueDate.required = true;
    dueDate.value = todoObj ? todoObj.dueDate : "";

    dateContainer.appendChild(dateLabel);
    dateContainer.appendChild(dueDate);
    form.appendChild(dateContainer);

    const priorityContainer = document.createElement("div");
    const priorityLabel = document.createElement("label");
    priorityLabel.htmlFor = "priority";
    priorityLabel.textContent = "Priority: ";

    const priority = document.createElement("select");
    priority.name = "priority";
    priority.id = "priority";
    priority.required = true;

    const optionsData = [
      { value: 2, text: "Medium" },
      { value: 1, text: "High" },
      { value: 3, text: "Low" },
    ];

    optionsData.forEach((optionInfo) => {
      const optionElement = document.createElement("option");
      optionElement.value = optionInfo.value;
      optionElement.textContent = optionInfo.text; // Use textContent for displaying text
      priority.appendChild(optionElement);
    });
    priority.value = todoObj ? todoObj.priority : "";
    priorityContainer.appendChild(priorityLabel);
    priorityContainer.appendChild(priority);
    form.appendChild(priorityContainer);

    const statusContainer = document.createElement("div");
    const statusLabel = document.createElement("label");
    statusLabel.htmlFor = "status";
    statusLabel.textContent = "Status: ";

    const status = document.createElement("select");
    status.name = "status";
    status.id = "status";
    status.required = true;

    const statusData = [
      { value: "To Do", text: "To Do" },
      { value: "In Progress", text: "In Progress" },
      { value: "Blocked", text: "Blocked" },
      { value: "Done", text: "Done" },
    ];

    statusData.forEach((optionInfo) => {
      const optionElement = document.createElement("option");
      optionElement.value = optionInfo.value;
      optionElement.textContent = optionInfo.text; // Use textContent for displaying text
      status.appendChild(optionElement);
    });
    status.value = todoObj ? todoObj.status : "";
    statusContainer.appendChild(statusLabel);
    statusContainer.appendChild(status);
    form.appendChild(statusContainer);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    if (todoObj) submitButton.textContent = "Update ToDo";
    else submitButton.textContent = "Add ToDo";
    submitButton.onclick = function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const titleVal = nameInput.value.trim();
      const descVal = descInput.value.trim();
      const dueDateVal = dueDate.value.trim();
      const priorityVal = priority.value;
      const statusVal = status.value;

      if (titleVal && dueDateVal) {
        let postObj = {
          title: titleVal,
          desc: descVal,
          dueDate: dueDateVal,
          priority: priorityVal,
          status: statusVal,
        };
        if (todoObj) {
          postObj.todoID = todoObj.id;
        }
        appendProject(projectID, postObj);
        modalContainer.style.display = "none";
      }
    };

    form.appendChild(submitButton);

    modalContent.appendChild(span);
    modalContent.appendChild(form);
    modalContainer.appendChild(modalContent);
    app.appendChild(modalContainer);
  },

  // Function to create and render the add todo button
  renderAddTodoButton(handleAddTodo) {
    const app = document.getElementById("app");
    const button = document.createElement("button");
    button.textContent = "Add Todo";
    button.addEventListener("click", handleAddTodo);
    app.appendChild(button);
    return button;
  },

  renderConfirmation() {
    return confirm("Are you sure you want to delete?");
  },

  // Function to create and render the footer
  renderFooter() {
    const app = document.getElementById("app");
    const footer = document.createElement("footer");
    const footerText = document.createElement("p");
    footerText.textContent = `© ${new Date().getFullYear()} My Todo App`;
    footer.appendChild(footerText);
    app.appendChild(footer);
    return footer;
  },

  // Function to clear the app content
  clearApp() {
    const app = document.getElementById("app");
    app.innerHTML = "";
  },
};

export default UI;
