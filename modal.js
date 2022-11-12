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
const submitBtn = document.querySelector(".btn-submit");
const modalForm = document.querySelector(".modal-body form");
const formSent = document.querySelector(".form-sent");
const formSentText = document.querySelector(".form-sent__text");
const formSentCloseButton = document.querySelector(".btn-submit--close");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const dateOfBirth = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const locationBtns = document.querySelectorAll(".location-checkbot");
const checkBoxTermsOfUse = document.querySelector("#checkbox1");
const allInputs = document.querySelectorAll(".formData input");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
modalCloseBtn.addEventListener("click",closeModal);
formSentCloseButton.addEventListener("click",closeModal);

// prevents the brower's box to appear when the input is invalid
allInputs.forEach(element => {
  element.addEventListener( "invalid",
  function( event ) {
      event.preventDefault();
  });
});


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal(){
  modalbg.style.display="none";
  // If we close the modal, we want the inputs to be reset
  resetAllInputs();
}


// resets all the inputs
function resetAllInputs(){
  allInputs.forEach(input => {
    let parent = input.parentElement;
    parent.setAttribute("data-error-visible","false");

    input.value="";
  });
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

// return true and call the checkSuceeded function if email is valid,  returns false and call the checkFailed function if it isn't
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

// return true and call the checkSuceeded function if the date of birth is correct, returns false and call the checkFailed function if is incorrect
function checkDateOfBirth(dateOfBirth){
  let reg = /\d{4}-\d{1,2}-\d{1,2}/;
  // xxxx-xx-xx, xxxx-x-xx, xxxx-xx-x and xxxx-x-x will be accepted with x being a number from 0 to 9
  if(reg.test(dateOfBirth.value)){
    checkSucceeded(dateOfBirth);
    return true;
  }
  else{
    checkFailed(dateOfBirth,"Veuillez indiquer votre date de naissance.");
    return false;
  }
}


// return true and call the checkSuceeded function if quantity is a number,  returns false and call the checkFailed function  if it isn't
function checkIfNumber(quantity){
  if((!isNaN(quantity.value)) && (quantity.value!=="") && (quantity.value <= 99) && (quantity.value >= 0)){
      checkSucceeded(quantity);
      return true;
  }
  else{
    checkFailed(quantity,"Veuillez indiquer un nombre compris entre 0 et 99");
    return false;
  }
}

// returns true and call the checkSuceeded function if at least one checkbox is checked,  returns false and call the checkFailed function if none is checked
function checkIfAtLeastOneCheck(inputs){
  for(let i = 0; i < inputs.length; i++){
    if(inputs[i].checked){
      checkSucceeded(inputs[0]);
      return true;
    }

  }
  checkFailed(inputs[0],"Veuillez choisir une location");
  return false;
}

// return true and call the checkSuceeded function if the terms of use's checkbox is checked, returns false otherwise.
function termsOfUseAccepted(checkBoxTermsOfUse){
  if(checkBoxTermsOfUse.checked){
    checkSucceeded(checkBoxTermsOfUse);
    return true;
  }
  else{
    checkFailed(checkBoxTermsOfUse,"Veuillez accepter les conditions d'utilisation");
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

// return True if all the data of the modal form is correct, wrong if at least one isn't
function checkIfAllGood(){
  return  checkIfNameValid(firstName,"Votre Prénom doit contenir au moins deux lettres")
  & checkIfNameValid(lastName,"Votre Nom doit contenir au moins deux lettres")
  & checkEmail(email)
  & checkDateOfBirth(dateOfBirth)
  & checkIfNumber(quantity)
  & checkIfAtLeastOneCheck(locationBtns)
  & termsOfUseAccepted(checkBoxTermsOfUse);
}

// Changes the content of the modal to show the content when the form is sent.
function modalChangeContent(){
  //We start by getting the dimension of the form.
  let modalFormWidth = modalForm.offsetWidth;
  let modalFormHeight = modalForm.offsetHeight;
  modalForm.style.display="none";
  
  formSent.style.width = modalFormWidth + "px";
  formSent.style.height = modalFormHeight + "px";
  formSent.style.display="flex";
  formSentText.style.marginTop = (modalFormHeight/2) + "px";

}

// If the data of the form are correct, changes the content of the modal.
function validate(){
  if(checkIfAllGood()){
    modalChangeContent();
  }
  
}