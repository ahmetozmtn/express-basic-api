const express = require("express");
const apiRouters = require("./routes/apiRouters");

const app = express();

app.use("/api/v1", apiRouters);

app.listen(3000);

console.log("Listening on port http://localhost:3000");
