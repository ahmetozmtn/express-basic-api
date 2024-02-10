const express = require("express");
const router = express.Router();
const dataUsers = require("../data/users.json");
const dataMovies = require("../data/movies.json");

router.use("/users", (req, res) => {
    if (req.method != "GET") {
        res.status(405);
        res.json({ error: "Method not allowed" });
    } else {
        res.status(200);
        res.json(dataUsers.users);
    }
});

router.use("/movies", (req, res) => {
    if (req.method != "GET") {
        res.status(405);
        res.json({ error: "Method not allowed" });
    } else {
        res.status(200);
        res.json(dataMovies.movies);
    }
});
module.exports = router;
