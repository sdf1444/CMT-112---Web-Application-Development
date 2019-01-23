const path = require("path");
const Sequelize = require("sequelize");

const dataDir = path.join(__dirname, "data");

// initialise a database connection
const sequelize = new Sequelize("libraryDB", null, null, {
    dialect: "sqlite",
    storage: path.join(dataDir, "library.sqlite")
});

// connect to the database
sequelize.authenticate().then(
    function() {
        console.log("Connection has been established successfully.");
    },
    function(err) {
        console.log("Unable to connect to the database:", err);
    }
);

// User has a Name, a Barcode and a MemberType (which can be Staff or Student)
const User = sequelize.define("User", {
    name: Sequelize.STRING,
    barcode: Sequelize.STRING,
    memberType: Sequelize.ENUM("Staff", "Student")
});

// Book has a Title an ISBN number and a Author
const Book = sequelize.define("Book", {
    title: Sequelize.STRING,
    isbn: Sequelize.STRING,
    author: Sequelize.STRING
});

// Author has a Name
const Author = sequelize.define("Author", {
    name: Sequelize.STRING
});

// Journal has a Title, a Journal and a ISSN number
const Journal = sequelize.define("Journal", {
    title: Sequelize.STRING,
    journal: Sequelize.STRING,
    issn: Sequelize.STRING
});

// Exam for past exam papers has a Title, a Module, a Course, and a Link 
const Exam = sequelize.define("Exam", {
    title: Sequelize.STRING,
    module: Sequelize.STRING,
    course: Sequelize.STRING,
    link: Sequelize.STRING
});

// Loan has a User, Book and Due Date
const Loan = sequelize.define("Loan", {
    user: Sequelize.STRING,
    book: Sequelize.STRING,
    dueDate: Sequelize.DATE
});

//  SYNC SCHEMA
const initialiseDatabase = function(wipeAndClear, repopulate) {
    sequelize.sync({ force: wipeAndClear }).then(
        function() {
            console.log("Database Synchronised");
            if (repopulate) {
                repopulate();
            }
        },
        function(err) {
            console.log("An error occurred while creating the tables:", err);
        }
    );
};

module.exports = {
    initialiseDatabase,
    User,
    Book,
    Author,
    Journal,
    Exam,
    Loan
};