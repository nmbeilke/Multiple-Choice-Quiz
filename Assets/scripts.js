// Variables for states //
var currentQuestionIndex = 0
var time = questions.length * 15
var timerId

// Variable declarations //
var questionsEl = document.getElementById("questions")
var timerEl = document.getElementById("time")
var barEL = document.getElementById("bar")
var choicesEl = document.getElementById("choices")
var submitBtn = document.getElementById("submit")
var startBtn = document.getElementById("start")
var initialsEl = document.getElementById("initials")
var feedbackEl = document.getElementById("feedback")
var feedbackMessageEl = document.getElementById("feedback-message")


//Hide and show//

function startQuiz() {
    // Hide start screen //
    var startScreenEl = document.getElementById("start-screen")
    startScreenEl.setAttribute("class", "hide")
  
    // Show questions section //
    questionsEl.removeAttribute("class")
  
    // Start timer //

    timerId = setInterval(clockTick, 1000)
  
    // Show start time //
    timerEl.textContent = time
  
    getQuestion()
  }

  function getQuestion() {
    // Show current question from array //
    var currentQuestion = questions[currentQuestionIndex]
  
    // Update title with current question //
    var titleEl = document.getElementById("question-title")
    titleEl.textContent = currentQuestion.title
  
    // Clear previous choices //
    choicesEl.innerHTML = ""
  
    // Loop to show new choices //
    currentQuestion.choices.forEach(function(choice, i) {
    
      var choiceNode = document.createElement("button")
      choiceNode.setAttribute("class", "btn btn-primary")
      choiceNode.setAttribute("value", choice)
  
      choiceNode.textContent = i + 1 + ". " + choice
  
      // Add click event listener to each button //
      choiceNode.onclick = questionClick
  
      // Show choices on the page //
      choicesEl.appendChild(choiceNode)
    });
  }
  
  function questionClick() {
    // Check if user guessed wrong //
    if (this.value !== questions[currentQuestionIndex].answer) {
        // Remove time //
      time -= 15
  
      if (time < 0) {
        time = 0
      }
  
      // Put new time in alert //
      timerEl.textContent = time
    
      feedbackMessageEl.setAttribute("class", "alert alert-danger")
      feedbackMessageEl.textContent = "Incorrect"
    } else {
  
      feedbackMessageEl.setAttribute("class", "alert alert-success")
      feedbackMessageEl.textContent = "Correct!"
    }
  
    // Briefly show alert so user knows if their choice was correct or not //
    feedbackEl.removeAttribute("class")
    setTimeout(function() {
      feedbackEl.setAttribute("class", "hide")
    }, 1000)
  
    // Go to next question if there is one //
    currentQuestionIndex++
  
    if (currentQuestionIndex === questions.length) {
      quizEnd()
    } else {
      getQuestion()
    }
  }
  
  function quizEnd() {
    // Stop timer //
    clearInterval(timerId)
  
    // Show end screen //
    var endScreenEl = document.getElementById("end-screen")
    endScreenEl.removeAttribute("class")
  
    // Show final score //
    var finalScoreEl = document.getElementById("final-score")
    finalScoreEl.textContent = time
  
    // Hide questions section //
    questionsEl.setAttribute("class", "hide")
  }
  
  function clockTick() {
    // Update time //
    time--;
    timerEl.textContent = time
  
    // Check if user ran out of time //
    if (time <= 0) {
      quizEnd()
    }
  }
  
  function saveHighscore() {
    // Get user input for initials //
    var initials = initialsEl.value.trim()
  
    // Check that box isn't empty //
    if (initials !== "") {
      // Get scores from localstorage, or if not any, set to empty array //
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || []
  
      // Format new score object for current user //
      var newScore = {
        score: time,
        initials: initials
      };
  
      // Save to localstorage //
      highscores.push(newScore)
      window.localStorage.setItem("highscores", JSON.stringify(highscores))
  
      // Go to learderboard page //
      window.location.href = "highscores.html"
    }
  }
  
  function checkForEnter(event) {
    // Allow save on enter button //
    if (event.key === "Enter") {
      saveHighscore()
    }
  }
// User clicks button to submit initials //
submitBtn.onclick = saveHighscore

  
  // User clicks button to start quiz //
  startBtn.onclick = startQuiz
  
  
  initialsEl.onkeyup = checkForEnter


  
