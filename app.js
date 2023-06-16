// =========================== sticky navbar ====================

let nav =document.querySelector('nav');
let scrollbtn = document.querySelector(".scroll-button a");

let val;
window.onscroll = function(){
    if(document.documentElement.scrollTop > 20){
        nav.classList.add("sticky");
        scrollbtn.style.display = "block";
    }else {
        nav.classList.remove("sticky");
        scrollbtn.style.display = "none";
    }
}


// Side navigation Menu Js -------------------------------

let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

menuBtn.onclick = function(){
    navBar.classList.add("active");
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    body.style.overflowX = "hidden";
    scrollbtn.style.pointerEvents = "none";

};
cancelBtn.onclick = function(){
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    body.style.overflowX = "auto";
    scrollbtn.style.pointerEvents = "auto";

};

// Side navigation bar close while we click on its link

let navLinks = document.querySelectorAll(".menu li a");
for(var i=0; i<navLinks.length; i++){
    navLinks[i].addEventListener("click", function(){
        navBar.classList.remove("active");
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
    });
}
// header.classList.toggle('sticky', window.scrollY > 100);

// ----------------------- About Section --------------------------

const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")
}
// --------------------- PROJECTS SECTION ---------------------------


/*------------------ Contact Form ----------------------------- */
document.addEventListener("DOMContentLoaded", function (){
    const email = {
        email: "",
        subject: "",
        message: "",
    };
    const inputEmail = document.querySelector("#email");
    const inputSubject = document.querySelector("#subject");
    const inputMessage = document.querySelector("#message");
    const form = document.querySelector("#form");
    const btnSubmit = document.querySelector('#form button[type="submit"]');
    const btnReset = document.querySelector('#form button[type="reset"]');
    // const spinner = document.querySelector("#spinn")

    inputEmail.addEventListener("input", validate)
    inputSubject.addEventListener("input", validate)
    inputMessage.addEventListener("input", validate)

    form.addEventListener("submit", sendEmail);

    btnReset.addEventListener("click", function(e){
        e.preventDefault();
        resetForm();
    })

    function sendEmail(e){
        e.preventDefault();

        // spinner.classList.remove("hideSpinner");

        setTimeout(() => {
            // spinner.classList.add("hideSpinner");

            resetForm();

            const alertSucces = document.createElement("p");
            alertSucces.textContent = "Message Sent";
            alertSucces.classList.add("messageSent");

            form.appendChild(alertSucces);

            setTimeout(() => {
                alertSucces.remove();
            }, 3000);
        }, 3000);
    }

    function validate (e){
        if(e.target.value.trim() === ""){
            showAlert(
                `⚠️ This field ${e.target.id} is required`,
                e.target.parentElement
            );
            email[e.target.name] = "";
            checkEmail();
            return;
        }

        if(e.target.id === "email" && !validateEmail(e.target.value)){
            showAlert("⚠️ The email is not valid", e.target.parentElement);
            email[e.target.name] = "";
            checkEmail()
            return;
        }

        cleanAlert(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();

        checkEmail();
    }

    function showAlert(message, reference){
        cleanAlert(reference);

        const error = document.createElement("P");
        error.textContent = message;
        error.classList.add("error-form");

        reference.appendChild(error);
    }

    function cleanAlert(reference){
        const alert =reference.querySelector(".error-form");
        if(alert){
            alert.remove();
        }
    }

    function validateEmail(email){
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const result = regex.test(email);
        return result;
    }

    function checkEmail(){
        if(Object.values(email).includes("")){
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.disabled = false;
    }

    function resetForm(){
        email.email = "";
        email.subject = "";
        email.message = "";

        form.reset();
        checkEmail()
    }
})