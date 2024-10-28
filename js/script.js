'use strict';

/**
 *  random aritmetic questions anti spam
 */

// Function to generate a random arithmetic question
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  const operation = Math.random();
  
  let question, correctAnswer;
  
  if (operation < 0.33) { // 33% chance for addition
      question = `What is ${num1} + ${num2}?`;
      correctAnswer = num1 + num2;
  } else if (operation < 0.66) { // 33% chance for multiplication
      question = `What is ${num1} * ${num2}?`;
      correctAnswer = num1 * num2;
  } else { // 34% chance for division (avoiding zero)
      question = `What is ${num1 * num2} / ${num2}?`;
      correctAnswer = num1; // The answer will always be num1
  }
  
  return { question, correctAnswer };
}


/**
 * add event on element
 */
document.getElementById("quote").addEventListener("submit", function(event){
  event.preventDefault();


  const form = event.target;
  const formData = new FormData(form);
  try{
    const { question, correctAnswer } = generateQuestion();
    const userAnswer = prompt(question); // Prompt user with the question
    if (parseInt(userAnswer, 10) === correctAnswer) {
      console.log("Correct answer! Form submitted.");
      sbform(formData)
  } else {
      alert("Incorrect answer. Please try again.");
  }
    
  } 
  catch{
    console.error('something went wrong..')
  }
});

async function sbform(formdata){
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'post',
      body: formdata,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Redirect to home page after successful submission
      console.log('ok') 
      // document.getElementById("nameInput").value = '';
      //   document.getElementById("emailInput").value = '';
      //   document.getElementById("phoneInput").value ='';
      //   document.getElementById("categoryInput").value = '';
      //   document.getElementById("dateInput").value = '';
        document.getElementById("messageInput").value = ''
        console.log(response.body);
        alert(`Your request for a quote was submitter sucessfully`)
    } else {
      // Handle errors here
      console.error('Error submitting form:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}


const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
   // console.log(`false-${elem}`)
  }
}



/**
 * navbar toggle
 */

/**a
 * attribute selector
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = () => navbar.classList.toggle("active");

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = () => navbar.classList.remove("active");

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header & back top btn active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);



/**
 * filter function
 */

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedFilterBtn = filterBtns[0];

const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (this.dataset.filterBtn === filterItems[i].dataset.filter ||
      this.dataset.filterBtn === "all") {

      filterItems[i].style.display = "block";
      filterItems[i].classList.add("active");

    } else {

      filterItems[i].style.display = "none";
      filterItems[i].classList.remove("active");

    }
  }
}

addEventOnElem(filterBtns, "click", filter);

/**
 * add item to quote form function
 */
const products = document.getElementsByClassName("products");

for (let i = 0; i < products.length; i++) {
  products[i].addEventListener("click", (event) => {
    const element = event.target;
    console.log(element);

    const txtarea = document.getElementById("messageInput");
    txtarea.value += " "+ element.id+", "; // Set the value correctly
  });
}