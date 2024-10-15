let totalcorrectanswer = 0;
let totalincorrecctAns = 0;

function get() {
  $.get(SERVER_URL + "/myGet", successGet).fail();
}

// function successPost() {

//  }

function successPost() {
  // define the object to be posted
  let obj = {
    score: totalcorrectanswer,
    total: totalcorrectanswer + totalincorrecctAns,
  };

  // attempt to POST obj to endpoint http://ugdev.cs.smu.ca:3026/myPost
  // if (the middleware for this endpoint ran without error)
  //   call successFn
  // else
  //   call errorFn
  $.post(SERVER_URL + "/myPost", obj, successFn).fail(errorFn);
}

function successGet(returnedData) {
  console.log(returnedData);
  $("#score").html(returnedData.score + "/" + returnedData.total);
}

function fail() {
  console.log("Something went wrong");
}
