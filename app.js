//Step 1

const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
var app = Express();

//Step 2

Mongoose.connect("mongodb://127.0.0.1:27017/PracDB");
const schema = new Mongoose.Schema({ firstname: "string", lastname: "string" });
const PersonModel = Mongoose.model("Person", schema);

//Step 3

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//POST

app.post("/person", async (request, response) => {
  try {
    var person = new PersonModel(request.body);
    var result = await person.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.listen(8081, () => {
  console.log("Listening at :8081...");
});

//GET

app.get("/person", async (request, response) => {
  try {
    var result = await PersonModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

//GET BY ID

app.get("/person/:id", async (request, response) => {
  try {
    var person = await PersonModel.findById(request.params.id).exec();

    response.send(person);
  } catch (error) {
    response.status(500).send(error);
  }
});

//UPDATE BY ID

app.put("/person/:id", async (request, response) => {
  try {
    var person = await PersonModel.findById(request.params.id).exec();
    person.set(request.body);
    var result = await person.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

//DELETE

app.delete("/person/:id", async (request, response) => {
  try {
    var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
