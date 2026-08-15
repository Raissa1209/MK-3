/* =========================================
   LOGIN JAVASCRIPT
========================================= */

const loginForm = document.querySelector("form");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberInput = document.getElementById("remember");

const loginButton = document.querySelector(".login-button");

const registerLink = document.querySelector(".register-section a");
const forgotPasswordLink = document.querySelector(".password-heading a");



/* =========================================
   MEMBUAT ELEMENT PESAN
========================================= */

function createMessage(className) {

    let message = document.querySelector(`.${className}`);

    if (!message) {

        message = document.createElement("div");

        message.className = className;

    }

    return message;
}



/* =========================================
   PESAN ERROR
========================================= */

function showError(input, messageText) {

    const formGroup = input.closest(".form-group");

    let errorMessage = formGroup.querySelector(".error-message");

    if (!errorMessage) {

        errorMessage = document.createElement("span");

        errorMessage.className = "error-message";

        formGroup.appendChild(errorMessage);
    }

    errorMessage.textContent = messageText;

    input.closest(".input-wrapper").classList.add("input-error");
}



/* =========================================
   HAPUS ERROR
========================================= */

function removeError(input) {

    const formGroup = input.closest(".form-group");

    const errorMessage =
        formGroup.querySelector(".error-message");

    if (errorMessage) {
        errorMessage.remove();
    }

    input
        .closest(".input-wrapper")
        .classList.remove("input-error");
}



/* =========================================
   VALIDASI EMAIL
========================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}



/* =========================================
   VALIDASI FORM
========================================= */

function validateForm() {

    let isValid = true;

    const email = emailInput.value.trim();

    const password = passwordInput.value.trim();



    /* EMAIL */

    if (email === "") {

        showError(
            emailInput,
            "Email wajib diisi."
        );

        isValid = false;

    } else if (!isValidEmail(email)) {

        showError(
            emailInput,
            "Masukkan alamat email yang valid."
        );

        isValid = false;

    } else {

        removeError(emailInput);
    }



    /* PASSWORD */

    if (password === "") {

        showError(
            passwordInput,
            "Password wajib diisi."
        );

        isValid = false;

    } else if (password.length < 6) {

        showError(
            passwordInput,
            "Password minimal 6 karakter."
        );

        isValid = false;

    } else {

        removeError(passwordInput);
    }



    return isValid;
}



/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* Jalankan validasi */

    if (!validateForm()) {
        return;
    }


    const email = emailInput.value.trim();

    const password = passwordInput.value.trim();



    /* Simpan email jika "Ingat saya" dicentang */

    if (rememberInput.checked) {

        localStorage.setItem(
            "rememberedEmail",
            email
        );

    } else {

        localStorage.removeItem(
            "rememberedEmail"
        );
    }



    /* Loading */

    const originalButton = loginButton.innerHTML;

    loginButton.disabled = true;

    loginButton.innerHTML = `
        <span>Memproses...</span>
    `;



    /*
       Simulasi proses login.
       Nanti bagian ini bisa diganti
       dengan database/backend.
    */

    setTimeout(function () {

        loginButton.disabled = false;

        loginButton.innerHTML = originalButton;



        /* Pesan sukses */

        showSuccess(
            "Login berhasil! Selamat datang kembali."
        );

    }, 1200);

});



/* =========================================
   PESAN SUKSES
========================================= */

function showSuccess(messageText) {

    let successMessage =
        document.querySelector(".success-message");

    if (successMessage) {
        successMessage.remove();
    }


    successMessage =
        document.createElement("div");

    successMessage.className =
        "success-message";

    successMessage.textContent =
        messageText;


    loginForm.insertBefore(
        successMessage,
        loginForm.firstChild
    );


    setTimeout(function () {

        successMessage.remove();

    }, 4000);
}



/* =========================================
   VALIDASI LANGSUNG SAAT DIKETIK
========================================= */

emailInput.addEventListener("input", function () {

    if (emailInput.value.trim() !== "") {

        removeError(emailInput);
    }

});


passwordInput.addEventListener("input", function () {

    if (passwordInput.value.trim() !== "") {

        removeError(passwordInput);
    }

});



/* =========================================
   INGAT EMAIL
========================================= */

window.addEventListener("DOMContentLoaded", function () {

    const rememberedEmail =
        localStorage.getItem("rememberedEmail");


    if (rememberedEmail) {

        emailInput.value =
            rememberedEmail;

        rememberInput.checked = true;
    }

});



/* =========================================
   LUPA PASSWORD
========================================= */

forgotPasswordLink.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        showInfo(
            "Fitur lupa password akan tersedia setelah sistem akun terhubung."
        );

    }
);



/* =========================================
   DAFTAR SEKARANG
========================================= */

registerLink.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        showInfo(
            "Halaman pendaftaran akan dibuat pada tahap berikutnya."
        );

    }
);



/* =========================================
   PESAN INFORMASI
========================================= */

function showInfo(messageText) {

    let infoMessage =
        document.querySelector(".info-message");

    if (infoMessage) {
        infoMessage.remove();
    }


    infoMessage =
        document.createElement("div");

    infoMessage.className =
        "info-message";

    infoMessage.textContent =
        messageText;


    loginForm.insertBefore(
        infoMessage,
        loginForm.firstChild
    );


    setTimeout(function () {

        infoMessage.remove();

    }, 4000);
}