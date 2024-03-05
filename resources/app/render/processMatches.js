var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');
var os = require('os');

var credClick = () => {
    var cred = $(".rating").rating("get rating");
    var disp = document.getElementById("credDisp");
    if (cred == 1) {
        disp.innerHTML = "No Credibility - \"I can't trust this data at all\""
    }
    if (cred == 2) {
        disp.innerHTML = "Little Credibility - \"This data is only a little bit trustworthy\""
    }
    if (cred == 3) {
        disp.innerHTML = "Mixed Credibility - \"I think this data is somewhat trustworthy\""
    }
    if (cred == 4) {
        disp.innerHTML = "Very Credibile - \"This data is mostly trustworthy\""
    }
    if (cred == 5) {
        disp.innerHTML = "Full Credibility - \"It might as well have been collect by myself\""
    }
}

var openFiles = () => {
    document.getElementById("loaderText").innerText = "";
    $('#display').dimmer('show');
    var cred = ($(".rating").rating("get rating") - 1) / 4;
    ipcRenderer.once("open-file-reply", () => {
        $('#display').dimmer('hide');
    });
    ipcRenderer.send("open-file", cred);
}

ipcRenderer.on("open-file-track", (event, message) => {
    document.getElementById("loaderText").innerText = "Processing  " + (message.position + 1) + "/" + message.total + " files";
});

var syncTeam = () => {
    document.getElementById("loaderText").innerText = "";
    $('#display').dimmer('show');
    ipcRenderer.once("query-team-sync-reply", () => {
        window.setTimeout(() => {
            $('#display').dimmer('hide');
        }, 500);
    });
    ipcRenderer.send("query-team-sync", true);
}

ipcRenderer.on("query-team-sync-track", (event, message) => {
    if (message.position >= 0) {
        document.getElementById("loaderText").innerText = "Syncing  " + (message.position + 1) + " teams\n[Teams from " + message.page * 500 + " to " + (message.page + 1) * 500 + "]";
    } else {
        document.getElementById("loaderText").innerText = "Skipping teams due to no change\n[Teams from " + message.page * 500 + " to " + (message.page + 1) * 500 + "]";
    }
});

var deleteFiles = () => {
    document.getElementById("loaderText").innerText = "";
    $('#display').dimmer('show');
    ipcRenderer.sendSync("remove", {});
    window.setTimeout(() => {
        $('#display').dimmer('hide');
    }, 1000);
}

var deleteTeam = () => {
    document.getElementById("loaderText").innerText = "";
    $('#display').dimmer('show');
    ipcRenderer.sendSync("remove-team", {});
    window.setTimeout(() => {
        $('#display').dimmer('hide');
    }, 1000);
}

var sync = () => {
    $("#display").transition("fade in", "500ms");
    $('#display').dimmer({closable: false});
    $(".rating").rating({onRate: credClick});
    credClick();
}

var get_slash_type = () => {
    if (os.platform() == 'win32') {
        return "\\"
    } else {
        return "/"
    }
}

var import_db = () => {
    let slash_type = get_slash_type();

    var dir_to_read = dialog.showOpenDialog({properties: ["openDirectory"]});
    fs.copyFileSync(dir_to_read + slash_type + "consolefiles.db", "consolefiles.db");
    fs.copyFileSync(dir_to_read + slash_type + "matchdb.db", "matchdb.db");
    fs.copyFileSync(dir_to_read + slash_type + "tbadb_lm.db", "tbadb_lm.db");
    fs.copyFileSync(dir_to_read + slash_type + "tbadb_team.db", "tbadb_team.db");
}

var export_db = () => {
    let slash_type = get_slash_type();

    var dir_to_save = dialog.showOpenDialog({properties: ["openDirectory"]});
    fs.copyFileSync("consolefiles.db", dir_to_save + slash_type + "consolefiles.db");
    fs.copyFileSync("matchdb.db", dir_to_save + slash_type + "matchdb.db");
    fs.copyFileSync("tbadb_lm.db", dir_to_save + slash_type + "tbadb_lm.db");
    fs.copyFileSync("tbadb_team.db", dir_to_save + slash_type + "tbadb_team.db");
}

$(document).ready(() => {
    sync();
});
