const path = require("path");
const Sequelize = require("sequelize");

const db = require("./data");

// Add some dummy data to the database - in practice this should be in a different file
function addData() {
    let book1 = db.Book.create({
        title: "How to Draw Good",
        isbn: "3289589036",
        author: "Arthur James"
    });
    let book2 = db.Book.create({
        title: "Making the Cake",
        isbn: "23567035",
        author: "Evelyn Dorothy"
    });
    let book3 = db.Book.create({
        title: "Laughing for No Reason",
        isbn: "3297806",
        author: "Lisa Jones"
    });

    let author1 = db.Author.create({
        name: "Arthur James"
    });

    let author2 = db.Author.create({
        name: "Evelyn Dorothy"
    });

    let author3 = db.Author.create({
        name: "Lisa Jones"
    });

    let user1 = db.User.create({
        name: "Martin Chorley",
        barcode: 123456,
        memberType: "Staff"
    });

    let loan1 = db.Loan.create({
        user: "Martin Chorley",
        book: "Laughing for No Reason",
        dueDate: new Date(2019, 02, 27)
    });

    // wait for all the objects to save and then instantiate relationships.
    Promise.all([book1, book2, book3, user1, loan1]).then(function(
        results
    ) {
        b1 = results[0];
        b2 = results[1];
        b3 = results[2];
        a1 = results[3];
        a2 = results[4];
        a3 = results[5];
        u1 = results[6];
        l1 = results[7];
    });
}

db.initialiseDatabase(true, addData);