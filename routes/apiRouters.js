const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const router = express.Router();
const dataUsers = require("../data/users.json");

router.use(bodyParser.json());

router.get("/users", (req, res) => {
    res.status(200);
    res.json(dataUsers.users);
});

router.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = dataUsers.users.find((user) => user.id == userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

router.post("/users", (req, res) => {
    const newData = req.body;
    fs.readFile(__dirname + "/../data/users.json", "utf8", (err, data) => {
        if (err) {
            console.log("Error: ", err);
            return res.status(500).json({ error: "Something went wrong" });
        }
        let jsonData = JSON.parse(data);
        jsonData.users.push(newData);
        fs.writeFile(
            __dirname + "/../data/users.json",
            JSON.stringify(jsonData),
            (err) => {
                if (err) {
                    console.log("Error: ", err);
                    return res
                        .status(500)
                        .json({ error: "Something went wrong" });
                }
            }
        );
        res.status(200).json("User added successfully");
    });
});

module.exports = router;
