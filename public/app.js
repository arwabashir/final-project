document.addEventListener("DOMContentLoaded", function () {
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const ourServicesBtn = document.getElementById("ourServicesBtn");
  const mainPage = document.getElementById("mainpage");
  const aboutUsPage = document.getElementById("aboutus");
  const ourServicesPage = document.getElementById("ourservices");

  // Function to show the main page and hide other sections
  function showMainPage() {
    mainPage.classList.remove("is-hidden");
    aboutUsPage.classList.add("is-hidden");
    ourServicesPage.classList.add("is-hidden");
  }

  // Function to show the about us page and hide other sections
  function showAboutUsPage() {
    mainPage.classList.add("is-hidden");
    aboutUsPage.classList.remove("is-hidden");
    ourServicesPage.classList.add("is-hidden");
  }

  // Function to show the our services page and hide other sections
  function showOurServicesPage() {
    mainPage.classList.add("is-hidden");
    aboutUsPage.classList.add("is-hidden");
    ourServicesPage.classList.remove("is-hidden");
  }

  // Add event listeners to buttons
  learnMoreBtn.addEventListener("click", showAboutUsPage);
  ourServicesBtn.addEventListener("click", showOurServicesPage);
});

function r_e(id) {
  return document.querySelector(`#${id}`);
}

let s1 = document.querySelector("#signupbtn");

s1.addEventListener("click", () => {
  document.getElementById("myModal").classList.add("is-active");
});

let s2 = document.querySelector("#signinbtn");

s2.addEventListener("click", () => {
  document.getElementById("myModal2").classList.add("is-active");
});

let signout = document.querySelector("#signoutbtn");

signout.addEventListener("click", () => {
  auth.signOut().then(() => {
    document.querySelector("#signoutbtn").classList.add("is-hidden");
    document.querySelector("#signinbtn").classList.remove("is-hidden");
    alert("You are now signed out!");
  });
});

let s3 = document.querySelector("#Cancel");

s3.addEventListener("click", () => {
  document.getElementById("myModal").classList.remove("is-active");
});

let s4 = document.querySelector("#Cancel2");

s4.addEventListener("click", () => {
  document.getElementById("myModal2").classList.remove("is-active");
});

r_e("submit").addEventListener("click", () => {
  // 1. Collect the email/password combination from the input fields

  let email = r_e("email").value;
  let pass = r_e("pass").value;

  // 2. send the email/password to firestore

  auth
    .createUserWithEmailAndPassword(email, pass)
    .then(() => {
      // clear the input fields
      r_e("email").value = "";
      r_e("pass").value = "";

      document.querySelector("#signoutbtn").classList.add("is-hidden");
      // close the modal
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

r_e("submit2").addEventListener("click", () => {
  // 1. Collect the email/password combination from the input fields

  let email2 = r_e("email2").value;
  let pass2 = r_e("pass2").value;

  // 2. send the email/passwrod to firestore

  auth.signInWithEmailAndPassword(email2, pass2).then(() => {
    // clear the input fields
    r_e("email2").value = "";
    r_e("pass2").value = "";

    document.querySelector("#signoutbtn").classList.remove("is-hidden");
    document.querySelector("#signinbtn").classList.add("is-hidden");
    // close the modal
    document.getElementById("myModal2").classList.remove("is-active");
    alert("You are now signed in: " + email2);
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

//testing out review page
r_e("leaveareviewpage").addEventListener("click", () => {
  r_e("content").classList.add("is-hidden");
  r_e("rating_form").classList.remove("is-hidden");
  hide_search();
});

// pulling content from reviews collection in firebase
// let review_content = r_e("content");
// r_e("review_page").addEventListener("click", () => {
//   r_e("search_feature").classList.remove("is-hidden");
//   show_content();
//   show_reviews();
// });

// // FIX THIS CODE
// r_e("search_btn").addEventListener("click", () => {
//   // find the search term entered by user
//   let term = r_e("search_name").value;
//   // find all reviews with a course title matching the term
//   search_courses("user_name", term);
//   r_e("search_name").value = "";
// });

// r_e("allreviews").addEventListener("click", () => {
//   review_content.innerHTML = "";
//   show_reviews();
// });

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

function renderCalendar(year, month) {
  // console.log(year, month);
  // const today = new Date();
  // const currentMonth = today.getMonth();
  // const currentYear = today.getFullYear();
  // document.getElementById("monthSelector").value = currentMonth.toString();
  const calendarContainer = document.getElementById("calendar-container");
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the day of the week for the first day of the month

  let calendarHTML = `
  <h2 class="title is-3 has-text-left">${monthNames[month]} ${year}</h2>
  <div id="calendar" class="box">
  <div class="columns is-multiline">
`;

  for (let day = 1; day <= daysInMonth; day++) {
    const dateId = `${year}-${month + 1}-${day}`;
    const dayOfWeek = dayNames[(firstDayOfMonth + day - 1) % 7]; // Calculate the day of the week for the current day
    calendarHTML += `
    <div class="column is-one-third">
    <div class="card" id="${dateId}">
    <div class="card-content">
    <p class="title is-4">${monthNames[month]} ${day}</p>
    <p class= "DOW" class="title is-7">${dayOfWeek}</p>  
    <button class="button is-primary is-fullwidth book-btn">Book</button>
    </div>
    </div>
    </div>
    `;
  }

  // Close the calendar HTML
  calendarHTML += `
      </div>
    </div>
  `;

  // Render the calendar HTML
  calendarContainer.innerHTML = calendarHTML;
  attachBookingListeners();
}

// Add event listeners to the buttons
// const bookButtons = document.querySelectorAll(".book-btn");
// bookButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const card = button.closest(".card");
//     const date = card.id;
//     showModal();
//   });
// });
// // Handling the form submission
// document
//   .getElementById("bookingForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // Perform the booking operation here, using the information from the form // For example, you could send this information to a server
//     alert(
//       "Appointment booked for " + document.getElementById("bookingDate").value
//     );
//     closeModal(); // Close the modal after submission
//   });

document
  .getElementById("monthSelector")
  .addEventListener("change", function () {
    const selectedMonth = parseInt(this.value);
    const year = new Date().getFullYear();
    renderCalendar(year, selectedMonth);
  });

// Separate function to attach event listeners to booking buttons
function attachBookingListeners() {
  const bookButtons = document.querySelectorAll(".book-btn");
  bookButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const date = card.id;
      showModal(date);
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

// Function to show the booking modal and add the booked appointment to the "Booked Appointments" column
function showModal(date) {
  const bookingModal = document.getElementById("bookingModal");
  if (bookingModal) {
    bookingModal.classList.add("is-active"); // Show the modal
    const bookingDateInput = document.getElementById("bookingDate");
    if (bookingDateInput) {
      bookingDateInput.value = date; // Set the selected date in the modal
      // Add the booked appointment to the "Booked Appointments" column
      addBookedAppointment(date);
    } else {
      console.error("Input field with ID 'bookingDate' not found.");
    }
  } else {
    console.error("Booking modal with ID 'bookingModal' not found.");
  }
}

// Function to add booked appointment to the "Booked Appointments" column
function addBookedAppointment(date) {
  const bookedAppointmentsContainer = document.getElementById(
    "booked-appointments"
  );
  const appointmentElement = document.createElement("div");
  appointmentElement.textContent = date;
  bookedAppointmentsContainer.appendChild(appointmentElement);
}

// Function to close the modal
function closeModal() {
  const bookingModal = document.getElementById("bookingModal");
  if (bookingModal) {
    bookingModal.classList.remove("is-active"); // Hide the modal
  } else {
    console.error("Booking modal with ID 'bookingModal' not found.");
  }
}

// Add event listener to close button of the modal
const closeButton = document.querySelector(".modal-close");
if (closeButton) {
  closeButton.addEventListener("click", closeModal);
} else {
  console.error("Close button for modal not found.");
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

// TESTING: FILTERING APPOINTMENTS BY DAY OF WEEK:
document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the day of the week selector
  document
    .getElementById("daySelector")
    .addEventListener("change", function () {
      // Get the selected day of the week
      const selectedDay = this.value;

      // Get all calendar cards
      const calendarCards = document.querySelectorAll(".card-content");

      // tracking cards to display and hide
      const cardsToDisplay = [];
      const cardsToHide = [];

      // Iterate over each card and toggle visibility based on selected day
      calendarCards.forEach((card) => {
        const cardContent = card.querySelector(".DOW").innerText; // Get the card's content

        if (cardContent.includes(selectedDay)) {
          cardsToDisplay.push(card); // Add to cards to display
        } else {
          cardsToHide.push(card); // Add to cards to hide
        }
      });

      const calendarContainer = document.getElementById("calendar");
      cardsToDisplay.forEach((card) => {
        calendarContainer.prepend(card);
        card.style.display = "block";
      });

      cardsToHide.forEach((card) => {
        card.style.display = "none";
      });

      // Toggle card visibility based on whether the card's content contains the selected day
      // if (cardContent.includes(selectedDay)) {
      // card.style.display = "block"; // Show the card
      // } else {
      // card.style.display = "none"; // Hide the card
      // }
    });
});

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
    // User is signed in
    document.getElementById("signupbtn").style.display = "none"; // Hide the Sign Up button
  } else {
    // No user is signed in
    document.getElementById("signupbtn").style.display = "block"; // Show the Sign Up button
  }
});
