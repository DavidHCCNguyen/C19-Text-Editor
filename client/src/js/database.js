// Import the openDB function from the idb library
import { openDB } from "idb";

// Define the name of the database, its version, and the object store name
const dbName = "text";
const dbVersion = 1;
const objectStoreName = "text";

// Function to initialize the database and create the object store
const initdb = async () => {
  try {
    // Use the openDB function to create or open the database
    const db = await openDB(dbName, dbVersion, {
      // The upgrade function is called when the database is created or its version is upgraded
      upgrade(db) {
        // Check if the object store with the specified name exists
        if (!db.objectStoreNames.contains(objectStoreName)) {
          // If not, create a new object store with a keyPath and autoIncrement options
          db.createObjectStore(objectStoreName, {
            keyPath: "id",
            autoIncrement: true,
          });
          console.log("Database created");
        }
      },
    });
    console.log("Database already exists");
    // Return the reference to the opened database
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Function to store data into the database
const putDb = async (content) => {
  console.log("PUT to the database");
  try {
    // Initialize the database
    const textDb = await initdb();
    // Start a new transaction with readwrite access to the object store
    const tx = textDb.transaction(objectStoreName, "readwrite");
    // Get a reference to the object store
    const store = tx.objectStore(objectStoreName);
    // Use the put method to store the content in the object store
    await store.put({ text: content });
    // Wait for the transaction to complete
    await tx.done;
    console.log("🚀 - Data saved to the database");
  } catch (error) {
    console.error("Error saving data to the database:", error);
  }
};

// Function to retrieve all data from the database
const getDb = async () => {
  console.log("GET all from the database");
  try {
    // Initialize the database
    const textDb = await initdb();
    // Start a new transaction with readonly access to the object store
    const tx = textDb.transaction(objectStoreName, "readonly");
    // Get a reference to the object store
    const store = tx.objectStore(objectStoreName);
    // Use the getAll method to retrieve all data from the object store
    const result = await store.getAll();
    console.log("Result:", result);
    // Return the retrieved data
    return result;
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    // If there is an error, return an empty array
    return [];
  }
};

// Export the putDb and getDb functions to be used in other modules
export { putDb, getDb };
