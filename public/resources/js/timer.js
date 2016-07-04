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
