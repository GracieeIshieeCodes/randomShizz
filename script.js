var questions = [
    {
        question: "Mahal mo ba ako?",
        yesAnswer: { text: "Yeheyy", image: "cat.gif" },
        noAnswer: { text: "Edi don't, iyak na ko.", image: "cat2.gif" }
    },
    {
        question: "Pag nagalit ako ng walang dahilan mag-sosorry ka?",
        yesAnswer: {text:"Buti alam mo.", image:"cat4.gif"},
        noAnswer: {text:"The only choice is yes :)", image:"cat3.gif"}
    },
    {
        question: "Nagagalit kana ba sakin dahil madami akong bawal?",
        yesAnswer: {text:"No, dapat pinindot mo jinowa mo ko e", image:"cat5.gif"},
        noAnswer: {text:"HEHEHE", image:"cat6.gif"},
    }
];

var currentIndex = 0;

$('#startButton').click(function () {
    $('#conversationModal').modal('show');
    displayQuestion();
});

function displayQuestion() {
    $('#message').text(questions[currentIndex].question);
    $('#answer').hide().html('');
    $('#yesButton').show();
    $('#noButton').show();
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
        displayQuestion();
    } else {
        $('#conversationModal').modal('hide');
    }
}

$('#yesButton').click(function () {
    var yesAnswer = questions[currentIndex].yesAnswer;
    if (typeof yesAnswer === 'object') {
        $('#answer').html(`<p>${yesAnswer.text}</p><img src="${yesAnswer.image}" alt="GIF" width="400" height="400" >`).show();
    } else {
        $('#answer').text(yesAnswer).show();
    }

    if (currentIndex === 0 && $('#answer').text() !== "Yeheyy") {
        return; // Do not proceed to the next question if the answer is "No"
    }

    if (currentIndex === 1 && $('#answer').text() !== "Buti alam mo.") {
        return; // Do not proceed to the next question if the answer is "No"
    }

    if (currentIndex < questions.length - 1 && !(currentIndex === 2 && $('#answer').text() === "HEHEHE")) {
        setTimeout(nextQuestion, 2000); // Delay for 0.5 seconds (500 milliseconds)
    }
});

$('#noButton').click(function () {
    var noAnswer = questions[currentIndex].noAnswer;
    if (typeof noAnswer === 'object') {
        $('#answer').html(`<p>${noAnswer.text}</p><img src="${noAnswer.image}" alt="GIF" width="400" height="400">`).show();
    } else {
        $('#answer').text(noAnswer).show();
    }

    if (currentIndex === 0 || currentIndex === 1) {
        return; // Do not proceed to the next question if the answer is "No" for the first and second questions
    }

    if (currentIndex < questions.length - 1 && !(currentIndex === 2 && $('#answer').text() !== "I LOVE YOU SO MUCH <3 MUAH MUAH")) {
        setTimeout(nextQuestion, 2000); // Delay for 0.5 seconds (500 milliseconds)
    }
});

$('#conversationModal').on('hidden.bs.modal', function () {
    currentIndex = 0;
    $('#yesButton').show();
    $('#noButton').show();
});
