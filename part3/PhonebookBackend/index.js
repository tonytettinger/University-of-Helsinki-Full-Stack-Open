const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

generateId = () => {
  let length = persons.length;
  return length ? Math.max(...persons.map(person => person.id)) + 1 : 0;
};

checkIfPersonExist = name => {
  return persons.filter(person => person.name == name).length;
};

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const numberOfPeople = persons.length;
  const date = new Date();
  const info = `Phonebook has info for ${numberOfPeople} people
  ${date}`;
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(info);
});

app.get("/api/persons/:id", (req, res) => {
  let id = Number(req.params.id);
  console.log("id param", id);
  person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
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

  if (checkIfPersonExist(name)) {
    return res.status(409).json({
      error: "person already exist in database (name must be unique)"
    });
  }

  const person = {
    id: generateId(),
    name,
    number
  };

  persons = persons.concat(person);

  res.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const PORT = 3001;

app.listen(PORT);
console.log("server is running on port ", PORT);
