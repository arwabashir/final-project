// Simplified DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  const learnMoreBtn = r_e("learnMoreBtn");
  const ourServicesBtn = r_e("ourServicesBtn");

  // Function to show a specific page and hide other sections
  function showPage(pageId) {
    const pages = ["mainpage", "aboutus", "ourservices"];
    pages.forEach((page) => {
      const element = r_e(page);
      if (page === pageId) {
        element.classList.remove("is-hidden");
      } else {
        element.classList.add("is-hidden");
      }
    });
  }

  // Add event listeners to buttons
  learnMoreBtn.addEventListener("click", () => showPage("aboutus"));
  ourServicesBtn.addEventListener("click", () => showPage("ourservices"));

  // Event listeners for authentication
  r_e("signupbtn").addEventListener("click", () =>
    r_e("myModal").classList.add("is-active")
  );
  r_e("signinbtn").addEventListener("click", () =>
    r_e("myModal2").classList.add("is-active")
  );
  r_e("signoutbtn").addEventListener("click", () => {
    auth.signOut().then(() => {
      hideSignOutButton();
      alert("You are now signed out!");
      location.reload();
    });
  });
});

// Simplified function to get element by ID
function r_e(id) {
  return document.getElementById(id);
}

// Function to show the sign-out button
function showSignOutButton() {
  r_e("signoutDiv").style.display = "block";
}

// Function to hide the sign-out button
function hideSignOutButton() {
  r_e("signoutDiv").style.display = "none";
}

// Function to update the navigation bar based on authentication state
function updateNavbar(user) {
  const emailElement = r_e("userEmail");
  if (user) {
    // User is signed in
    emailElement.textContent = user.email;
    emailElement.style.display = "block"; // Show the email element
    r_e("signoutbtn").classList.remove("is-hidden");
    r_e("signinbtn").classList.add("is-hidden");
  } else {
    // No user is signed in
    emailElement.textContent = ""; // Clear the email element
    emailElement.style.display = "none"; // Hide the email element
    r_e("signoutbtn").classList.add("is-hidden");
    r_e("signinbtn").classList.remove("is-hidden");
  }
}

// Update the navigation bar when authentication state changes
firebase.auth().onAuthStateChanged(updateNavbar);

// Check if a user is signed in or signed out
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in
    showSignOutButton();
  } else {
    // No user is signed in
    hideSignOutButton();
  }
});

let s3 = document.querySelector("#Cancel");

s3.addEventListener("click", () => {
  document.getElementById("myModal").classList.remove("is-active");
});

let s4 = document.querySelector("#Cancel2");

s4.addEventListener("click", () => {
  document.getElementById("myModal2").classList.remove("is-active");
});

//SIGN UP MODAL INFO
r_e("submit").addEventListener("click", () => {
  // 1. Collect the email/password combination from the input fields
  let email = r_e("email").value;
  let pass = r_e("pass").value;

  // 2. Send the email/password to Firestore
  auth
    .createUserWithEmailAndPassword(email, pass)
    .then((credential) => {
      // Extract the user's email from the authentication object
      const userEmail = credential.user.email;

      // 3. Save the user's email to your Firestore collection
      db.collection("users").doc(userEmail).set({
        email: userEmail,
        // Add more fields as needed
      });

      // Clear the input fields
      r_e("email").value = "";
      r_e("pass").value = "";

      document.querySelector("#signoutbtn").classList.remove("is-hidden");
      document.querySelector("#signinbtn").classList.add("is-hidden");
      // Close the modal
      document.getElementById("myModal").classList.remove("is-active");
      alert("You have signed up!");
    })

    .catch((error) => {
      // Handle errors
      var errorCode = error.code;
      var errorMessage = error.message;

      // Display error message to the user
      alert(errorMessage);
    });
});

//SIGN IN MODAL INFO
r_e("submit2").addEventListener("click", () => {
  // 1. Collect the email/password combination from the input fields
  let email2 = r_e("email2").value;
  let pass2 = r_e("pass2").value;

  // 2. send the email/password to Firebase for sign-in
  auth
    .signInWithEmailAndPassword(email2, pass2)
    .then(() => {
      // Clear the input fields
      r_e("email2").value = "";
      r_e("pass2").value = "";

      // Hide the sign-in button and show the sign-out button
      document.querySelector("#signoutbtn").classList.remove("is-hidden");

      // Close the modal
      document.getElementById("myModal2").classList.remove("is-active");

      // Alert the user that they are signed in
      alert("You are now signed in: " + email2);

      // Reload the page to reflect the signed-in state
      window.location.href = window.location.href;

      // Hide the sign-in button
      document.querySelector("#signinbtn").classList.add("is-hidden");
    })
    .catch((error) => {
      // Handle errors here
      alert("Email or password incorrect");
    });
});

//about us page click event
r_e("aboutuspage").addEventListener("click", () => {
  r_e("mainpage").classList.add("is-hidden");
  r_e("aboutus").classList.remove("is-hidden");
  r_e("ourservices").classList.add("is-hidden");
  r_e("booking").classList.add("is-hidden");
  r_e("leaveareview").classList.add("is-hidden");
});

//homepage page click event
r_e("homepage").addEventListener("click", () => {
  r_e("mainpage").classList.remove("is-hidden");
  r_e("aboutus").classList.add("is-hidden");
  r_e("ourservices").classList.add("is-hidden");
  r_e("booking").classList.add("is-hidden");
  r_e("leaveareview").classList.add("is-hidden");
});

//our services page click event
r_e("ourservicespage").addEventListener("click", () => {
  r_e("mainpage").classList.add("is-hidden");
  r_e("aboutus").classList.add("is-hidden");
  r_e("ourservices").classList.remove("is-hidden");
  r_e("booking").classList.add("is-hidden");
  r_e("leaveareview").classList.add("is-hidden");
});

//booking page click event
r_e("bookingpage").addEventListener("click", () => {
  r_e("mainpage").classList.add("is-hidden");
  r_e("aboutus").classList.add("is-hidden");
  r_e("ourservices").classList.add("is-hidden");
  r_e("booking").classList.remove("is-hidden");
  r_e("leaveareview").classList.add("is-hidden");
});

//leave a review page click event
r_e("leaveareviewpage").addEventListener("click", () => {
  r_e("mainpage").classList.add("is-hidden");
  r_e("aboutus").classList.add("is-hidden");
  r_e("ourservices").classList.add("is-hidden");
  r_e("booking").classList.add("is-hidden");
  r_e("leaveareview").classList.remove("is-hidden");
});

// Function to render the calendar
function showModal() {
  document.getElementById("bookingModal").classList.add("is-active"); // Show the modal
}

function closeModal() {
  document.getElementById("bookingModal").classList.remove("is-active"); // Hide the modal
}

// Array to store days of the week
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// check if the user is the admin user:
function isAdminUser() {
  const currentUser = firebase.auth().currentUser;
  return currentUser && currentUser.email === "peace0mind15@yahoo.com";
}

// Function to update UI based on user's admin status
function updateUIBasedOnAdminStatus() {
  const isAdmin = isAdminUser();
  const bookingDescription = document.getElementById("bookingDescription");
  if (bookingDescription) {
    bookingDescription.style.display = isAdmin ? "none" : "block";
  }
}

// Add an auth state listener to update UI when auth state changes
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    updateUIBasedOnAdminStatus();
  } else {
    // No user is signed in.
    // may want to handle this case as well
  }
});

// updated renderCalendar function with checking for admin user
function renderCalendar(year, month) {
  const calendarContainer = document.getElementById("calendar-container");
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the day of the week for the first day of the month

  let calendarHTML = `
  <h2 class="title is-3 has-text-left">${monthNames[month]} ${year}</h2>
  <div id="calendar" class="box">
  <div class="columns is-multiline">
`;

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const dayOfWeek = currentDate.getDay(); // Get the numeric representation of the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    // Check if the current day is a weekday (Monday to Friday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dateId = `${year}-${month + 1}-${day}`;
      const isAdmin = isAdminUser();

      // Determine button text and class based on user role
      const buttonText = isAdmin ? "Add" : "Book";
      const buttonClass = isAdmin ? "add-btn" : "book-btn";

      calendarHTML += `
      <div class="column is-one-third">
        <div class="card" id="${dateId}">
          <div class="card-content">
            <p class="title is-4">${monthNames[month]} ${day}</p>
            <p class="DOW" class="title is-7">${dayNames[dayOfWeek]}</p>
            <button class="button is-primary is-fullwidth ${buttonClass}">${buttonText}</button>
          </div>
        </div>
      </div>
    `;
    }
  }

  // Close the calendar HTML
  calendarHTML += `
      </div>
    </div>
  `;

  // Render the calendar HTML
  calendarContainer.innerHTML = calendarHTML;
  if (isAdminUser()) {
    attachAddListeners();
  } else {
    attachBookingListeners();
  }
}

document
  .getElementById("monthSelector")
  .addEventListener("change", function () {
    const selectedMonth = parseInt(this.value);
    const year = new Date().getFullYear();
    renderCalendar(year, selectedMonth);
  });

// Separate function to attach event listeners to booking buttons + check that user is signed in to allow booking
function attachBookingListeners() {
  const bookButtons = document.querySelectorAll(".book-btn");
  bookButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Check if the user is signed in
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in, show the booking modal
          const card = button.closest(".card");
          const date = card.id;
          showModal(date);
        } else {
          // User is not signed in, show a message
          alert("Please sign in before booking an appointment");
        }
      });
    });
  });
}

function attachAddListeners() {
  const addButtons = document.querySelectorAll(".add-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          const card = button.closest(".card");
          const date = card.id;
          showAddModal(date);
        } else {
          alert("Please sign in before adding an appointment");
        }
      });
    });
  });
}

// Sets the default drop down month to the current month and default month on page to the curent month and year
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  document.getElementById("monthSelector").value = currentMonth.toString();
  renderCalendar(currentYear, currentMonth);
});

// Array to store month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Call the renderCalendar function with the current year and month when the booking page is clicked
r_e("bookingpage").addEventListener("click", () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  renderCalendar(currentYear, currentMonth);
});

// All actions triggered off booking page (render calendar and display appropriate left column)
r_e("bookingpage").addEventListener("click", () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  renderCalendar(currentYear, currentMonth);
  if (isAdminUser()) {
    // Hide the left column if the user is an admin
    document.getElementById("leftColumn").innerHTML = `
    <h2 class='title'>Recently Added Appointments</h2>
    <div id="recentappointments"></div>
  `;
  }
});

// Make default drop down option on the daySelector the current day of the week
// THIS IS BROKEN WHEN THE VALUES OF THE DAY SELECTOR TURN FROM NUMERICAL TO THEIR ACTUAL DAY
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  let currentDayOfWeek = today.getDay(); // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

  if (currentDayOfWeek === 0 || currentDayOfWeek === 6) {
    currentDayOfWeek = 1;
  }

  document.getElementById("daySelector").value = currentDayOfWeek.toString(); // Set the value of the dropdown to the current day of the week or Monday if it's a weekend
});

function showAddModal(date) {
  const addingModal = document.getElementById("addingModal");
  if (addingModal) {
    addingModal.classList.add("is-active");
    const addingDateInput = document.getElementById("appointmentDate");
    if (addingDateInput) {
      addingDateInput.value = date;
      addingDateInput.setAttribute("readonly", "readonly");
    }
  }
}

// Function to show the booking modal
function showModal(date) {
  const bookingModal = document.getElementById("bookingModal");
  if (bookingModal) {
    // Reset modal state
    const bookingDateInput = document.getElementById("bookingDate");
    const lookingForCaretakerRadio = document.getElementById(
      "lookingForCaretaker"
    );
    const lookingToBeCaretakerRadio = document.getElementById(
      "lookingToBeCaretaker"
    );
    const errorReason = document.getElementById("errorReason");

    if (bookingDateInput) {
      bookingDateInput.value = date; // Set the selected date in the modal
      bookingDateInput.setAttribute("readonly", "readonly");
    } else {
      console.error("Input field with ID 'bookingDate' not found.");
    }

    if (lookingForCaretakerRadio && lookingToBeCaretakerRadio) {
      lookingForCaretakerRadio.checked = false;
      lookingToBeCaretakerRadio.checked = false;
    }

    if (errorReason) {
      errorReason.style.display = "block"; // Display error message
    }

    bookingModal.classList.add("is-active"); // Show the modal

    db.collection("bookings")
      .doc(date)
      .get()
      .then((doc) => {
        html = "";
        if (doc.exists) {
          const time = doc.data();
          const times = time.times;
          for (i = 0; i < times.length; i++) {
            html += `<option value=${times[i]}>${times[i]}</option>`;
          }
          r_e("time").innerHTML = html;
        } else {
          console.log("No document!");
        }
      })
      .catch((error) => {
        console.log("Error finding document:", error);
      });
  } else {
    console.error("Booking modal with ID 'bookingModal' not found.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const bookAppointmentButton = document.getElementById(
    "bookAppointmentButton"
  );
  const lookingForCaretakerRadio = document.getElementById(
    "lookingForCaretaker"
  );
  const lookingToBeCaretakerRadio = document.getElementById(
    "lookingToBeCaretaker"
  );
  const errorReason = document.getElementById("errorReason");

  // Function to toggle error message visibility
  function toggleErrorMessage() {
    if (lookingForCaretakerRadio.checked || lookingToBeCaretakerRadio.checked) {
      errorReason.style.display = "none";
    } else {
      errorReason.style.display = "block";
    }
  }

  toggleErrorMessage(); // Initialize error message visibility

  if (bookAppointmentButton) {
    bookAppointmentButton.addEventListener("click", function (event) {
      // Get input fields
      const bookingDateInput = document.getElementById("bookingDate");
      const bookingCommentsInput = document.getElementById("bookingComments");

      // Check if date and at least one radio option is selected
      if (
        bookingDateInput &&
        bookingDateInput.value !== "" && // Ensure a date is selected
        (lookingForCaretakerRadio.checked || lookingToBeCaretakerRadio.checked)
      ) {
        const date = bookingDateInput.value;
        const inquiryReason = lookingForCaretakerRadio.checked
          ? "lookingForCaretaker"
          : "lookingToBeCaretaker";
        const comments = bookingCommentsInput.value;
        const time = document.getElementById("time").value;

        // Call addBookedAppointment function
        addBookedAppointment();

        // Check if user is signed in
        const user = firebase.auth().currentUser;
        if (user) {
          const userEmail = user.email;

          // Reference to the user's document
          const userDocRef = db.collection("users").doc(userEmail);

          const admindoc = db.collection("users").doc("peace0mind15@yahoo.com");

          admindoc
            .collection("appointments")
            .add({
              user: userEmail,
              date: date,
              inquiryReason: inquiryReason,
              time: time,
              comments: comments,
            })
            .then((docid) => {
              // Appointment added successfully
              const adminid = docid.id;
              console.log("Appointment added successfully");

              return userDocRef.collection("appointments").doc(adminid).set({
                date: date,
                time: time,
                inquiryReason: inquiryReason,
                comments: comments,
              });
              // You can add further actions here if needed
            })
            .catch(function (error) {
              console.error("Error adding appointment: ", error);
            });
        } else {
          // User is not signed in, show a message
          alert("Please sign in before booking an appointment");
        }
      } else {
        // If date or radio option is not selected, show an error message
        toggleErrorMessage();
        console.error("One or more input fields not found or not selected.");
        event.preventDefault(); // Prevent the default form submission behavior
      }
    });
  } else {
    console.error("Button with ID 'bookAppointmentButton' not found.");
  }

  // Event listeners to update error message visibility when radio options change
  if (lookingForCaretakerRadio && lookingToBeCaretakerRadio) {
    lookingForCaretakerRadio.addEventListener("change", toggleErrorMessage);
    lookingToBeCaretakerRadio.addEventListener("change", toggleErrorMessage);
  }
});

// Function to handle booking appointment button click
document
  .getElementById("bookAppointmentButton")
  .addEventListener("click", function () {
    // Add the booked appointment to the "Booked Appointments" column
    // Close the modal
    const bookingModal = document.getElementById("bookingModal");
    if (bookingModal) {
      bookingModal.classList.remove("is-active");
    }
  });

// Function to delete the specified time from Firebase
function deleteAppointment(date, time) {
  // Convert the text date back to its original format
  const originalDate = reverseFormatDateText(date);

  const bookingRef = firebase
    .firestore()
    .collection("bookings")
    .doc(originalDate);

  // Use a transaction to ensure atomicity and consistency
  return firebase.firestore().runTransaction((transaction) => {
    // Get the document snapshot within the transaction
    return transaction.get(bookingRef).then((doc) => {
      if (!doc.exists) {
        throw new Error("Document does not exist!");
      }
      const times = doc.data().times;
      const index = times.indexOf(time);

      if (index !== -1) {
        // If the time is found in the array, remove it
        times.splice(index, 1);
        transaction.update(bookingRef, { times: times });
      } else {
        console.log("Time not found in the array.");
      }
    });
  });
}

function reverseFormatDateText(formattedDate) {
  // Split the formatted date into month, day, and year parts
  const parts = formattedDate.split(" ");
  const monthName = parts[0];
  const day = parts[1].replace(",", ""); // Remove the comma
  const year = parts[2];

  // Convert the month name to its numerical equivalent
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames.indexOf(monthName) + 1; // Months are zero-indexed, so add 1

  // Construct the original date in YYYY-MM-DD format
  const originalDate = `${year}-${month}-${day}`;

  return originalDate;
}

function addRecentAppointment(date, time) {
  const recentAppointmentsContainer =
    document.getElementById("recentappointments");
  const appointmentContainer = document.createElement("div");
  appointmentContainer.classList.add("field", "has-addons", "mb-3"); // Add margin-bottom for spacing

  // Convert the date to its text equivalent using the formatDateText function
  const formattedDate = formatDateText(date);

  const inputControl = document.createElement("div");
  inputControl.classList.add("control");

  const inputField = document.createElement("input");
  inputField.classList.add("input");
  inputField.type = "text";
  inputField.value = `${formattedDate} ${time}`;
  inputField.readOnly = true; // Make the input field read-only

  inputControl.appendChild(inputField);

  const buttonControl = document.createElement("div");
  buttonControl.classList.add("control");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button", "is-danger");
  deleteButton.textContent = "Delete";

  // Add an event listener to delete the appointment on click
  deleteButton.addEventListener("click", function () {
    deleteAppointment(date, time)
      .then(() => {
        appointmentContainer.remove();
        window.location.href = window.location.href;
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  });

  buttonControl.appendChild(deleteButton);

  appointmentContainer.appendChild(inputControl);
  appointmentContainer.appendChild(buttonControl);

  recentAppointmentsContainer.appendChild(appointmentContainer);
}

// Function to load recent appointments from Firebase Firestore
function loadRecentAppointmentsFromFirestore() {
  const recentAppointmentsContainer =
    document.getElementById("recentappointments");

  // Clear the container before populating it with new appointments
  recentAppointmentsContainer.innerHTML = "";

  // Query the Firestore collection "bookings" to get all appointments
  firebase
    .firestore()
    .collection("bookings")
    .get()
    .then((querySnapshot) => {
      // Create an array to store all appointments
      const appointments = [];

      // Iterate over each document in the collection
      querySnapshot.forEach((doc) => {
        const date = doc.id; // Get the date from the document ID
        const times = doc.data().times; // Get the times array from the document data

        // Iterate over each time in the times array
        times.forEach((time) => {
          // Push each appointment date and time combination to the appointments array
          appointments.push({ date, time });
        });
      });

      // Sort the appointments array chronologically by date and time
      appointments.sort((a, b) => {
        // Convert date and time strings to Date objects for comparison
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA - dateB;
      });

      // Populate the recent appointments container with the sorted appointments
      appointments.forEach((appointment) => {
        // Convert the date to its text equivalent (e.g., "April 1, 2024")
        const dateText = formatDateText(appointment.date);
        // Call the addRecentAppointment function with the formatted date text
        addRecentAppointment(dateText, appointment.time);
      });
    })
    .catch((error) => {
      console.error("Error loading recent appointments:", error);
    });
}

// Function to format the date text (e.g., "2024-4-1" to "April 1, 2024")
function formatDateText(date) {
  // Parse the date string into a Date object
  const parsedDate = new Date(date);
  // Get the month, day, and year components
  const month = parsedDate.toLocaleString("en-us", { month: "long" });
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();
  // Format the date text (e.g., "April 1, 2024")
  return `${month} ${day}, ${year}`;
}

// Call loadRecentAppointmentsFromFirestore when the "booking page" tab is clicked
document
  .getElementById("bookingpage")
  .addEventListener("click", loadRecentAppointmentsFromFirestore);

// Function to handle adding appointment time click
document.getElementById("submitAdd").addEventListener("click", function () {
  const appointmentDate = document.getElementById("appointmentDate").value;
  const appointmentTime = document.getElementById("appointmentTime").value;
  addRecentAppointment(appointmentDate, appointmentTime);
});

// WANT TO PUT IN AN EVENT LISTENER ON THE BOOKING MODAL SO IT WILL NOT SUBMIT IF ONE OF THE BUTTONS ARE NOT SELECTED

// Function to add booked appointment to the "Booked Appointments" column
function addBookedAppointment() {
  const bookedAppointmentsContainer = document.getElementById(
    "booked-appointments"
  );
  user = auth.currentUser.email;
  if (user) {
    db.collection("users")
      .doc(user)
      .collection("appointments")
      .get()
      .then((data) => {
        let docs = data.docs;

        let html = ""; // loop through the docs array
        docs.forEach((doc) => {
          if (isAdminUser()) {
            html += `<div class="box" style="text-align: left"><p class="is-size-5">Date: ${
              doc.data().date
            }</p> <p>User: ${doc.data().user}</p><p>Time: ${
              doc.data().time
            }</p><p>Reason: ${
              doc.data().inquiryReason
            }</p><p style="width:300px; word-wrap: break-word;">Comments: ${
              doc.data().comments
            }</p><br><button id="${
              doc.id
            }"class="button is-danger is-size-6 has-text-white has-text-centered">Delete</button></div>`;
          } else {
            html += `<div class="box" style="text-align: left"><p class="is-size-5">Date: ${
              doc.data().date
            }</p><p>Time: ${doc.data().time}</p><p>Reason: ${
              doc.data().inquiryReason
            }</p><p style="width:300px; word-wrap: break-word;">Comments: ${
              doc.data().comments
            }</p><br><button id="${
              doc.id
            }"class="button is-danger is-size-6 has-text-white has-text-centered">Delete</button></div>`;
          }
        });
        bookedAppointmentsContainer.innerHTML = html;
      });
  }
}

document.addEventListener("click", (event) => {
  // Check if the clicked element is a button
  if (event.target.tagName === "BUTTON") {
    // Get the ID of the clicked button
    let buttonId = event.target.id;
    if (isAdminUser()) {
      db.collection("users")
        .doc("peace0mind15@yahoo.com")
        .collection("appointments")
        .doc(buttonId)
        .delete()
        .then(() => {
          db.collection("users")
            .doc(auth.currentUser.email)
            .collection("appointments")
            .doc(buttonId)
            .delete()
            .then(() => {
              addBookedAppointment();
            });
        });
    } else {
      db.collection("users")
        .doc(auth.currentUser.email)
        .collection("appointments")
        .doc(buttonId)
        .delete()
        .then(() => {
          db.collection("users")
            .doc("peace0mind15@yahoo.com")
            .collection("appointments")
            .doc(buttonId)
            .delete()
            .then(() => {
              addBookedAppointment();
            });
        });
    }
  }
});

// Function to close the modal
function closeModal() {
  const bookingModal = document.getElementById("bookingModal");
  if (bookingModal) {
    bookingModal.classList.remove("is-active"); // Hide the modal
  } else {
    console.error("Booking modal with ID 'bookingModal' not found.");
  }
}

function closeAddModal() {
  const addingModal = document.getElementById("addingModal");
  if (addingModal) {
    addingModal.classList.remove("is-active");
  } else {
    console.error("Cannot close modal");
  }
}

// Add event listener to close button of the modal
const closeButton = document.querySelector(".modal-close");
if (closeButton) {
  closeButton.addEventListener("click", closeModal);
} else {
  console.error("Close button for modal not found.");
}

// Add event listener to close button of the add modal
const closeAddButton = document.getElementById("closeaddbtn");
if (closeAddButton) {
  closeAddButton.addEventListener("click", closeAddModal);
} else {
  console.error("Close modal error");
}

// Add event listener to the form submission button
const submitButton = document.querySelector("#bookAppointmentButton");
if (submitButton) {
  submitButton.addEventListener("click", () => {
    closeModal(); // Close the modal after submitting the form
  });
} else {
  console.error("Submit button for booking form not found.");
}

// Event listener - closes modal after add appointment time form is submitted
const submitAdd = document.querySelector("#submitAdd");
if (submitAdd) {
  submitAdd.addEventListener("click", () => {
    closeAddModal();
  });
} else {
  console.error("Submit button for adding form not found.");
}

// Dynamically generate options for appointment time dropdown
var select = document.getElementById("appointmentTime");
for (var hour = 9; hour <= 17; hour++) {
  var hour12 = hour % 12 || 12; // Convert hour to 12-hour format
  var label = hour12 + ":00 " + (hour < 12 ? "AM" : "PM");
  var option = document.createElement("option");
  option.text = label;
  select.add(option);
}

// sending appointment time to firebase
function addAppointmentTime() {
  const appointmentDate = document.getElementById("appointmentDate").value;
  const appointmentTime = document.getElementById("appointmentTime").value;

  // Create a document reference with the appointment date as its ID
  const appointmentRef = db.collection("bookings").doc(appointmentDate);

  // Add the new appointment time to the existing array of times (or create a new array)
  appointmentRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // Document already exists, update the array of times
        const existingTimes = doc.data().times || [];
        existingTimes.push(appointmentTime);
        return appointmentRef.update({
          times: existingTimes,
        });
      } else {
        // Document doesn't exist, create a new one with the array of times
        return appointmentRef.set({
          times: [appointmentTime],
        });
      }
    })
    .then(() => {
      console.log("Appointment added successfully");
      // Show success message
      const successMessage = document.getElementById("successMessage");
      successMessage.textContent = "Appointment added successfully!";
      successMessage.style.display = "block";
      // Optionally, you can close the modal here
      // closeModal(); // Example function to close the modal
    })
    .catch((error) => {
      console.error("Error adding appointment: ", error);
    });
}

document
  .getElementById("submitAdd")
  .addEventListener("click", addAppointmentTime);

// TESTING: FILTERING APPOINTMENTS BY DAY OF WEEK:

document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar-container");
  const calendarCards = document.querySelectorAll(".card-content");

  document
    .getElementById("daySelector")
    .addEventListener("change", function () {
      const selectedDay = this.value;

      // Clear the calendar container before rendering filtered content
      calendarContainer.innerHTML = "";

      calendarCards.forEach((card) => {
        const cardContent = card.querySelector(".DOW").innerText;
        const cardParent = card.parentElement;

        if (cardContent.includes(selectedDay)) {
          const clonedCard = cardParent.cloneNode(true); // Clone the card element
          calendarContainer.appendChild(clonedCard); // Append cloned card to the calendar container

          const bookButton = clonedCard.querySelector(".book-btn");
          if (bookButton) {
            bookButton.addEventListener("click", handleBookingClick); // Add the event listener
          }
        }
      });
    });
});

function handleBookingClick(event) {
  // Check if the user is signed in
  if (!firebase.auth().currentUser) {
    // If not signed in, prevent default action (modal opening)
    event.preventDefault();
    // Prompt the user to sign in
    alert("You must be signed in first to book an appointment.");
    return;
  }

  // If the user is signed in, continue with the booking action
  const card = event.target.closest(".card");
  const date = card.id;
  showModal(date);
}

// JavaScript for burger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

const slides = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let slideIndex = 0;

// Move slides forward
nextBtn.addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.children.length;
  updateSlidePosition();
});

// Move slides backward
prevBtn.addEventListener("click", () => {
  slideIndex =
    (slideIndex - 1 + slides.children.length) % slides.children.length;
  updateSlidePosition();
});

// Update slide position based on slideIndex
function updateSlidePosition() {
  const slideWidth = slides.children[0].offsetWidth;
  slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

// Check if the user is signed in
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in, hide btns
    document.getElementById("signupbtn").style.display = "none"; // Hide the Sign Up button
    document.getElementById("signinbtn").style.display = "none"; // Hide the Sign in button
  } else {
    // No user is signed in
    document.getElementById("signupbtn").style.display = "block"; // Show the Sign Up button
  }
});

//leave a review
document.getElementById("submission").addEventListener("click", async () => {
  // Check if the user is authenticated
  if (!firebase.auth().currentUser) {
    alert("Please sign in before submitting a review.");
    return;
  }

  const name = document.getElementById("name_input").value;
  const review = document.getElementById("review_input").value;
  const rating = document.getElementById("rating").value;
  const email_review = auth.currentUser.email; // Check if the name and review fields are not empty

  if (name.trim() === "" || review.trim() === "") {
    alert("Name and review cannot be empty.");
    return;
  } // Save the review to Firestore

  await db.collection("reviews").add({
    name,
    review,
    rating,
    email_review,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  }); // Clear the input fields

  document.getElementById("name_input").value = "";
  document.getElementById("review_input").value = ""; // Display a success message or update the UI

  alert("Review submitted successfully!");
  show_reviews();
});

// Event listener for the "Leave a Review" tab
r_e("leaveareviewpage").addEventListener("click", async () => {
  show_reviews();
});

r_e("bookingpage").addEventListener("click", async () => {
  addBookedAppointment();
});
auth.onAuthStateChanged((user) => {
  if (user) {
    // show reviews
    show_reviews();
    addBookedAppointment();
  } else {
    r_e(
      "leaveareview_reviews-container"
    ).innerHTML = `<p class="is-size-5 has-text-centered has-text-danger">Please sign in to read reviews!</p>`;
    r_e(
      "booked-appointments"
    ).innerHTML = `<p class="is-size-5 has-text-centered has-text-danger">Please sign in to view bookings!</p>`;
  }
});

let currentPage = 1;
const reviewsPerPage = 5;

function show_reviews() {
  db.collection("reviews")
    .get()
    .then((data) => {
      let docs = data.docs;
      const totalPages = Math.ceil(docs.length / reviewsPerPage);

      let startIndex = (currentPage - 1) * reviewsPerPage;
      let endIndex = startIndex + reviewsPerPage;
      let currentPageReviews = docs.slice(startIndex, endIndex);

      let html = "";
      currentPageReviews.forEach((doc) => {
        let stars = doc.data().rating;
        let ids = doc.id;
        let num = "";
        for (i = 0; i < stars; i++) {
          num += `<a href="">
      <i class="fa-solid fa-star fa-2xl" style="color: #f3d512"></i>
    </a>`;
        }

        if (
          auth.currentUser.email == doc.data().email_review ||
          isAdminUser()
        ) {
          html += `<div class="box"><h1 class="is-size-5">${
            doc.data().review
          }</h1>
            <p>${doc.data().name}</p> &nbsp;
            <div>${num}</div> &nbsp; <div><button id="${
            doc.id
          }" class="is-white">Delete</button></div>
          </div>`;
        } else {
          html += `<div class="box"><h1 class="is-size-5">${
            doc.data().review
          }</h1>
            <p>${doc.data().name}</p> &nbsp;
            <div>${num}</div> &nbsp; </div>`;
        }
      });

      // Add pagination controls
      html += `<div class="pagination">`;
      if (currentPage > 1) {
        html += `<button onclick="prevPage()">Previous</button>`;
      }
      if (currentPage < totalPages) {
        html += `<button onclick="nextPage()">Next</button>`;
      }
      html += `</div>`;

      r_e("leaveareview_reviews-container").innerHTML = html;
    });
}

function nextPage() {
  currentPage++;
  show_reviews();
}

function prevPage() {
  currentPage--;
  show_reviews();
}

document.addEventListener("click", (event) => {
  // Check if the clicked element is a button
  if (event.target.tagName === "BUTTON") {
    // Get the ID of the clicked button
    let buttonId = event.target.id;
    db.collection("reviews")
      .doc(buttonId)
      .delete()
      .then(() => {
        show_reviews();
      });
  }
});
