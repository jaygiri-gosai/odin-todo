# odin-todo

📝 My Todo List — A Modular JavaScript Todo Application

A fully functional Todo List application built as part of The Odin Project’s JavaScript curriculum.
This project focuses on clean architecture, modular code design, and separation of concerns using vanilla JavaScript.

The app allows users to:

Create and manage multiple projects

Add, edit, and delete todo items

Track todos by priority, status, and due date

Persist all data using localStorage

Interact with a responsive, dynamically rendered UI

This project demonstrates core concepts in front-end development such as DOM manipulation, event handling, modular architecture, and clean data flow.

🚀 Features
✔ Modular Structure

All logic is cleanly separated into modules:

todos.js — todo creation logic

projects.js — project creation logic

index.js — app controller and state handling

ui.js — rendering layer and DOM management

localStorage.js — persistence and data retrieval

✔ Create, Read, Update, Delete (CRUD)

Add new projects

Add todos inside a project

Edit existing todos

Delete todos and update the project list automatically

✔ Local Storage Persistence

All projects and todos are saved in browser storage so the data remains even after refreshing.

✔ Dynamic UI Rendering

All components (sidebar, modals, todo cards, etc.) are rendered dynamically using vanilla JavaScript.

✔ Date & Priority Support

Todos support:

Due dates (formatted using date-fns)

Priority levels (High, Medium, Low)

Status tracking (To Do, In Progress, Blocked, Done)

🛠️ Technologies Used

JavaScript ES6 Modules

HTML5 + CSS3

date-fns for date formatting

localStorage API for persistence

Webpack (if you’re bundling)

Vanilla DOM Manipulation
