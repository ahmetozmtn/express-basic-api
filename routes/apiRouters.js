const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const router = express.Router();
const dataUsers = require("../data/users.json");

router.use(bodyParser.json());

// GET

// get all users
router.get("/users", (req, res) => {
    res.status(200);
    res.json(dataUsers.users);
});

// get user by id
router.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = dataUsers.users.find((user) => user.id == userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// get user by id and their todos
router.get("/users/:id/todos", (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    const user = dataUsers.users.find((user) => user.id == userId);
    if (user) {
        res.status(200).json(user.todos);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// PUT

// update todo
router.put("/users/:id/todos/:todoId", (req, res) => {
    const userId = parseInt(req.params.id);
    const todoId = parseInt(req.params.todoId);
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;

    fs.readFile(__dirname + "/../data/users.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        let jsonData = JSON.parse(data);
        const userIndex = jsonData.users.findIndex(
            (user) => user.id === userId
        );
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        const todoIndex = jsonData.users[userIndex].todos.findIndex(
            (todo) => todo.id === todoId
        );
        if (todoIndex === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }

        const updatedTodo = {
            ...jsonData.users[userIndex].todos[todoIndex],
            title: title,
            description: description,
            completed: completed,
        };

        jsonData.users[userIndex].todos[todoIndex] = updatedTodo;

        fs.writeFile(
            __dirname + "/../data/users.json",
            JSON.stringify(jsonData),
            "utf8",
            (err) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({ error: "Internal Server Error" });
                }
                res.status(200).json({
                    message: "User's todo updated successfully",
                });
            }
        );
    });
});

// update user
router.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const username = req.body.username;
    const password = req.body.password;

    fs.readFile(__dirname + "/../data/users.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        let jsonData = JSON.parse(data);
        const userIndex = jsonData.users.findIndex(
            (user) => user.id === userId
        );

        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = {
            ...jsonData.users[userIndex],
            username: username,
            password: password,
        };

        jsonData.users[userIndex] = updatedUser;

        fs.writeFile(
            __dirname + "/../data/users.json",
            JSON.stringify(jsonData),
            "utf8",
            (err) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({ error: "Internal Server Error" });
                }
                res.status(200).json({ message: "User updated successfully" });
            }
        );
    });
});

// POST

// todo create
router.post("/users/:id/todos", (req, res) => {
    const userId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;

    fs.readFile(__dirname + "/../data/users.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        let users = JSON.parse(data).users;
        const user = users.find((user) => user.id == userId);

        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        const newTodoId =
            user.todos.length > 0
                ? Math.max(...user.todos.map((todo) => todo.id)) + 1
                : 1;
        user.todos.push({
            id: newTodoId,
            title: title,
            description: description,
            completed: completed,
        });

        fs.writeFile(
            __dirname + "/../data/users.json",
            JSON.stringify({ users: users }, null, 2),
            "utf8",
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Internal Server Error");
                    return;
                }
                res.status(201).json({ message: "Todo created successfully" });
            }
        );
    });
});

// user create
router.post("/users", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const todos = req.body.todos;
    fs.readFile(__dirname + "/../data/users.json", "utf8", (err, data) => {
        if (err) {
            console.log("Error: ", err);
            return res.status(500).json({ error: "Something went wrong" });
        }
        let jsonData = JSON.parse(data);
        jsonData.users.push({
            id: jsonData.users.length + 1,
            username: username,
            password: password,
            todos: todos,
        });
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
        res.status(200).json({ message: "User added successfully" });
    });
});

// DELETE

// all user delete
router.delete("/users/all", (req, res) => {
    fs.writeFile(
        __dirname + "/../data/users.json",
        JSON.stringify({ users: [] }),
        "utf8",
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(200).json({ message: "All users deleted successfully" });
        }
    );
});

// single user delete
router.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    fs.readFile(__dirname + "/../data/users.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        let jsonData = JSON.parse(data);
        const userIndex = jsonData.users.findIndex(
            (user) => user.id === userId
        );

        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove the user from the array
        jsonData.users.splice(userIndex, 1);

        fs.writeFile(
            __dirname + "/../data/users.json",
            JSON.stringify(jsonData),
            "utf8",
            (err) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({ error: "Internal Server Error" });
                }
                res.status(200).json({ message: "User deleted successfully" });
            }
        );
    });
});

// single todo delete
router.delete("/users/:id/todos/:todoId", (req, res) => {
    const userId = parseInt(req.params.id);
    const todoId = parseInt(req.params.todoId);
    fs.readFile(__dirname + "/../data/users.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        let jsonData = JSON.parse(data);
        const userIndex = jsonData.users.findIndex(
            (user) => user.id === userId
        );
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        const todoIndex = jsonData.users[userIndex].todos.findIndex(
            (todo) => todo.id === todoId
        );
        if (todoIndex === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }
        jsonData.users[userIndex].todos.splice(todoIndex, 1);
        fs.writeFile(
            __dirname + "/../data/users.json",
            JSON.stringify(jsonData),
            "utf8",
            (err) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({ error: "Internal Server Error" });
                }
                res.status(200).json({ message: "Todo deleted successfully" });
            }
        );
    });
});

module.exports = router;
