const express = require("express");
const morgan = require("morgan");
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
const app = express();
app.use(morgan("tiny"));

const PORT = 3001;
const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};
app.use(express.json());

// app.use(requestLogger);

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.send(data);
});
const dateFormatter = () => {
  const date = new Date();
  const time = new Date(date);
  const dmy = time.toDateString();
  const timezone = time.toTimeString();
  const formattedDate = `<h1>${dmy}${timezone}</h1>`;
  return formattedDate;
};
app.get("/api/info", (req, res) => {
  const persons = data.length;
  console.log(persons);
  const date = dateFormatter();
  const htmlString = `<h1>Phonebook has info for ${persons} people</h1>
  <br/>
  ${date}`;
  res.send(htmlString);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    console.error(Error);
  }
});
const randId = () => Math.ceil(Math.random() * 1000);
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      error: "Content Missing",
    });
  }
  const person = {
    id: randId(),
    name: body.name,
    number: body.number,
  };
  if (data.find((name) => name.name === person.name)) {
    return res.status(400).json({
      error: "A person with that name already exists.",
    });
  }
  if (data.find((number) => number.number === person.number)) {
    return res.status(400).json({
      error: "Number already exists",
    });
  }

  data = data.concat(person);
  res.json(data);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const persons = data.filter((person) => person.id !== id);
  console.log(persons);
});

// app.use(unknownEndPoint);
app.listen(PORT || 3001, () => {
  console.log(`server running on ${PORT}`);
});
