var webview = document.querySelector(".web-page webview");
var webviews_parent = document.querySelector(".web-page");
var url = document.querySelector(".tab input");

var search_button = document.querySelector('.tab-search');
var reload_button = document.querySelector('.tab-reload');

const more_back = document.querySelectorAll('.more-back');
const more_forward = document.querySelectorAll('.more-forward');
const more_searchinpage = document.querySelectorAll('.more-searchInPage');
const more_print = document.querySelectorAll('.more-print');
const more_inspect = document.querySelectorAll('.more-inspect');

const search = document.querySelectorAll('.tab-search');
const reload = document.querySelectorAll('.tab-reload');
const search_bar = document.querySelectorAll(".tab input");

search.forEach(el => el.addEventListener('click', event => {
    webviews_parent.style.opacity = "100%";
    search_button.style.display = "none";
    reload_button.style.display = "block";

    if(url.value.includes("http://") == true || url.value.includes("https://") == true){
        webview.src = url.value;
    }else{
        webview.src = `http://${url.value}`;
    }
}));

more_back.forEach(el => el.addEventListener('click', event => {
    webview.goBack();
}));

more_forward.forEach(el => el.addEventListener('click', event => {
    webview.goForward();
}));

more_searchinpage.forEach(el => el.addEventListener('click', event => {
    webview.findInPage();
}));

more_print.forEach(el => el.addEventListener('click', event => {
    webview.print();
}));

more_inspect.forEach(el => el.addEventListener('click', event => {
    webview.openDevTools();
}));

reload.forEach(el => el.addEventListener('click', event => {
    webview.reload();
}));

search_bar.forEach(el => el.addEventListener('click', event => {
    url.value = "";
    search_button.style.display = "block";
    reload_button.style.display = "none";
    close_button.style.display = "none";
}));

onload = () => {
    const webview = document.querySelector('webview')

    const loadstop = () => {
        url.value = webview.getTitle();
    }

    webview.addEventListener('did-stop-loading', loadstop)
  }