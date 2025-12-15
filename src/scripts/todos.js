import logger from "./logger";

// Factory function to create a new todo
const createTodo = (title, desc, dueDate, priority, status) => {
  const id = crypto.randomUUID();
  const newtodo = { id, title, desc, dueDate, priority, status };
  return newtodo;
};

// Function to add a new todo
const addToDo = (title, desc, dueDate, priority, status) => {
  const todo = createTodo(title, desc, dueDate, priority, status);
  logger.info(`Todo with ID "${todo.id}" added.`);
  return todo;
};

export { addToDo };
