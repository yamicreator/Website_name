const gradeUrl = "https://anteaterapi.com/v2/rest/grades/aggregateByCourse";
const courseUrl = "https://anteaterapi.com/v2/rest/courses/";

// retrieves grade data from anteater api
async function getData(url) {
  let data;
  const options = { method: "GET" };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  return data;
}

// retrieves data about a random course (name + description)
// and calls organize to add all the relevant data to a json object
function getCourse(gradeData) {
  if (gradeData["ok"]) {
    let index = Math.floor(Math.random() * gradeData.data.length);
    while (gradeData.data[index].averageGPA === null) {
      index = Math.floor(Math.random() * gradeData.data.length);
    }
    // creates url
    let id =
      gradeData["data"][index]["department"] +
      gradeData["data"][index]["courseNumber"];
    id = id.split(" ").join("");
    url = courseUrl + id;

    // calls organize on data retrieved using the url
    getData(url).then((result) => organize(result, gradeData.data[index]));
  }
}

//using courseData and gradeData tries to create an object with only the things we need
function organize(result, grades) {
  if (result["ok"]) {
    courseInfo = {};
    courseInfo.id = result["data"]["id"];
    courseInfo.title = result["data"]["title"];
    courseInfo.description = result["data"]["description"];
    courseInfo.averageGPA = Math.round(grades["averageGPA"] * 10) / 10;
    console.log(courseInfo);
    localStorage.setItem("course", JSON.stringify(courseInfo));
  }
  return null;
}

getData(gradeUrl).then(parseResults);

function parseResults(result) {
  getCourse(result);
  let course_string = localStorage.getItem("course");
  course = JSON.parse(course_string);
  console.log(course);

  // Display course title
  document.getElementById("random-course").innerHTML =
    "<p id='random-course-inner'>Class: " +
    course.title +
    "</p> <div id='course-desc'>" +
    course.description +
    "</div>";
  console.log(course.title);
}

// Create div to store win/lose message
var winMessage = document.createElement("div");

// Variable definitions
guessCount = 1;
maxGuesses = 6;

// Function definitions
function wrong_guess(x) {
  // User exceeded max_guesses
  if (guessCount >= maxGuesses) {
    winMessage.innerHTML = "YOU LOSE :(";
    document.getElementById("win-message").appendChild(winMessage);
  } else {
    // Create new div element for wrong guess
    var newGuess = document.createElement("div");
    newGuess.setAttribute("class", "wrong-guess");

    // Get id of appropriate box
    var guessID = "guess-" + String(guessCount);

    // Print guess in appropriate box
    if (x.value < course.averageGPA) {
      newGuess.innerHTML = "<p>" + x.value + " ⬆️ (too low) </p>";
    } else {
      newGuess.innerHTML = "<p>" + x.value + " ⬇️ (too high) </p>";
    }

    // Append new div to old div
    document.getElementById(guessID).appendChild(newGuess);

    // Increment count
    guessCount++;
  }
}

function modify_guess_fields() {
  // Modify win message (singular/plural) based on guessCount
  if (guessCount == 1) {
    winMessage.innerHTML = "YOU WIN! You took " + guessCount + " guess! 🎉";
  } else {
    winMessage.innerHTML = "YOU WIN! You took " + guessCount + " guesses! 🎉";
  }

  if (guess.value != course.averageGPA) {
    wrong_guess(document.getElementById("guess"));
  } else {
    // Create new div element for wrong guess
    var newGuess = document.createElement("div");
    newGuess.setAttribute("class", "wrong-guess");

    // Get id of appropriate box
    var guessID = "guess-" + String(guessCount);

    // Print guess in appropriate box
    newGuess.innerHTML =
      "<p>" + document.getElementById("guess").value + " ✅ (correct!) </p>";

    // Append new div to old div
    document.getElementById(guessID).appendChild(newGuess);

    console.log("You win");
    console.log(winMessage);

    document.getElementById("win-message").appendChild(winMessage);
  }
}
