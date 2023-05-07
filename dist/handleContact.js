
const close = document.querySelector(".close");
const contactMe = document.getElementById("contactMePopUp");
const contactButton = document.getElementById("contactButton");
const email = document.getElementById("email");
const message = document.getElementById("message");
const contactForm = document.getElementById("contact-form");
const sendButton = document.getElementById("send-button");

function sendEmail() {
    Email.send({
        SecureToken : "e0a4b71c-ced3-4297-9952-420466aa22c1",
        To : '70raquib@gmail.com',
        From : '1vancedtube1@gmail.com',
        Subject : "Message from : "+ email.value,
        Body :  " <br>  Email : " + email.value + "<br> "+ message.value
    }).then(
      message => alert(message)
    );
}

close.addEventListener("click", () => {
  contactMe.classList.add("hidden");
  contactMe.classList.remove("flex");
  email.value = "";
  message.value = "";
})

sendButton.addEventListener("click", () => {
  if(email.value != "" && message.value != ""){
    contactMe.classList.add("hidden");
    contactMe.classList.remove("flex");
  }
})

contactMe.addEventListener("click", (event) => {
  if(!contactForm.contains(event.target)){
  contactMe.classList.add("hidden");
  contactMe.classList.remove("flex");
  email.value = "";
  message.value = "";
}
})

contactButton.addEventListener("click", () => {
  contactMe.classList.add("flex");
  contactMe.classList.remove("hidden");
})

window.alert = function() {
  console.log("hi alert given");
};