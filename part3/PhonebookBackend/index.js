require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const PhonebookEntry = require("./models/phonebookentry");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
  PhonebookEntry.find({})
    .then(entries => {
      res.json(entries);
    })
    .catch(error => console.log(error) && res.status(404).end());
});

app.get("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  console.log("id param", id);

  PhonebookEntry.findById(req.params.id)
    .then(entry => {
      res.json(entry);
    })
    .catch(error => res.status(404).end());
});

app.delete("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  persons = persons.filter(person => person.id != id);
  response.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body);
  const name = body.name;
  const number = body.number;

  console.log("body", body);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content is missing"
    });
  }

  const phoneBookEntry = new PhonebookEntry({
    name,
    number
  });

  let person;
  phoneBookEntry.save().then(savedEntry => {
    console.log("SAVED", savedEntry);
    person = {
      name: savedEntry.name,
      number: savedEntry.number
    };

    res.json(person);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001;

app.listen(PORT);
console.log("server is running on port ", PORT);
