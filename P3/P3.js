/**
 * Purpose: The purpose of this file is to provide the functions required by the page
 * for Mi'kmap word game.
 *
 * Authors: Emmanuel Adeyemi, created the functions: drag, playAudio, allowDrop
 * 			Kimone Barrett, created the functions: restart, randomNumber, randomImage, drop
 * 			Terena Fenton, created the functions: restartGame, playAudio, randomImage
 * 			Jovannah Moxey, created the functions: drop, allowDrop
 */

/*---------------------Global Variables----------------------*/

// Declaration of global variables
const SERVER_URL = "http://ugdev.cs.smu.ca:3026";
const number = randomNumber(); // the index of the random answer generated in the game
let randomImages, // variable to store the images arrays used in the game
  audios; // variable to store the audios arrays used in the game
let correctAns = 0;
let incorrectAns = 0;
let numOfQuestions = 0;

function get() {
  $.get(SERVER_URL + "/myGet", successGet).fail(errorFn);
}

// function successPost() {

//  }

function successPost() {
  // define the object to be posted
  let obj = {
    score: correctAns,
    total: numOfQuestions,
  };

  // attempt to POST obj to endpoint http://ugdev.cs.smu.ca:3026/myPost
  // if (the middleware for this endpoint ran without error)
  //   call successFn
  // else
  //   call errorFn
  $.post(SERVER_URL + "/myPost", obj, successGet).fail(errorFn);
}

function successGet(returnedData) {
  console.log(returnedData);
  $("#score").html(returnedData.score + "/" + returnedData.total);
}

function errorFn(err) {
  console.log(err.responseText);
}

/**
 * Function to start the game.
 */
function startGame() {
  document.getElementById("vol").style.display = "inline-block"; //show volume image
  document.getElementById("displayMessage").style.display = "none"; //hide click your score
  $("#bear").attr("draggable", true); //make the bear draggable
  randomImage(); //generate random image
}

/**
 * This function hides the sound and word images and allows the user to try again.
 *
 * @author Kimone Barrett
 */
function restart() {
  $("#displayWord").hide();
  $("#vol").hide();
  document.getElementById("tryagain").innerHTML = "si'owa'si?";
}

/**
 * This function reloads the game.
 *
 * @author Terena Fenton
 */
function restartGame() {
  location.reload();
}

/**
 * This function stores the id of the element being dragged.
 *
 * @param {*} ev the event object loaded with "drag" event information
 * @author Emmanuel Adeyemi
 */
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

/**
 * This function is to allow a dropped element to acquire a new position, it retrieves
 * the id of dragged element using the keyword text and set the new position of the
 * dropped object.
 *
 * It then checks if the id of the new location and the index of the randomly generated
 * number are equal and calls the restart function to allow the user to try again.
 *
 * @param {*} ev the event object loaded with the dragover event information
 * @authors Jovannah Moxey,
 *          Kimone Barrett
 * */
function drop(ev) {
  // allow a dropped element to acquire a new position
  let newLocation = ev.target.id.charAt(3);
  ev.preventDefault();

  // retrieves the id of dragged element using the keyword text and set the new
  // position of the dropped object
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  // numOfQuestions++;

  // checks if the id of the new location and the index of the randomly generated
  // number are equal
  if (number == newLocation) {
    document.getElementById("success1").style.display = "inline-block";
    document.getElementById("success2").style.display = "inline-block";
    document.getElementById("successText").style.display = "inline-block";
    correctAns++;
  } else {
    document.getElementById("oops1").style.display = "inline-block";
    document.getElementById("oops2").style.display = "inline-block";
    document.getElementById("oopsText").style.display = "inline-block";
    incorrectAns++;
  }
  console.log("Correct answers " + correctAns);
  console.log("Incorrect answers " + incorrectAns);
  console.log("Total num of questions " + numOfQuestions);
  successPost();

  // allows the user to try again
  restart();
}

/**
 * This function gets a random number between 0 - 9
 *
 * @returns a random number between 0-9
 * @author Kimone Barrett
 */
function randomNumber() {
  return Math.floor(Math.random() * 9);
}

/**
 * Creates an array of audios and plays the audio of the randomly generated number.
 *
 * @authors Terena Fenton,
 *          Emmanuel Adeyemi
 */
function playAudio() {
  // array of audios
  audios = new Array();

  // plays the audio of the randomly generated number
  audios[0] = new Audio("./audios/wiktm.wav");
  audios[1] = new Audio("./audios/teluisi.wav");
  audios[2] = new Audio("./audios/nin.wav");
  audios[3] = new Audio("./audios/mijisi.wav");
  audios[4] = new Audio("./audios/ltu.wav");
  audios[5] = new Audio("./audios/kil.wav");
  audios[6] = new Audio("./audios/kesalk.wav");
  audios[7] = new Audio("./audios/eliey.wav");
  audios[8] = new Audio("./audios/aqq.wav");

  audios[number].play();
}

/**
 * Displays the image of a randomly generated image.
 *
 * @authors Terena Fenton,
 *          Kimone Barrett
 */
function randomImage() {
  numOfQuestions++;
  // array of images
  randomImages = new Array();

  //displays the image of a randomly generated image
  randomImages[0] = '<img src="./images/wiktmText.jpg" class="text">';
  randomImages[1] = '<img src="./images/teluisiText.jpg" class="text">';
  randomImages[2] = '<img src="./images/ninText.jpg" class="text">';
  randomImages[3] = '<img src="./images/mijisiText.jpg" class="text">';
  randomImages[4] = '<img src="./images/ltuText.jpg" class="text">';
  randomImages[5] = '<img src="./images/kilText.jpg" class="text">';
  randomImages[6] = '<img src="./images/kesalkText.jpg" class="text">';
  randomImages[7] = '<img src="./images/elieyText.jpg" class="text">';
  randomImages[8] = '<img src="./images/aqqText.jpg" class="text">';

  document.getElementById("displayWord").innerHTML = randomImages[number];
}

/**
 * Allows the bear image to be dropped on another image and prevents it from bring
 * dragged once its been dropped on the image.
 *
 * @param {*} ev the event object loaded with "drag" event information
 * @param {*} imgNum
 * @authors Emmanuel Adeyemi,
 *          Jovannah Moxey
 */
function allowDrop(ev, imgNum) {
  ev.preventDefault();

  // if the draggable element is above the id corresponding the image number
  // hide that element it is hovering over temporarily
  if (imgNum === 1) {
    $("#bear").attr("draggable", false);
    $("#wiktm").hide();
    $("#teluisi").show();
    $("#nin").show();
    $("#mijisi").show();
    $("#ltu").show();
    $("#kil").show();
    $("#kesalk").show();
    $("#eliey").show();
    $("#aqq").show();
  } else if (imgNum === 2) {
    $("#bear").attr("draggable", false);
    $("#wiktm").show();
    $("#teluisi").hide();
    $("#nin").show();
    $("#mijisi").show();
    $("#ltu").show();
    $("#kil").show();
    $("#kesalk").show();
    $("#eliey").show();
    $("#aqq").show();
  } else if (imgNum === 3) {
    $("#bear").attr("draggable", false);
    $("#wiktm").show();
    $("#teluisi").show();
    $("#nin").hide();
    $("#mijisi").show();
    $("#ltu").show();
    $("#kil").show();
    $("#kesalk").show();
    $("#eliey").show();
    $("#aqq").show();
  } else if (imgNum === 4) {
    $("#bear").attr("draggable", false);
    $("#wiktm").show();
    $("#teluisi").show();
    $("#nin").show();
    $("#mijisi").hide();
    $("#ltu").show();
    $("#kil").show();
    $("#kesalk").show();
    $("#eliey").show();
    $("#aqq").show();
  } else if (imgNum === 5) {
    $("#bear").attr("draggable", false);
    $("#wiktm").show();
    $("#teluisi").show();
    $("#nin").show();
    $("#mijisi").show();
    $("#ltu").hide();
    $("#kil").show();
    $("#kesalk").show();
    $("#eliey").show();
    $("#aqq").show();
  } else if (imgNum === 6) {
    $("#bear").attr("draggable", false);
    $("#wiktm").show();
    $("#teluisi").show();
    $("#nin").show();
    $("#mijisi").show();
    $("#ltu").show();
    $("#kil").hide();
    $("#kesalk").show();
    $("#eliey").show();
    $("#aqq").show();
  } else if (imgNum === 7) {
    $("#bear").attr("draggable", false);
    $("#wiktm").show();
    $("#teluisi").show();
    $("#nin").show();
    $("#mijisi").show();
    $("#ltu").show();
    $("#kil").show();
    $("#kesalk").hide();
    $("#eliey").show();
    $("#aqq").show();
  } else if (imgNum === 8) {
    $("#bear").attr("draggable", false);
    $("#wiktm").show();
    $("#teluisi").show();
    $("#nin").show();
    $("#mijisi").show();
    $("#ltu").show();
    $("#kil").show();
    $("#kesalk").show();
    $("#eliey").hide();
    $("#aqq").show();
  } else {
    $("#bear").attr("draggable", false);
    $("#wiktm").show();
    $("#teluisi").show();
    $("#nin").show();
    $("#mijisi").show();
    $("#ltu").show();
    $("#kil").show();
    $("#kesalk").show();
    $("#eliey").show();
    $("#aqq").hide();
  }
}
