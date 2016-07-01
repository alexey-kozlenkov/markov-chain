var math = require("mathjs");

module.exports = {
    getNextState: getNextState,
    makeMarkovChain: makeMarkovChain
};

function createState(state, probability) {
    return {
        state: state,
        probability: probability
    }
}

var initialProbability = {
    1: createState(1, 0.3),
    2: createState(2, 0.4),
    3: createState(3, 0.3)
};

var probabilityMatrix = {
    null: Object.keys(initialProbability).map(function (key) {
        return initialProbability[key];
    }),
    1: [createState(1, 0.5), createState(2, 0.3), createState(3, 0.2)],
    2: [createState(1, 0.3), createState(2, 0.5), createState(3, 0.2)],
    3: [createState(1, 0.2), createState(2, 0.3), createState(3, 0.5)]
};


function getNextState(currentState) {
    currentState = currentState || null;
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





