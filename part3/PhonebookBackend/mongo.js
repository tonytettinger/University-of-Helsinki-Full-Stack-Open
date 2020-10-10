const mongoose = require("mongoose");

if (process.argv.length > 3 && process.argv.length < 5) {
  console.log("Please provide the password name and phone number in order as arguments: node mongo.js <password> <name> <number>");
  process.exit(1);
} else if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>");
}

const password = process.argv[2];

const url = `mongodb+srv://toniquez:${password}@cluster0.fws1q.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const PhonebookSchema = new mongoose.Schema({
  name: String,
  number: String
});

const PhonebookEntry = mongoose.model("PhoneBookEntry", PhonebookSchema);

if (process.argv.length === 5) {
  const phonebookEntry = new PhonebookEntry({
    name: process.argv[3],
    number: process.argv[4]
  });

  phonebookEntry.save().then(result => {
    console.log("Phonebook entry saved");
    mongoose.connection.close();
  });
} else {
  PhonebookEntry.find({}).then(results => {
    results.forEach(result => console.log(result));
    mongoose.connection.close();
  });
}
