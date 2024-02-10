const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const router = express.Router();
const dataUsers = require("../data/users.json");
const dataMovies = require("../data/movies.json");

router.use(bodyParser.json());

router.use("/users/:id", (req, res) => {
    if (req.method != "GET") {
        res.status(405);
        res.json({ error: "Method not allowed" });
    } else {
        const userId = req.params.id;
        const user = dataUsers.users.find((user) => user.id == userId);
        if (user) {
            res.status(200);
            res.json(user);
        } else {
            res.status(404);
            res.json({ error: "User not found" });
        }
    }
});

router.use("/users", (req, res) => {
    if (req.method == "GET") {
        res.status(200);
        res.json(dataUsers.users);
    } else if (req.method == "POST") {
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
    } else {
        res.status(405);
        res.json({ error: "Method not allowed" });
    }
});

// router.use("/users", (req, res) => {
//     if (req.method != "POST") {
//         res.status(405);
//         res.json({ error: "Method not allowed" });
//     } else {
//         const newData = req.body;
//         fs.readFile(__dirname + "/../data/users.json", "utf8", (err, data) => {
//             if (err) {
//                 console.log("Error: ", err);
//                 return res.status(500).json({ error: "Something went wrong" });
//             }

//             let jsonData = JSON.parse(data);
//             jsonData.users.push(newData);
//             fs.writeFile(
//                 __dirname + "/../data/users.json",
//                 JSON.stringify(jsonData),
//                 (err) => {
//                     if (err) {
//                         console.log("Error: ", err);
//                         return res
//                             .status(500)
//                             .json({ error: "Something went wrong" });
//                     }
//                 }
//             );
//             res.status(200).json("User added successfully");
//         });
//     }
// });

router.use("/movies/:id", (req, res) => {
    if (req.method != "GET") {
        res.status(405);
        res.json({ error: "Method not allowed" });
    } else {
        const movieId = req.params.id;
        const movie = dataMovies.movies.find((movie) => movie.id == movieId);
        if (movie) {
            res.status(200);
            res.json(movie);
        } else {
            res.status(404);
            res.json({ error: "Movie not found" });
        }
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
