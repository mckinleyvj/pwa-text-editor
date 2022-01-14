import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Posting into the database');

  const jateDB = await openDB('jatedb', 1);
  const tx = jateDB.transaction('jatedb', 'readwrite');
  const store = tx.objectStore('jatedb');
  const objects = await store.getAll();
  const contenttoWrite = objects.length > 0 ? { content: content, id: objects[0].id } : { content: content };
  const request = await store.put(contenttoWrite);

  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET from the database');

  const jateDB = await openDB('jatedb', 1);
  const tx = jateDB.transaction('jatedb', 'readonly');
  const store = tx.objectStore('jatedb');
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;

};

initdb();
