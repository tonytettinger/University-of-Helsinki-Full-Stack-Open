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
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  PhonebookEntry.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
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

  phoneBookEntry
    .save()
    .then(savedEntry => savedEntry.toJSON)
    .then(savedFormattedEntry => res.json(savedFormattedEntry))
    .catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };

  PhonebookEntry.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if ((error.name = "ValidationError")) {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT);
console.log("server is running on port ", PORT);
