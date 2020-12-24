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

function opengallery(){
    var token=sessionStorage.getItem('token');
    if(token==null){
        $('#loginpopup').modal('show');
    }else{
        window.open('gallery.html','_parent');
    }
}
function download(url) {
    const a = document.createElement("a");
    var filename=prompt("Please Enter Filename", "badge");
    if(filename!=null){
        a.download = filename;
        a.href = url;
        a.click();
    }

}
function deleteimg() {
    // document.querySelector("input.profile-input").value='';
}
