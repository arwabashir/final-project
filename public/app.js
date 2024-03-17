function r_e(id) {
  return document.querySelector(`#${id}`);
}

// let s1 = document.querySelector("#Signup");

// s1.addEventListener("click", () => {
//   document.getElementById("myModal").classList.add("is-active");
// });

// let s2 = document.querySelector("#Login");

// s2.addEventListener("click", () => {
//   document.getElementById("myModal2").classList.add("is-active");
// });

// let logout = document.querySelector("#Logout");

// logout.addEventListener("click", () => {
//   auth.signOut().then(() => {
//     document.querySelector("#Login").classList.remove("is-hidden");
//     logout.classList.add("is-hidden");
//     alert("You are now logged out!");
//   });
// });

// let s3 = document.querySelector("#Cancel");

// s3.addEventListener("click", () => {
//   document.getElementById("myModal").classList.remove("is-active");
// });

// let s4 = document.querySelector("#Cancel2");

// s4.addEventListener("click", () => {
//   document.getElementById("myModal2").classList.remove("is-active");
// });

// r_e("submit").addEventListener("click", () => {
//   // 1. Collect the email/password combination from the input fields

//   let email = r_e("email").value;
//   let pass = r_e("pass").value;

//   // 2. send the email/password to firestore

//   auth.createUserWithEmailAndPassword(email, pass).then(() => {
//     // console.log("New user created");
//     // clear the input fields
//     r_e("email").value = "";
//     r_e("pass").value = "";

//     document.querySelector("#Logout").classList.remove("is-hidden");
//     document.querySelector("#Login").classList.add("is-hidden");

//     // close the modal
//     document.getElementById("myModal").classList.remove("is-active");
//     alert("You have signed up for Film Fusion!");
//   });
// });

// r_e("submit2").addEventListener("click", () => {
//   // 1. Collect the email/password combination from the input fields

//   let email2 = r_e("email2").value;
//   let pass2 = r_e("pass2").value;

//   // 2. send the email/passwrod to firestore

//   auth.signInWithEmailAndPassword(email2, pass2).then(() => {
//     // clear the input fields
//     r_e("email2").value = "";
//     r_e("pass2").value = "";

//     document.querySelector("#Logout").classList.remove("is-hidden");
//     document.querySelector("#Login").classList.add("is-hidden");
//     // close the modal
//     document.getElementById("myModal2").classList.remove("is-active");
//     alert("You are now signed in: " + email2);
//   });
// });


//about us page click event
r_e("aboutuspage").addEventListener("click", () => {
  r_e("mainpage").classList.add("is-hidden");
  r_e("aboutus").classList.remove("is-hidden");
  r_e("ourservices").classList.add("is-hidden");
  r_e("booking").classList.add("is-hidden");
  r_e("leaveareview").classList.add("is-hidden");
;});

//homepage page click event
r_e("homepage").addEventListener("click", () => {
  r_e("mainpage").classList.remove("is-hidden");
  r_e("aboutus").classList.add("is-hidden");
  r_e("ourservices").classList.add("is-hidden");
  r_e("booking").classList.add("is-hidden");
  r_e("leaveareview").classList.add("is-hidden");
;});

//our services page click event
r_e("ourservicespage").addEventListener("click", () => {
  r_e("mainpage").classList.add("is-hidden");
  r_e("aboutus").classList.add("is-hidden");
  r_e("ourservices").classList.remove("is-hidden");
  r_e("booking").classList.add("is-hidden");
  r_e("leaveareview").classList.add("is-hidden");
;});

//booking page click event
r_e("bookingpage").addEventListener("click", () => {
  r_e("mainpage").classList.add("is-hidden");
  r_e("aboutus").classList.add("is-hidden");
  r_e("ourservices").classList.add("is-hidden");
  r_e("booking").classList.remove("is-hidden");
  r_e("leaveareview").classList.add("is-hidden");
;});

//leave a review page click event
r_e("leaveareviewpage").addEventListener("click", () => {
  r_e("mainpage").classList.add("is-hidden");
  r_e("aboutus").classList.add("is-hidden");
  r_e("ourservices").classList.add("is-hidden");
  r_e("booking").classList.add("is-hidden");
  r_e("leaveareview").classList.remove("is-hidden");
;});