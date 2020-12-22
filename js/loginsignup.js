function createordestroybutton(){
    // sessionStorage.removeItem('token')
    if(sessionStorage.getItem('token')!=null){
        var btn = document.createElement("button");
        btn.type="button";
        btn.className="btn btn-outline-primary";
        btn.setAttribute("onclick","logout()");
        btn.innerHTML = "Logout";
        document.getElementById("navmenu").appendChild(btn);
    }else{
        var btn = document.createElement("button");
        btn.type="button";
        btn.className="btn btn-outline-primary";
        btn.setAttribute("data-toggle","modal");
        btn.setAttribute("data-target","#loginpopup");
        btn.innerHTML = "Login";
        document.getElementById("navmenu").appendChild(btn);
    }

}


function signup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("emailnew").value;
    var password = document.getElementById("passwordnew").value;


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            document.getElementsByClassName("alertpopup").innerHTML=this.responseText;
            $('#alertpopup').modal('show');
            // console.log(this.responseText);
        } else if (this.readyState == 4 && this.status == 409) {
            console.log("User details provided are invalid ( or User already exits )" + this.responseText);
        } else if (this.readyState == 4 && this.status == 500) {
            console.log("Internal Server Error");
        }
    };
    xhttp.open("POST", "http://104.236.25.178:5000/api/v1/register", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("{ \"email\": \"" + email + "\", \"name\": \"" + name + "\", \"password\": \"" + password + "\"}");
}

function login() {
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 202) {

            document.getElementById("al").innerHTML="Login Successful";
            sessionStorage.setItem('token',JSON.parse(this.responseText)["token"]);

            $('#alertpopup').modal('show');
            $('#loginpopup').modal('hide');
            location.reload();
        }else if (this.readyState == 4 && this.status == 401) {
            console.log("Invalid Login Details " + this.responseText);
        }
    };
    xhttp.open("POST", "http://104.236.25.178:5000/api/v1/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("{ \"email\": \"" + email + "\", \"password\": \"" + password + "\"}");
}

function getframes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            document.getElementById("res").innerHTML=this.responseText;
            var image = new Image();
            image.src =JSON.parse(this.responseText)["frames"] ;
            document.getElementById('res').appendChild(image);
        }else if (this.readyState == 4 && this.status == 401) {
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", "http://104.236.25.178:5000/api/v1/frames", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer "+sessionStorage.getItem('token'));
    xhttp.send();
}




function logout(){
    sessionStorage.removeItem('token');
    location.reload();
}




function saveframe(){
    var dataurl=canvas.toDataURL("image/png;base64");
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhr.responseText);
        }else if(this.readyState == 4 && this.status == 401){
            console.log(xhr.responseText);
        }
    };
    xhr.open("POST", "http://104.236.25.178:5000/api/v1/frames");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    xhr.send("{ \"frame\": \"" + dataurl + "\"");

}


// let saveframe = (ev) => {
//     var dataurl=canvas.toDataURL("image/png;base64");
//     let url = 'http://127.0.0.1:5000/api/v1/frames';
//     // let url = 'http://104.236.25.178:5000/api/v1/frames';
//     let h = new Headers();
//     h.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
//     let req = new Request(url, {
//         method: 'POST',
//         mode: 'cors',
//         headers: h,
//         contentType:"application/json",
//         dataType:"json",
//         data:{"frame":dataurl}
//     });
//     fetch(req)
//         .then(resp => resp.json())
//         .then(data => {
//             console.log(data);
//         })
//         .catch(err => {
//             console.error(err.message);
//         })
// }
//
//
