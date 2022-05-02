const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument");
  process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://user:${password}@cluster0.cn2lt.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

const findAll = () => {
  Person.find({}).then((res) => {
    res.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
};

if (process.argv.length === 5) {
  person.save().then((res) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  findAll();
} else {
  console.log("Please provide the right amount of arguments");
  mongoose.connection.close();
}
