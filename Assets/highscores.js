function printHighscores() {
    // Get scores from localstorage or set to empty array //
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || []
  
    // Rank scores //
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // Create li item for each score //
      var liTag = document.createElement("li")
      liTag.textContent = score.initials + " - " + score.score
  
      // Show results on page //
      var olEl = document.getElementById("highscores")
      olEl.appendChild(liTag)
    })
  }
  
  
  // Run on page load //
  printHighscores()
  