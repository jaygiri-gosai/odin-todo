// Factory function to create a new project
const createProject = (name, todos = []) => {
  const id = crypto.randomUUID();
  const newProject = { id, name, todos: todos };
  return newProject;
};

// Function to add a new project
const addProject = (name, todos = []) => {
  const project = createProject(name, todos);
  return project;
};

export { addProject };
