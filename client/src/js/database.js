import { openDB } from "idb";

const initdb = async () =>
  openDB("jatedb", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jatedb")) {
        return;
      }
      db.createObjectStore("jatedb", { keyPath: "id", autoIncrement: true });
    },
  });

export const putDb = async (content) => {
  if (content) {
    const jateDB = await openDB("jatedb", 1);
    const tx = jateDB.transaction("jatedb", "readwrite");
    const store = tx.objectStore("jatedb");
    const result = await store.put({ id: 1, content : content});
  }
  
};

export const getDb = async () => {
  const jateDB = await openDB("jatedb", 1);
  const tx = jateDB.transaction("jatedb", "readonly");
  const store = tx.objectStore("jatedb");
  const result = await store.getAll();
  if (result.length > 0) {
    return result;
  } else {
    return "nothing";
  }
};

initdb();
