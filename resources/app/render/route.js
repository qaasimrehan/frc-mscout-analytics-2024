var Chart = require('chart.js');
var ipcRenderer = require('electron').ipcRenderer;
var Tabulator = require('tabulator-tables');
var countryList = require('country-list');
countryList.overwrite([{code: 'US', name: 'USA'}]);

var router = {
    dashboard: () => {
        ipcRenderer.sendSync("open-url", "render/dashboard.html");
    },
    processMatches: () => {
        ipcRenderer.sendSync("open-url", "render/processMatches.html");
    },
    teams: () => {
        ipcRenderer.sendSync("open-url", "render/teams.html");
    },
    export: () => {
        ipcRenderer.sendSync("open-url", "render/export.html");
    },
    console: () => {
        ipcRenderer.sendSync("open-url", "render/console.html");
    },
    matches: () => {
        ipcRenderer.sendSync("open-url", "render/matches.html");
    }
};

function setGrey(id) {
    //document.getElementById(id).className = "active grey item";
    $("#" + id).attr('class', 'active grey item');
    //document.querySelector('#' + id)
}

function removeGrey(id) {
    document.getElementById(id).className = "item";
}

//TODO Somehow stop the bar from reloading

var sidebarElement = document.getElementById("sidebar");
sidebarElement.insertAdjacentHTML("beforeend", '<a href="#" onclick="router.dashboard(); setGrey(\'dboard\')" class="item" id="dboard"><i class="desktop icon"></i>Dashboard</a>');
sidebarElement.insertAdjacentHTML("beforeend", '<a href="#" onclick="router.processMatches(); setGrey(\'processMatches\')" class="item" id="processMatches"><i class="folder open icon"></i>Load Data</a>');
sidebarElement.insertAdjacentHTML("beforeend", '<a href="#" onclick="router.teams(); setGrey(\'teams\')" class="item" id="teams"><i class="id badge outline icon"></i>Teams</a>');
sidebarElement.insertAdjacentHTML("beforeend", '<a href="#" onclick="router.matches(); setGrey(\'matches\')" class="item" id="matches"><i class="flag checkered icon"></i>Matches</a>');
sidebarElement.insertAdjacentHTML("beforeend", '<a href="#" onclick="router.dashboard(); setGrey(\'dashboard\')" class="item" id="dashboard"><i class="th list icon"></i>Rankings</a>');
sidebarElement.insertAdjacentHTML("beforeend", '<a href="#" onclick="router.export(); setGrey(\'export\')" class="item" id="export"><i class="table icon"></i>Export CSV</a>');
sidebarElement.insertAdjacentHTML("beforeend", '<a href="#" onclick="router.console(); setGrey(\'console\')" class="item" id="console"><i class="terminal icon"></i>Console</a>');
