const login = document.getElementById("login");
const logged = document.getElementById("logged");
const registerF = document.getElementById("registerF");
const editForm = document.getElementById("editForm");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

passwordError.style.display = "none";
emailError.style.display = "none";
logged.style.display = "none";
registerF.style.display = "none";



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

    const headers = ["ID", "Name", "Password", "Email", "Phone", "Options"];
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

        const actionCol = document.createElement("div");
        actionCol.classList.add("col");
        const editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-primary");
        editButton.textContent = "Edit";
        editButton.onclick = () => editUser(user);
        actionCol.appendChild(editButton);

        const delB = document.createElement("button");
        delB.classList.add("btn", "btn-primary");
        delB.textContent = "Delete";
        delB.onclick = () => doDelete(user.id)
        actionCol.appendChild(delB)

        row.appendChild(actionCol)


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

function editUser(user) {
    showEdit()

    document.getElementById("edit_id").value = user.id;
    document.getElementById("edit_name").value = user.name;
    document.getElementById("edit_password").value = user.password;
    document.getElementById("edit_email").value = user.email;
    document.getElementById("edit_phone").value = user.phone;
}

function doPut() {
    const id = document.getElementById("edit_id").value;
    const name = document.getElementById("edit_name").value;
    const password = document.getElementById("edit_password").value;
    const email = document.getElementById("edit_email").value;
    const phone = document.getElementById("edit_phone").value;

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "shop-server", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            back();
        } else if (xhr.readyState === 4) {
            console.error("Error:", xhr.statusText);
        }
    };

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    const data = `id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
    console.log(data);
    xhr.send(data);
}

function doDelete(userId) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "shop-server", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("User deleted successfully.");
            back()
        } else if (xhr.readyState === 4) {
            console.error("Error:", xhr.statusText);
        }
    };

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    const data = `id=${encodeURIComponent(userId)}`;
    xhr.send(data);
}

function showRegister() {
    login.style.display = "none";
    registerF.style.display = "block";
}

function showLogin() {
    registerF.style.display = "none";
    login.style.display = "block";
}

function showEdit() {
    editForm.style.display = "block";
    logged.style.display = "none"

}

function back() {
    logged.style.display = "none";
    registerF.style.display = "none";
    login.style.display = "block";
    editForm.style.display = "none";
}

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
