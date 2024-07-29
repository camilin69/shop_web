const login = document.getElementById("login");
const logged = document.getElementById("logged");
const registerF = document.getElementById("registerF");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

passwordError.style.display = "none";
emailError.style.display = "none";
logged.style.display = "none";
registerF.style.display = "none";

function showError(errorElement) {
    errorElement.style.display = "block";
    errorElement.classList.remove("fade-out");

    setTimeout(() => {
        errorElement.classList.add("fade-out");
    }, 2000);

    setTimeout(() => {
        errorElement.style.display = "none";
    }, 5000);
}

function logIn() {

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    doGet(email, password)
}

function register() {
    const name = document.getElementById("reg_name").value;
    const id = document.getElementById("reg_id").value;
    const emailN = document.getElementById("reg_email").value;
    const passwordN = document.getElementById("reg_password").value;

    if (emailN && passwordN && name && id) {
        doPost()
    } else {
        alert("Please fill out both fields");
    }
}

function doGet(email, password){

    const xhr = new XMLHttpRequest()
    xhr.open("GET","shop-server",true)
    xhr.onreadystatechange = ()=>{
        if( xhr.readyState === 4 && xhr.status === 200){
            const users = JSON.parse(xhr.responseText);
            let userFound = false;

            users.forEach(u => {

                if (u.email === email) {
                    userFound = true;
                    if (u.password === password) {
                        login.style.display = "none";
                        logged.style.display = "block";
                        displayUsers(users)
                    } else {
                        showError(passwordError);
                    }
                }
            });
            if (!userFound) {
                showError(emailError);
            }

        }
    }

    xhr.send()
}

function displayUsers(users) {
    const userList = document.getElementById("logged");
    const existingUsers = userList.querySelectorAll(".user");
    existingUsers.forEach(user => user.remove());

    const headerOld = userList.querySelectorAll(".user-header");
    headerOld.forEach(user => user.remove());

    const headerRow = document.createElement("div");
    headerRow.classList.add("row", "user-header");

    const headers = ["ID", "Name", "Password", "Email", "Phone"];
    headers.forEach(headerText => {
        const col = document.createElement("div");
        col.classList.add("col");
        col.textContent = headerText;
        headerRow.appendChild(col);
    });
    userList.insertBefore(headerRow, userList.lastElementChild);

    users.forEach(user => {
        const row = document.createElement("div");
        row.classList.add("row", "user");

        const idCol = document.createElement("div");
        idCol.classList.add("col");
        idCol.textContent = user.id;
        row.appendChild(idCol);

        const nameCol = document.createElement("div");
        nameCol.classList.add("col");
        nameCol.textContent = user.name;
        row.appendChild(nameCol);

        const passwordCol = document.createElement("div");
        passwordCol.classList.add("col");
        passwordCol.textContent = user.password;
        row.appendChild(passwordCol);

        const emailCol = document.createElement("div");
        emailCol.classList.add("col");
        emailCol.textContent = user.email;
        row.appendChild(emailCol);

        const phoneCol = document.createElement("div");
        phoneCol.classList.add("col");
        phoneCol.textContent = user.phone;
        row.appendChild(phoneCol);

        userList.insertBefore(row, userList.lastElementChild);
    });
}

function doPost(){
    const id = document.getElementById("reg_id").value;
    const name = document.getElementById("reg_name").value;
    const password = document.getElementById("reg_password").value;
    const email = document.getElementById("reg_email").value;
    const phone = document.getElementById("reg_phone").value;


    const xhr = new XMLHttpRequest()
    xhr.open("POST", "shop-server", true)
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            back()
        }
    }

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    const data = `id=${id}&name=${name}&password=${password}&email=${email}&phone=${phone}`;
    console.log(data)
    xhr.send(data)
}

function showRegister() {
    login.style.display = "none";
    registerF.style.display = "block";
}

function showLogin() {
    registerF.style.display = "none";
    login.style.display = "block";
}

function back() {
    logged.style.display = "none";
    login.style.display = "block";
}

