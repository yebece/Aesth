window.addEventListener('contextmenu', (event) => {
});

var menu_open = false;
var platform = navigator.platform;
var windowsNavButtons = document.querySelector(".navigation-buttons");

if(platform == "MacIntel"){
  windowsNavButtons.style.display = "none";
}


const more = document.querySelectorAll('.more-button');
var more_menu = document.querySelector('.more-menu');

const scrollWrapper = document.querySelector('.scroll-wrapper');
var webviewsPar = document.querySelector(".web-page");

scrollWrapper.addEventListener("mousemove", (e) => {
  scrollWrapper.style.top = "0";
  scrollWrapper.style.filter = "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.05))";
  webviewsPar.style.height = "calc(100% - 70px)";
  webviewsPar.style.top = "0";
  ipc.send("trafficLightsChange");
});

webviewsPar.addEventListener("mousemove", (e) => {
  scrollWrapper.style.top = "-50px";
  scrollWrapper.style.filter = "unset";
  webviewsPar.style.height = "calc(100% - 20px)";
  webviewsPar.style.top = "-50px";
});

//more.forEach(el => el.addEventListener('click', event => {
//    if(menu_open == false){
//        menu_open = true;
//        more_menu.style.left = "15px";
//    }else{
//        menu_open = false;
//        more_menu.style.left = "-210px";
//    }
//}));