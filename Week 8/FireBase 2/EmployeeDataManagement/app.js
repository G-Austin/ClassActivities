  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_0_4rwTyMYI-btU3gOXv2RM_L2Gu6i70",
    authDomain: "emp-data-manage.firebaseapp.com",
    databaseURL: "https://emp-data-manage.firebaseio.com",
    projectId: "emp-data-manage",
    storageBucket: "emp-data-manage.appspot.com",
    messagingSenderId: "85820708559"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var role = "";
  var startDate = "";
  var monthsWorked = "";
  var monthlyRate = "";
  var totalBilled = "";

  //Capture Button Click
  $("#addEmployee").on("click", function() {

    // Don't refresh the page
    event.preventDefault();

    //Store and retrieve the data into the database
    name = $("#employeeName").val().trim();
    role = $("#role").val().trim();
    startDate = $("#startDate").val().trim();
    monthsWorked = $("#monthsWorked").val().trim();
    monthlyRate = $("#monthlyRate").val().trim();
    totalBilled = $("#totalBilled").val().trim();

    database.ref().push({
      employeeName: employeeName,
      role: role,
      startDate: startDate,
      monthsWorked: monthsWorked,
      monthlyRate: monthlyRate,
      totalBilled: totalBilled
    });

  });

   // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().role);
      console.log(childSnapshot.val().startDate);
      console.log(childSnapshot.val().monthsWorked);
      console.log(childSnapshot.val().monthlyRate);
      console.log(childSnapshot.val().totalBilled);

      // full list of items to the well
      $("#employeeInfo").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
        " </span><span id='email'> " + childSnapshot.val().role +
        " </span><span id='age'> " + childSnapshot.val().startDate +
        " </span><span id='comment'> " + childSnapshot.val().monthsWorked + " </span></div>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

      // Change the HTML to reflect
      $("#name-display").text(snapshot.val().name);
      $("#email-display").text(snapshot.val().email);
      $("#age-display").text(snapshot.val().age);
      $("#comment-display").text(snapshot.val().comment);
    });