var stats = {};
var table = {};

var calculate = (callback = () => {
}) => {
    $('#display').dimmer('show');
    ipcRenderer.once("query-reply", (event, docs) => {
        var tableData = docs;
        for (var i = 0; i < tableData.length; i++) {
            tableData[i] = process(tableData[i]);
            var currDate = (new Date(tableData[i].timeStamp));
            var str = (currDate.getMonth() + 1) + "/" + currDate.getDate() + "/" + currDate.getFullYear();
            tableData[i].dateStr = str;
        }
        $("#dataTable").empty();
        table = new Tabulator("#dataTable", {
            data: tableData,
            columns: [
                {
                    title: "Date",
                    field: "dateStr",
                    headerFilter: true,
                    sorter: "date",
                    sorterParams: {format: "MM/DD/YYYY"}
                },
                {title: "Time Stamp", field: "timeStamp", headerFilter: true},
                {title: "Team Number", field: "targetTeam", headerFilter: true},
                {title: "Match Type", field: "matchType", headerFilter: true},
                {title: "Match Number", field: "matchNumber", headerFilter: true},
                {title: "Crossed Cable", field: "counts.L"},
                // {title: "Auto Grid Lvl 1 Cube", field: "counts.S_H_R1"},
                // {title: "Auto Failed Grid Lvl 1 Cube", field: "counts.S_FH_R1"},
                {title: "Auto Grid Lvl 1 Note", field: "counts.S_C_R1"},
                {title: "Auto Failed Scoring AMP Note", field: "counts.S_FC_R1"},
                // {title: "Auto Grid Lvl 2 Cube", field: "counts.S_H_R2"},
                // {title: "Auto Failed Grid Lvl 2 Cube", field: "counts.S_FH_R2"},
                {title: "Auto Grid Lvl 2 Note", field: "counts.S_C_R2"},
                {title: "Auto Failed Grid Lvl 2 Note", field: "counts.S_FC_R2"},
                // {title: "Auto Grid Lvl 3 Cube", field: "counts.S_H_R3"},
                // {title: "Auto Failed Grid Lvl 3 Cube", field: "counts.S_FH_R3"},
                {title: "Auto Grid Lvl 3 Note", field: "counts.S_C_R3"},
                {title: "Auto Failed Grid Lvl 3 Note", field: "counts.S_FC_R3"},
                // {title: "Grid Lvl 1 Cube", field: "counts.NS_H_R1"},
                // {title: "Failed Grid Lvl 1 Cube", field: "counts.NS_FH_R1"},
                {title: "Grid Lvl 1 Note", field: "counts.NS_C_R1"},
                {title: "Failed Scoring AMP Note", field: "counts.NS_FC_R1"},
                // {title: "Grid Lvl 2 Cube", field: "counts.NS_H_R2"},
                // {title: "Failed Grid Lvl 2 Cube", field: "counts.NS_FH_R2"},
                {title: "Grid Lvl 2 Note", field: "counts.NS_C_R2"},
                {title: "Failed Grid Lvl 2 Cone", field: "counts.NS_FC_R2"},
                // {title: "Grid Lvl 3 Cube", field: "counts.NS_H_R3"},
                // {title: "Failed Grid Lvl 3 Cube", field: "counts.NS_FH_R3"},
                {title: "Grid Lvl 3 Cone", field: "counts.NS_C_R3"},
                {title: "Failed Grid Lvl 3 Cone", field: "counts.NS_FC_R3"},
                {title: "Climb Level", field: "counts.C"},
                {title: "Defense", field: "counts.DF"},
                {title: "Crossed Over Line", field: "counts.FC"}
            ],
            pagination: "local",
            paginationSize: 12
        });
        callback();
        $('#display').dimmer('hide');
    });
    ipcRenderer.send("query", filterMatchesObj);
}

var download = () => {
    filterMatchesOnClick();
    calculate(() => {
        var arr = [];
        var string = "";
        if (filterMatchesObj.targetTeam != undefined) {
            arr = filterMatchesObj.targetTeam.$in;
            arr.sort((a, b) => {
                return a - b
            });
        }
        for (var i = 0; i < arr.length && i < 5; i++) {
            string += arr[i] + "-";
        }
        table.download("csv", string + "data.csv");
    });
}

var downloadRawJSON = () => {
    $('#display').dimmer('show');
    window.setTimeout(() => {
        var raw = ipcRenderer.sendSync("query", {});
        for (var i = 0; i < raw.length; i++) {
            raw[i] = process(raw[i]);
        }
        ipcRenderer.sendSync("save-raw", JSON.stringify(raw));
        $('#display').dimmer('hide');
    }, 500);
}

var sync = () => {
    $("#display").transition("fade in", "500ms");
    $('#display').dimmer({closable: false});
    //$('#display').dimmer('show');
    filterMatches("matchFilter", "calculate();");
    ipcRenderer.once("query-stats-reply", (event, message) => {
        stats = message;
        var teamFilterList = [];
        for (var i = 0; i < stats.availableTeams.length; i++) {
            teamFilterList.push({
                name: stats.availableTeams[i].team.toString(),
                value: stats.availableTeams[i].team.toString()
            });
        }
        $("#teamFilter").dropdown({placeholder: "Team", values: teamFilterList});
        //calculate();
    });
    ipcRenderer.send("query-stats");
}

$(document).ready(() => {
    sync();
});
