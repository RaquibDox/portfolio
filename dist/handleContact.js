
const close = document.querySelector(".close");
const contactMe = document.getElementById("contactMePopUp");
const contactButton = document.getElementById("contactButton");
const email = document.getElementById("email");
const message = document.getElementById("message");
const contactForm = document.getElementById("contact-form");
const sendButton = document.getElementById("send-button");

function sendEmail() {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "1vancedtube1@gmail.com",
        Password : "878AF959284BF23157D377CCBA1722E4DE93",
        To : '70raquib@gmail.com',
        From : '1vancedtube1@gmail.com',
        Subject : "New Contact from Enquiry",
        Body : "And this is the body :" +" <br>  Email : " + email.value + "<br> "+ message.value
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
    email.value = "";
    message.value = "";
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