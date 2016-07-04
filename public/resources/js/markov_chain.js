var math = require("mathjs");

module.exports = {
    getNextState: getNextState,
    makeMarkovChain: makeMarkovChain,
    initProbabilities: initProbabilities
};

function createState(state, probability) {
    return {
        state: state,
        probability: probability
    }
}

var probabilityMatrix = {};


function initProbabilities(probability) {
    probability.forEach(function (line, i) {
        var buffer = [];
        line.forEach(function (probability, j) {
            buffer[j] = createState(j, parseFloat(probability));
        });
        probabilityMatrix[i] = buffer;
    });
}


function getNextState(currentState) {
    var coin = math.random();
    var sum = 0;
    var states = probabilityMatrix[currentState];
    for (var stateKey in Object.keys(states)) {
        var state = states[stateKey];
        if (state.hasOwnProperty("state") && state.hasOwnProperty("probability")) {
            sum += state.probability;
            if (coin <= sum) {
                return state.state;
            }
        }
    }
}

function makeMarkovChain(steps) {
    var currentState = null;
    var result = [];
    for (var i = 0; i < steps; i++) {
        currentState = getNextState(currentState, 123);
        result.push(currentState);
    }
    return result;
}





