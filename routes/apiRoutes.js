let db = require("../db/db.json");
let path = require("path");
const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, notesData) => {
      if (err) throw err;
      res.json(JSON.parse(notesData));
    });
  });
  app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let notesData = JSON.parse(data);
      notesData.push(req.body);
      console.log(req.body);
      for (let i = 0; i < notesData.length; i++) {
        notesData[i].id = i + 1;
      }
      fs.writeFile("./db/db.json", JSON.stringify(notesData), (err) => {
        if (err) throw err;
        res.send(db);
      });
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let newNote = JSON.parse(data);
      for (let i = 0; i < newNote.length; i++) {
        if (newNote[i].id == req.params.id) {
          newNote.splice(i, 1);
        }
      }

      fs.writeFile("./db/db.json", JSON.stringify(newNote), (err) => {
        if (err) throw err;
        res.send(newNote);
      });
    });
  });
};