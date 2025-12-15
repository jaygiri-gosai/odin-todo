import logger from "./logger.js";

// Functions to interact with localStorage
const save = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    logger.error("Error saving to localStorage", error);
  }
};

// Function to load data from localStorage
const load = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : [];
  } catch (error) {
    logger.error("Error loading from localStorage", error);
    return [];
  }
};

// Function to clear data from localStorage
const clear = (key) => {
  try {
    if (localStorage.getItem(key) === null) {
      logger.warning(`No item found in localStorage for key: ${key}`);
      return;
    } else {
      localStorage.removeItem(key);
      logger.info(`Item with key: ${key} removed from localStorage`);
    }
  } catch (error) {
    logger.error("Error clearing localStorage", error);
  }
};

// Export the functions
export { save, load, clear };
