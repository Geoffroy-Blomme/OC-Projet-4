function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close modal event 
modalCloseBtn.addEventListener("click",closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal(){
  modalbg.style.display="none";
}

// returns true and call the checkSuceeded function if name is valid,  returns false and call the checkFailed function  if it isn't
function checkIfNameValid(name,errorMsg){
  // we first check if name is at least of length 2
  if(name.value.length >= 2){
    // we check that neither the first nor the second character is a space
    if((name.value.charAt(0) != " ") && (name.value.charAt(1) != " ")){
      checkSucceeded(name);
      return true;
    }
  }
  else{
    //if one of the requirements isn't met, we end up here
    checkFailed(name,errorMsg);
    return false;
  }
  
}


// return true and call the checkSuceeded function if email is valid,  returns false and call the checkFailed functionif it isn't
function checkEmail(email){
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(regex.test(email.value)){
    checkSucceeded(email);
    return true;
  }

  // If the email is incorrect
  else{
    checkFailed(email,"Veuillez indiquer une addresse mail correcte");
    return false;
  }
}

// When the check failed, add the data-error attribute with the errorMsg as value to the element's parent, as well as the data-error-visible with value true.
function checkFailed(element, errorMsg){
  let parent = element.parentElement;
  parent.setAttribute("data-error",errorMsg);
  parent.setAttribute("data-error-visible","true");
}

//if the check succeeded, we make the element's parent' data error unvisible
function checkSucceeded(element){
  let parent = element.parentElement;
  parent.setAttribute("data-error-visible","false");
}