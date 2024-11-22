// TODO: Update this with actual course/grade data
const courseGradeDatabase = {
  "ICS 31": 3.5,
  "ICS 32": 2.2,
  "ICS 33": 1.5,
  "Writing 50": 3.1,
  "Writing 60": 2.8,
};

// Get array of keys (courses) in courseGradeDatabase
var courseArray = Object.keys(courseGradeDatabase);

// Generate random index between 0 and courseArray.length
randCourseIndex = Math.floor(Math.random() * courseArray.length);
console.log(randCourseIndex);

// Get random course
randCourse = courseArray[randCourseIndex];

document.getElementById("random-course").innerHTML =
  "<p>Class: " + randCourse + "<p>";

// Get random grade
randGrade = courseGradeDatabase[randCourse];
console.log(randGrade);

// Create div to store win/lose message
var winMessage = document.createElement("div");

guess_count = 1;
max_guesses = 6;

function wrong_guess(x) {
  // User exceeded max_guesses
  if (guess_count > 6) {
    winMessage.innerHTML = "YOU LOSE :(";
    document.getElementById("win-message").appendChild(winMessage);
  } else {
    // Create new div element for wrong guess
    var new_guess_1 = document.createElement("div");
    new_guess_1.setAttribute("class", "wrong-guess");

    // Get id of appropriate box
    var guess_id = "guess-" + String(guess_count);

    // Print guess in appropriate box
    if (x.value < randGrade) {
      new_guess_1.innerHTML = "<p>" + x.value + " ⬆️ (too low) </p>";
    } else {
      new_guess_1.innerHTML = "<p>" + x.value + " ⬇️ (too high) </p>";
    }

    // Append new div to old div
    document.getElementById(guess_id).appendChild(new_guess_1);

    // Increment count
    guess_count++;
  }
}

function modify_guess_fields() {
  // Modify win message (singular/plural) based on guess_count
  if (guess_count == 1) {
    winMessage.innerHTML = "YOU WIN! You took " + guess_count + " guess! 🎉";
  } else {
    winMessage.innerHTML = "YOU WIN! You took " + guess_count + " guesses! 🎉";
  }

  if (guess.value != parseFloat(randGrade)) {
    wrong_guess(document.getElementById("guess"));
  } else {
    console.log("You win");
    console.log(winMessage);

    document.getElementById("win-message").appendChild(winMessage);
  }
}
