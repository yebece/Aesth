var tabs = [
    {url: "", title: "", tabCreationDate: new Date(), tabID: 0, isTabSelected: true, isUrlEntered: false}
];
let tabLent = tabs.length;
var totalTabs = 0

/*
Tab attributes:
Tab URL: String,
Tab Title: String,
Tab Creation Date: Date,
Tab ID (forSorting): Integer,
Tab Selected: Bool,
Tab URL Entered: Bool
*/

const newTabButton = document.querySelectorAll('.new-tab');
const tabsView = document.getElementById('tabs');
const webviewsView = document.getElementById('web-page');

function createTab(element) {
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.id = `tab${totalTabs}`;

    const input = document.createElement('input');
    input.type = 'url';
    input.value = ' ';
    input.placeholder = 'Type in URL or something';
    input.spellcheck = false;

    const tabButtons = document.createElement('div');
    tabButtons.className = 'tab-buttons';

    const ifEnabled = document.createElement('div');
    ifEnabled.className = 'ifEnabled';

    const closeButton = document.createElement('div');
    closeButton.className = 'tab-close';

    const reloadButton = document.createElement('div');
    reloadButton.className = 'tab-reload';

    const searchButton = document.createElement('div');
    searchButton.className = 'tab-search';

    tabButtons.appendChild(ifEnabled);
    ifEnabled.appendChild(closeButton);
    ifEnabled.appendChild(reloadButton);
    ifEnabled.appendChild(searchButton);

    tab.appendChild(input);
    tab.appendChild(tabButtons);

    tabsView.appendChild(tab);

    const newWebView = document.createElement('webview');
    newWebView.id = `wtab${totalTabs}`;
    newWebView.nodeintegration = `true`;

    webviews_parent.appendChild(newWebView);
}

newTabButton.forEach(el => el.addEventListener('click', event => {
    tabs.forEach((element) => element.isTabSelected = false);
    totalTabs++;
    var newTab = {url: "", title: "", tabCreationDate: new Date(), tabID: totalTabs, isTabSelected: false, isUrlEntered: false};
    tabs.push(newTab);
    console.log(tabs);
    console.log(totalTabs);
    createTab(tabs.length);
    checkIfTabEnabled();
}));

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('tab-search')) {
        handleTabSearch(event);
    }
    if (event.target.classList.contains('tab-reload')) {
        handleTabReload(event);
    }
    if (event.target.classList.contains('tab-close')) {
        handleTabClose(event);
    }
    selectTab(event.target);
});

function hideAllTabs(){
    const webviews = document.querySelectorAll('webview');

    webviews.forEach(webviewt => {
        webviewt.style.display = 'none';
    });
}

function handleTabReload(event) {
    var tab = event.target.parentElement.parentElement.parentElement;
    var tabId = tab.id;
    var tabWebviewID = "w" + event.target.parentElement.parentElement.parentElement.id;
    var tabWebview = document.getElementById(tabWebviewID);
    tabWebview.reload();
}

function handleTabClose(event) {
    var tab = event.target.parentElement.parentElement.parentElement;
    var tabId = tab.id;
    var tabWebviewID = "w" + event.target.parentElement.parentElement.parentElement.id;
    var tabWebview = document.getElementById(tabWebviewID);
    tabWebview.remove();
    tab.remove();
    tabIdInt = parseInt(tabId.substring(3));
    tabs = tabs.filter(function( obj ) {
        return obj.tabID !== tabIdInt;
    });
    console.log(tabs);
}

function handleTabSearch(event) {
    var tabId = event.target.parentElement.parentElement.parentElement.id;
    var tabReloadButton = event.target.parentElement.children[1];
    var tabWebviewID = "w" + event.target.parentElement.parentElement.parentElement.id;
    var tabWebview = document.getElementById(tabWebviewID);
    var tabInput = event.target.parentElement.parentElement.parentElement.firstChild;

    event.target.style.display = "none";
    hideAllTabs();
    tabWebview.style.display = 'unset';
    if (tabInput.value.includes("http://") == true || tabInput.value.includes("https://") == true || tabInput.value.includes("chrome://") == true){
        tabWebview.src = tabInput.value;
    } else if(tabInput.value.includes(" ") == false && tabInput.value.includes(".") == true){
        tabWebview.src = `http://${tabInput.value}`;
        tabReloadButton.style.display = "block";
    }else{
        var googleValue = tabInput.value.replace(" ", '+');
        tabWebview.src = `https://www.google.com/search?q=` + googleValue;
        tabReloadButton.style.display = "block";
    };
    tabWebview.shadowRoot.children[1].style = "flex: 1 1 auto; background-color: #fff; width: 100%; height: 100%; border: 0px;";
    checkIfTabEnabled();
}

tabs.forEach(element => {
    createTab(tabs.length);
});

function checkIfTabEnabled(){
    const allTabs = document.querySelectorAll('.tab');

    allTabs.forEach(allTabst => {
        numberID = parseInt(allTabst.id.substring(3));
        tabs.forEach(alltabstt => {
            if(alltabstt.isTabSelected == false && alltabstt.tabID == numberID){
                allTabst.firstChild.readOnly = "true";
                allTabst.firstChild.blur();
                allTabst.children[1].firstChild.children[1].style.display = "none";
            }
        });
    });
}

checkIfTabEnabled();

document.addEventListener('mousedown', function(event) {
    checkIfTabEnabled();
    selectTab(event.target);
});


function selectTab(tabItself){
    var theTab;
    if(tabItself.classList.contains("tab") == true){
        theTab = tabItself;
    }else if(tabItself.closest(".tab").classList.contains("tab") == true){
        theTab = tabItself.closest(".tab");
    }

    var tabStringId = theTab.id;
    var tadId = parseInt(tabStringId.substring(3));
    var webviewId = document.getElementById("wtab" + tadId);

    hideAllTabs();
    webviewId.style.display = "inline";

    tabs.forEach(alltabt => {
        alltabt.isTabSelected == false;
        if(alltabt.isTabSelected == false && alltabt.tabID == tadId){
            if(webviewId.src){
                theTab.children[1].firstChild.children[1].style.display = "block";
            }
            theTab.firstChild.removeAttribute("readonly");
            theTab.firstChild.focus();
        }
    });
    console.log(tabs);
}

function focusSearch(){

}