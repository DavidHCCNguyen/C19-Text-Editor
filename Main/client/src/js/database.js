import { openDB } from "idb";

const dbName = "text";
const dbVersion = 1;
const objectStoreName = "text";

const initdb = async () => {
  try {
    const db = await openDB(dbName, dbVersion, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(objectStoreName)) {
          db.createObjectStore(objectStoreName, {
            keyPath: "id",
            autoIncrement: true,
          });
          console.log("text database created");
        }
      },
    });
    console.log("text database already exists");
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

const putDb = async (content) => {
  console.log("PUT to the database");
  try {
    const textDb = await initdb();
    const tx = textDb.transaction(objectStoreName, "readwrite");
    const store = tx.objectStore(objectStoreName);
    await store.put({ text: content });
    await tx.done;
    console.log("🚀 - data saved to the database");
  } catch (error) {
    console.error("Error saving data to the database:", error);
  }
};

const getDb = async () => {
  console.log("GET all from the database");
  try {
    const textDb = await initdb();
    const tx = textDb.transaction(objectStoreName, "readonly");
    const store = tx.objectStore(objectStoreName);
    const result = await store.getAll();
    console.log("result:", result);
    return result;
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return [];
  }
};

export { putDb, getDb };
