var express = require("express");
var path = require("path");

var markovChain = require("./resources/js/markov_chain");

var app = express();

function markovChainIndex(request, response) {
    var currentState = parseInt(request.query.state);
    console.log("State received:", currentState);
    response.end(markovChain.getNextState(currentState).toString());
}

function index(request, response) {
    response.sendFile(path.join(__dirname, "resources", "index.html"));
}

app.use(express.static("public"));
app.use("/markov-chain", markovChainIndex);
app.use("/index", index);


app.listen(3000, function () {
    console.log("Server is on-line....");
});
