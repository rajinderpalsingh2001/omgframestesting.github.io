function fullscreen(type) {
    var el = document.getElementById("middle");

    if (type == 't') {          //toggle
        if (el.style.display.toString() == "" || el.style.display.toString() == "none") {
            $("#perview").removeClass("col-md-7");
            $("#perview").removeClass("col-md-11");
            $("#perview").addClass("col-md-7");
        }
        if (el.style.display.toString() == "block") {
            $("#perview").removeClass("col-md-7");
            $("#perview").removeClass("col-md-11");
            setTimeout(function () {
                $("#perview").addClass("col-md-11");
            }, 1)
        }
        $("#middle").fadeToggle(1);
    } else if (type == 'o') {    //open
        $("#perview").removeClass("col-md-7");
        $("#perview").removeClass("col-md-11");
        $("#perview").addClass("col-md-7");
        $("#middle").fadeIn(1);
    } else if (type == 'c') {    //close
        $("#middle").fadeOut(1);
    }
}

function openclosecontentinmiddle(open) {
    var els = ["backgroundandshape", "editingimage", "eventselector", "iconsselector"];
    for (i of els) {
        if (open == i) {
            $(String('#' + i)).fadeIn(1);
        } else {
            $(String('#' + i)).fadeOut(1);
        }
    }
}

function originalimage() {
    image.src = tempsrc;
}

function hideshowcropwindow(val) {
    switch (val) {
        case "original":
            $("#imageforcrop").hide();
            break;
        default:
            $("#imageforcrop").show();
            break;
    }
}

function addselected(add) {
    var els = ["imageselectoroption", "iconselectoroption", "uploadselectoroption", "eventselectoroption", "fullscreenselectoroption", "frameselectoroption"];
    var dom;
    for (i of els) {
        dom = document.getElementById(String(i));
        if (add == i) {
            dom.setAttribute("selected", "");
        } else {
            dom.removeAttribute("selected");

        }
    }

}

function lightdark(dom) {
    var link = document.createElement('link');
    var head=document.getElementsByTagName("head");
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/darkdashboard.css';
    var img = document.querySelector('img[alt="omglogo"]');
    var labeldl=document.getElementById("darklighttext");
    if(dom.getAttribute('checked')!=""){
        localStorage.setItem("theme","light");
        head[0].removeChild(head[0].lastChild);
        dom.setAttribute("checked","");
        labeldl.innerText="Light";
        img.src="images/omglogo.png";
    }else{
        localStorage.setItem("theme","dark");
        img.src="images/omglogodark.png";
        labeldl.innerText="Dark";
        dom.removeAttribute("checked");
        head[0].appendChild(link);
    }
}

onload=function () {
    if(localStorage.getItem("theme")=="dark"){
        var link = document.createElement('link');
        var head=document.getElementsByTagName("head");
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'css/darkdashboard.css';
        var dom=document.getElementById('lightdarkbtn');
        var img = document.querySelector('img[alt="omglogo"]');
        var labeldl=document.getElementById("darklighttext");

        img.src="images/omglogodark.png";
        labeldl.innerText="Dark";
        dom.removeAttribute("checked");
        head[0].appendChild(link);
    }
}