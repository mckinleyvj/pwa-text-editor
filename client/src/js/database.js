import { openDB } from "idb";

const initdb = async () =>
  openDB("jatedb", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jatedb")) {
        console.log("jatedb database already exists");
        return;
      }
      db.createObjectStore("jatedb", { keyPath: "id", autoIncrement: true });
      console.log("jatedb database created");
    },
  });

export const putDb = async (content) => {
  console.log("Posting into the database");
  if (content) {
    const jateDB = await openDB("jatedb", 1);
    const tx = jateDB.transaction("jatedb", "readwrite");
    const store = tx.objectStore("jatedb");
    const result = await store.put({ id: 1, content : content});
  
    console.log("🚀 - data saved to the database", result);
  }
  
};

export const getDb = async () => {
  console.log("GET from the database");

  const jateDB = await openDB("jatedb", 1);
  const tx = jateDB.transaction("jatedb", "readonly");
  const store = tx.objectStore("jatedb");
  const result = await store.getAll();
  if (result.length > 0) {
    console.log("🚀 all info from database", result);
    return result;
  } else {
    console.log("Nothing to load.");
  }
};

initdb();
