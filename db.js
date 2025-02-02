// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var request = indexedDB.open("test1");

// Create the schema
request.onupgradeneeded = function (event) {
    var db = request.result;
    console.log("Object Store creation");
    var objectstore = db.createObjectStore("client", { autoIncrement: true,});
    objectstore.createIndex("name", "name", { unique: false });    
}

request.onerror = function() {    
    console.error("Error opening db");
}

request.onsuccess = function() {
    var db = request.result;
    
    console.log("Connected!");
}

function addNew(){ 
    console.log("Adding");
    var db = request.result;
    
    var tx = db.transaction("client", "readwrite");
    var store = tx.objectStore("client");
    var index = store.index("name");
    
    store.put({ name: document.getElementById("newusername").value, age: 42});   
};
        
    


const clientData = [
    {
      name: "Piotr",
      lastName: "Wesoly",
      email: "PiotrWesoly@gmail.com",
      ID: 'CCU238293', //The same ID as in the other client
      postal: "90-234",
      phoneNumber: "500500200"
    },
    {
      name: "Pawel",
      lastName: "Rosiak",
      email: "pawelRosiak@gmail.com",
      ID: 'CCU238293', //The same ID as in the other client
      postal: "93-234",
      phoneNumber: "500400200"
    },
  ];