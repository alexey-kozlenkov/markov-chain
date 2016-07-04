function startTimer (state) {
    state = state || 0;
    $.ajax({
        url: "http://localhost:3000/markov-chain",
        data: {
            state: state
        },
        success: function (data) {
            console.log(data);
            $("#currentState").val(data);
            setTimeout(startTimer, 1000, data);
        }
    });
}

function prepareProbabilities() {
    var text = $("#inputArea").val();
    var lines = text.split("\n");
    var result = [];
    
    lines.forEach(function (line) {
        result.push(line.split(" "));
    });
    
    $.ajax({
        url: "http://localhost:3000/init-markov-chain-probability",
        data: {
            probability: JSON.stringify(result)
        }
    });
}