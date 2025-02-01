// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var request = indexedDB.open("testdb");

// Create the schema
request.onupgradeneeded = function (event) {
    var db = event.target.result;
    console.log("Object Store creation");
    var objectstore = db.createObjectStore("client", { autoIncrement: true,});
    objectstore.createIndex("name", "name", { unique: false });
    objectstore.createIndex("lastName", "lastName", { unique: false });
    objectstore.createIndex("email", "email", { unique: true});
    objectstore.createIndex("ID", "ID", { unique: true }); //HERE WAS THE PROBLEM
    objectstore.createIndex("postal", "postal", { unique: false });
    objectstore.createIndex("phoneNumber", "phoneNumber", { unique: true});
}

request.onerror = function() {    
    console.error("Error opening db");
}

request.onsuccess = function() {
    var db = request.result;
    
    console.log("Connected!");
}

function addNew(){ 
    var newrequest = indexedDB.open("testdb"); 
    
    newrequest.onsuccess = function (event) {
        var db = event.target.result; 
        var objectstore = db.transaction(["client"], 'readwrite').objectStore("client");
        for (var i in clientData) {
            objectstore.add(clientData[i]); // Here was the error thrown
        }
        db.close();
        console.log("finished!");
    }   
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