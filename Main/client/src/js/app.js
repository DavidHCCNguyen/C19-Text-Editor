// Get a reference to the editor textarea element
const editor = document.getElementById("editor");

// Import the putDb and getDb functions from your IndexedDB module
import { putDb, getDb } from "./indexeddb"; // Adjust the import path according to your file structure

// Function to set the content of the editor from IndexedDB
const setEditorContent = async () => {
  console.log("GET from IndexedDB and set editor content");
  try {
    // Retrieve data from IndexedDB
    const data = await getDb();
    if (data.length > 0) {
      const content = data[data.length - 1].text; // Get the latest content from IndexedDB
      editor.value = content;
      console.log("Editor content set from IndexedDB");
    } else {
      console.log("No data found in IndexedDB");
    }
  } catch (error) {
    console.error("Error loading data from IndexedDB:", error);
  }
};

// Function to update the editor content and save it to IndexedDB
const updateEditorContent = () => {
  const content = editor.value;
  putDb(content) // Save the content to IndexedDB
    .then(() => console.log("Editor content saved to IndexedDB"))
    .catch((error) => console.error("Error saving data to IndexedDB:", error));
};

// Event listener to update the content whenever a user types in the editor
editor.addEventListener("input", updateEditorContent);

// Call the setEditorContent function to load the saved content when the page loads
setEditorContent();
