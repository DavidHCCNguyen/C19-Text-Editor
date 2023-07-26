// import { text } from 'express';
import { openDB } from 'idb';

const initdb = async () =>
  openDB('text', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('text database already exists');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('text database created');
    },
  });

export const putDb = async (content) => { 
  console.log('PUT to the database');
  //connect to DB and version we want to use
  const textDb = await openDB('text',1);
  //make new transaction , specify the db we posting to and the data privilege of "readwrite"
  const tx = textDb.transaction('text','readwrite');
  //open object store
  const store = tx.objectStore('text');
  //use .put() method to pass in content
  const request = store.put({ text: content });
  //confirm teh data was added
  const result = await request; console.log('🚀 - data saved to the database', result)
};
export const getDb = async () => {
  console.log('GET all from the database');
  //connect to DB and version we want to use
  const todosDb = await openDB('text', 1);
  // make new transaction , specify the db we posting to and the data privilege of "readonly"
  const tx = todosDb.transaction('text', 'readonly');
  //open the object store
  const store = tx.objectStore('text');
  //use .getAll() method to grab all the content in the DB
  const request = store.getAll();
  //confirm the data was fetched
  const result = await request;
  console.log('result.value', result);
  // return result.value;
}
initdb();
