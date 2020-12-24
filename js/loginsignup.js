function createordestroybutton(win) {
    switch (win) {
        case 'index':
        case 'dashboard':
            if (sessionStorage.getItem('token') != null) {
                var navmenu = document.getElementById("navmenu");
                navmenu.removeChild(navmenu.lastChild);
                var btn = document.createElement("button");
                btn.type = "button";
                btn.className = "btn btn-outline-primary";
                btn.setAttribute("onclick", "logout()");
                btn.innerHTML = "Logout";
                navmenu.appendChild(btn);
            } else {
                var navmenu = document.getElementById("navmenu");
                navmenu.removeChild(navmenu.lastChild);
                var btn = document.createElement("button");
                btn.type = "button";
                btn.className = "btn btn-outline-primary";
                btn.setAttribute("data-toggle", "modal");
                btn.setAttribute("data-target", "#loginpopup");
                btn.innerHTML = "Login";
                navmenu.appendChild(btn);
            }
            break;
        default:
            break;

    }


}

function signup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("emailnew").value;
    var password = document.getElementById("passwordnew").value;


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            document.getElementsByClassName("alertpopup").innerHTML = this.responseText;
            $('#alertpopup').modal('show');
            setTimeout(function () {
                $('#signupform').modal('hide');
                $('#alertpopup').modal('hide');
                $('#loginpopup').modal('show');
            },2000);
        } else if (this.readyState == 4 && this.status == 409) {
            alertpopup('Account Already Exists\nfor this Email', 'open');
        } else if (this.readyState == 4 && this.status == 500) {
            alertpopup('Failed to Create Account\nInternal Server Error', 'open');
        }
    };
    xhttp.open("POST", "http://104.236.25.178/api/v1/register", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({email: email, name: name, password: password}));
}

function login(win) {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 202) {
            sessionStorage.setItem('token', JSON.parse(this.responseText)["token"]);
            createordestroybutton(win);
            $('#loginpopup').modal('hide');
        } else if (this.readyState == 4 && this.status == 401) {
            alertpopup('Invalid Email or Password', 'open');
        }
    };
    xhttp.open("POST", "http://104.236.25.178/api/v1/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({email: email, password: password}));
}

function getframes() {
    var token = sessionStorage.getItem('token');
    if (token == null) {
        window.open('dashboard.html');
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                var arrayofframes = JSON.parse(this.responseText)["frames"];
                var temp = "";
                for (var i = 0; i < arrayofframes.length; i++) {
                    temp += '<div class="col-sm-4">'
                    temp += '<img class="displayframeimage" src="' + arrayofframes[i] + '">'
                    temp += '<div class="overlay">'
                    temp += '<div class="text">' +
                        '<ul class="list">' +
                        '<li onclick="download(\'' + arrayofframes[i] + '\')"><span><img src="svglogos/download.svg" class="iconsimagehover">Download</span></li>' +
                        '<li><span><img src="svglogos/delete.svg" class="iconsimagehover">Delete&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></li>' +
                        '</ul>' +
                        '</div>'
                    temp += '</div>'
                    temp += '</div>'
                }
                document.getElementById('main').innerHTML = temp;

            } else if (this.readyState == 4 && this.status == 401) {
                alertpopup(this.responseText, 'open');
            }
        };

        xhttp.open("GET", "http://104.236.25.178/api/v1/frames", true);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
        xhttp.send();
    }
}

function saveframe() {
    var token = sessionStorage.getItem('token');
    if (token == null) {
        $('#loginpopup').modal('show');
    } else {
        var dataurl = canvas.toDataURL("image/png;base64");
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alertpopup('Added Successfully', 'open');
            } else if (this.readyState == 4 && this.status == 401) {
                alertpopup('Error While Saving\nLogin Again', 'open');
            }
        };
        xhr.open("POST", "http://104.236.25.178/api/v1/frames");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
        xhr.send(JSON.stringify({frame: dataurl}));
    }

}

function logout() {
    sessionStorage.removeItem('token');
    createordestroybutton('index');
    createordestroybutton('dashboard');
}

function alertpopup(text, par) {
    document.getElementById('alerttext').innerHTML = text;
    if (par == 'open') {
        $('#alertpopup').modal('show');
    } else {
        $('#alertpopup').modal('hide');
    }
}