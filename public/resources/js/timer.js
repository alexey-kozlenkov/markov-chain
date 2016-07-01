(function test (state) {
    state = state || 0;
    $.ajax({
        url: "http://localhost:3000/markov-chain",
        data: {
            state: state
        },
        success: function (data) {
            console.log(data);
            $("#currentState").val(data);
            setTimeout(test, 1000, data);
        }
    });
})();
