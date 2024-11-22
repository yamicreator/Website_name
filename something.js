const gradeUrl = "https://anteaterapi.com/v2/rest/grades/aggregateByCourse";
const courseUrl = "https://anteaterapi.com/v2/rest/courses/";

// retrieves grade data from anteater api using a url
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
async function getCourse(gradeData) {
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
    // returns this promise so that we can make sure all promises are resolved
    // before starting the game
    return getData(url).then(result => organize(result, gradeData.data[index]));
  }
}

//using courseData and gradeData, creates an object with only the things we need
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

// please ignore my desperation when writing this function
// this function returns a Promise containing all the other relevant
// Promises so that we can make sure stuff only happens after all the
// data we need has been fetched
async function please()
{
  p1 = getData(gradeUrl);
  let p2 = p1.then(getCourse);
  console.log(p2);
  return Promise.all([p1, p2])
}

// Using the bigger Promise from please(), we call parseResults(),
// which does stuff with all of the data that we now actually have
// in time to do stuff with it
please().then(result => parseResults());

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
var guess = document.getElementById("guess");
var guessCount = 1;
var maxGuesses = 6;
var winStatus = false;

// Function definitions
function wrong_guess(x) {
  if (winStatus == false) {
    // User exceeded maxGuesses
    if (guessCount >= maxGuesses) {
      winMessage.innerHTML = "YOU LOSE :(";
      document.getElementById("win-message").appendChild(winMessage);
    }

    // Create new div element for wrong guess
    var newGuess = document.createElement("div");
    newGuess.setAttribute("class", "wrong-guess");

    // Get id of appropriate box
    var guessID = "guess-" + String(guessCount);

    // Print guess in appropriate box
    if (x.value < course.averageGPA) {
      newGuess.innerHTML =
        "<p class='guess-inner'>" + x.value + " ⬆️ (too low) </p>";
    } else {
      newGuess.innerHTML =
        "<p class='guess-inner'>" + x.value + " ⬇️ (too high) </p>";
    }

    // Append new div to old div
    document.getElementById(guessID).appendChild(newGuess);

    // Increment count
    guessCount++;
  }
}

function modify_guess_fields() {
  if (guess.value != course.averageGPA) {
    wrong_guess(document.getElementById("guess"));
  } else if (winStatus == false) {
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

  if (guess.value == course.averageGPA) {
    // Set winStatus to true
    winStatus = true;

    // Modify win message (singular/plural) based on guessCount
    if (guessCount == 1) {
      winMessage.innerHTML = "YOU WIN! You took " + guessCount + " guess! 🎉";
    } else {
      winMessage.innerHTML = "YOU WIN! You took " + guessCount + " guesses! 🎉";
    }
  }
}
