var chart = {};

var addCharts = (element, hasMultiple = false) => {
    element.insertAdjacentHTML("beforeend",
        "<div class=\"eight wide column\">" +
        "<div class=\"ui segment\">" +
        "<h3 class=\"ui right aligned dividing header\" style=\"margin-top: 0px;\">Notes Scored by Time</h3>" +
        "<canvas id=\"cvht\"></canvas>" +
        "</div>" +
        "</div>" +
        "<div class=\"eight wide column\">" +
        "<div class=\"ui segment\">" +
        "<h3 class=\"ui right aligned dividing header\" style=\"margin-top: 0px;\">Notes Scored by Attempts</h3>" +
        "<canvas id=\"cvha\"></canvas>" +
        "</div>" +
        "</div>" +
      /*  "<div class=\"eight wide column\">" +
        "<div class=\"ui segment\">" +
        "<h3 class=\"ui right aligned dividing header\" style=\"margin-top: 0px;\">Cone vs Cube by Score</h3>" +
        "<canvas id=\"cvhs\"></canvas>" +
        "</div>" +
        "</div>" + */ 
      /**/  "<div class=\"eight wide column\">" +
        "<div class=\"ui segment\">" +
        "<h3 class=\"ui right aligned dividing header\" style=\"margin-top: 0px;\">Grid Levels by Time</h3>" +
        "<canvas id=\"csvrt\"></canvas>" +
        "</div>" +
        "</div>" +
        "<div class=\"eight wide column\">" +
        "<div class=\"ui segment\">" +
        "<h3 class=\"ui right aligned dividing header\" style=\"margin-top: 0px;\">Grid Levels by Attempts</h3>" +
        "<canvas id=\"csvra\"></canvas>" +
        "</div>" +
        "</div>" +
        "<div class=\"eight wide column\">" +
        "<div class=\"ui segment\">" +
        "<h3 class=\"ui right aligned dividing header\" style=\"margin-top: 0px;\">Grid Levels by Score</h3>" +
        "<canvas id=\"csvrs\"></canvas>" +
        "</div>" +
        "</div>" + /**/
        "<div class=\"eight wide column\">" +
        "<div class=\"ui segment\">" +
        "<h3 class=\"ui right aligned dividing header\" style=\"margin-top: 0px;\">Scoring Types by Time</h3>" +
        "<canvas id=\"svdt\"></canvas>" +
        "</div>" +
        "</div>" +
        "<div class=\"eight wide column\">" +
        "<div class=\"ui segment\">" +
        "<h3 class=\"ui right aligned dividing header\" style=\"margin-top: 0px;\">Scoring Types by Score</h3>" +
        "<canvas id=\"svds\"></canvas>" +
        "</div>" +
        "</div>");
    if (hasMultiple) {
        element.insertAdjacentHTML("beforeend",
            "<div class=\"sixteen wide column\">" +
            "<div class=\"ui segment\">" +
            "<h3 class=\"ui right aligned dividing header\" style=\"margin-top: 0px;\">Scored over Time (Notes)</h3>" +
            "<canvas id=\"sot\"></canvas>" +
            "</div>" +
            "</div>" +
            "<div class=\"sixteen wide column\">" +
            "<div class=\"ui segment\">" +
            "<h3 class=\"ui right aligned dividing header\" style=\"margin-top: 0px;\">Scoring over Time (Grid)</h3>" +
            "<canvas id=\"cvhot\"></canvas>" +
            "</div>" +
            "</div>");
    }
}
var resetCharts = () => {
    chart.cvht.destroy();
    chart.cvha.destroy();
   // chart.cvhs.destroy();
    chart.csvrt.destroy();
    chart.csvra.destroy();
    chart.csvrs.destroy();
    chart.svdt.destroy();
    chart.svds.destroy();
    chart.sot.destroy();
    chart.cvhot.destroy();
}
var charts = (docs) => {
    var ctx = document.getElementById('cvht').getContext('2d');
    var chartData = {};
    chart = {};
    chartData.cvht = {
        labels: ["Failing at Scoring Note", "Scoring Note", "Picking up Note"],
        datasets: [{
            label: "Notes Scored by Time",
            data: [
                avgSums(docs, "times", "FC_CS") +
                avgSums(docs, "times", "FC_R1") +
                avgSums(docs, "times", "FC_R2") +
                avgSums(docs, "times", "FC_R3"),
                avgSums(docs, "times", "C_CS") +
                avgSums(docs, "times", "C_R1") +
                avgSums(docs, "times", "C_R2") +
                avgSums(docs, "times", "C_R3"),
                avgSums(docs, "times", "TC_CS") +
                avgSums(docs, "times", "TC_R1") +
                avgSums(docs, "times", "TC_R2") +
                avgSums(docs, "times", "TC_R3"),
                avgSums(docs, "times", "FH_CS") +
                avgSums(docs, "times", "FH_R1") +
                avgSums(docs, "times", "FH_R2") +
                avgSums(docs, "times", "FH_R3"),
                avgSums(docs, "times", "H_CS") +
                avgSums(docs, "times", "H_R1") +
                avgSums(docs, "times", "H_R2") +
                avgSums(docs, "times", "H_R3"),
                avgSums(docs, "times", "TH_CS") +
                avgSums(docs, "times", "TH_R1") +
                avgSums(docs, "times", "TH_R2") +
                avgSums(docs, "times", "TH_R3")
            ],
            backgroundColor: ["#cc5200", "#ff6600", "#ffb380", "#cccc00", "#ffff00", "#ffff80"]
        }]
    };
    chart.cvht = new Chart(ctx, {
        type: "doughnut",
        data: chartData.cvht,
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index] || '';
                        if (label) {
                            label += ': ';
                            label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
                            label += " secs (";
                            sum = 0;
                            for (var i = 0; i < data.datasets[tooltipItem.datasetIndex].data.length; i++) {
                                var tmp = data.datasets[tooltipItem.datasetIndex]._meta;
                                if (!tmp[Object.keys(tmp)[0]].data[i].hidden) {
                                    sum += data.datasets[tooltipItem.datasetIndex].data[i];
                                }
                            }
                            label += Math.round(10000 * data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum) / 100;
                            label += "%)";
                        }
                        return label;
                    }
                }
            },
            aspectRatio: 1.75,
            legend: {position: "left"}
        }
    });
    var ctx = document.getElementById('cvha').getContext('2d');
    chartData.cvha = {
        labels: ["Failing at Scoring Note", "Scoring Note on AMP",  "Scoring Note on SPEAKER",  "Scoring Note on TRAP", "Failing at Scoring Cube", "Scoring Cube"],
        datasets: [{
            label: "Notes Scored by Attempts",
            data: [
                avgSums(docs, "counts", "FC_CS") +
                avgSums(docs, "counts", "FC_R1") +
                avgSums(docs, "counts", "FC_R2") +
                avgSums(docs, "counts", "FC_R3"),
                avgSums(docs, "counts", "C_CS") +
                avgSums(docs, "counts", "C_R1") +
                avgSums(docs, "counts", "C_R2") +
                avgSums(docs, "counts", "C_R3"),
                avgSums(docs, "counts", "FH_CS") +
                avgSums(docs, "counts", "FH_R1") +
                avgSums(docs, "counts", "FH_R2") +
                avgSums(docs, "counts", "FH_R3"),
                avgSums(docs, "counts", "H_CS") +
                avgSums(docs, "counts", "H_R1") +
                avgSums(docs, "counts", "H_R2") +
                avgSums(docs, "counts", "H_R3")
            ],
            backgroundColor: ["#cc5200", "#ff6600", "#cccc00", "#ffff00"]
        }]
    };
    chart.cvha = new Chart(ctx, {
        type: "doughnut",
        data: chartData.cvha,
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index] || '';
                        if (label) {
                            label += ': ';
                            label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
                            label += " times (";
                            sum = 0;
                            for (var i = 0; i < data.datasets[tooltipItem.datasetIndex].data.length; i++) {
                                var tmp = data.datasets[tooltipItem.datasetIndex]._meta;
                                if (!tmp[Object.keys(tmp)[0]].data[i].hidden) {
                                    sum += data.datasets[tooltipItem.datasetIndex].data[i];
                                }
                            }
                            label += Math.round(10000 * data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum) / 100;
                            label += "%)";
                        }
                        return label;
                    }
                }
            },
            aspectRatio: 1.75,
            legend: {position: "right"}
        }
    });
    /*
    var ctx = document.getElementById('cvhs').getContext('2d');
    chartData.cvhs = {
        labels: ["Scoring Cone", "Scoring Cube"],
        datasets: [{
            label: "Cone vs Cube by Score",
            data: [
                avgSums(docs, "scoring", "C_CS") +
                avgSums(docs, "scoring", "C_R1") +
                avgSums(docs, "scoring", "C_R2") +
                avgSums(docs, "scoring", "C_R3"),
                avgSums(docs, "scoring", "H_CS") +
                avgSums(docs, "scoring", "H_R1") +
                avgSums(docs, "scoring", "H_R2") +
                avgSums(docs, "scoring", "H_R3")
            ],
            backgroundColor: ["#ff6600", "#ffff00"]
        }]
    };
    chart.cvhs = new Chart(ctx, {
        type: "doughnut",
        data: chartData.cvhs,
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index] || '';
                        if (label) {
                            label += ': ';
                            label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
                            label += " points (";
                            sum = 0;
                            for (var i = 0; i < data.datasets[tooltipItem.datasetIndex].data.length; i++) {
                                var tmp = data.datasets[tooltipItem.datasetIndex]._meta;
                                if (!tmp[Object.keys(tmp)[0]].data[i].hidden) {
                                    sum += data.datasets[tooltipItem.datasetIndex].data[i];
                                }
                            }
                            label += Math.round(10000 * data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum) / 100;
                            label += "%)";
                        }
                        return label;
                    }
                }
            },
            aspectRatio: 1.75,
            legend: {position: "left"}
        }
    });*/
    /**/
    var ctx = document.getElementById('csvrt').getContext('2d');
    chartData.csvrt = {
        labels: [
//            "Failing at scoring on Cone Ship", "Scoring on Cone Ship", "Trying to score on Cone Ship",
            "Failing at scoring on AMP", "Scoring on AMP", "Trying to score on AMP",
            "Failing at scoring on SPEAKER", "Scoring on SPEAKER", "Trying to score on SPEAKER",
            "Failing at scoring on TRAP", "Scoring on TRAP", "Trying to score on TRAP"
        ],
        datasets: [{
            label: "Grid by Time",
            data: [
                avgSums(docs, "times", "FC_CS") + avgSums(docs, "times", "FH_CS"),
                avgSums(docs, "times", "C_CS") + avgSums(docs, "times", "H_CS"),
                avgSums(docs, "times", "TC_CS") + avgSums(docs, "times", "TH_CS"),
                avgSums(docs, "times", "FC_R1") + avgSums(docs, "times", "FH_R1"),
                avgSums(docs, "times", "C_R1") + avgSums(docs, "times", "H_R1"),
                avgSums(docs, "times", "TC_R1") + avgSums(docs, "times", "TH_R1"),
                avgSums(docs, "times", "FC_R2") + avgSums(docs, "times", "FH_R2"),
                avgSums(docs, "times", "C_R2") + avgSums(docs, "times", "H_R2"),
                avgSums(docs, "times", "TC_R2") + avgSums(docs, "times", "TH_R2"),
                avgSums(docs, "times", "FC_R3") + avgSums(docs, "times", "FH_R3"),
                avgSums(docs, "times", "C_R3") + avgSums(docs, "times", "H_R3"),
                avgSums(docs, "times", "TC_R3") + avgSums(docs, "times", "TH_R3")
            ],
            backgroundColor: [
                "#cc0000", "#ff0000", "#ff8080",
                "#00cc00", "#00ff00", "#80ff80",
                "#00cccc", "#00ffff", "#80ffff",
                "#0000cc", "#0000ff", "#8080ff"
            ]
        }]
    };
    chart.csvrt = new Chart(ctx, {
        type: "doughnut",
        data: chartData.csvrt,
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index] || '';
                        if (label) {
                            label += ': ';
                            label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
                            label += " secs (";
                            sum = 0;
                            for (var i = 0; i < data.datasets[tooltipItem.datasetIndex].data.length; i++) {
                                var tmp = data.datasets[tooltipItem.datasetIndex]._meta;
                                if (!tmp[Object.keys(tmp)[0]].data[i].hidden) {
                                    sum += data.datasets[tooltipItem.datasetIndex].data[i];
                                }
                            }
                            label += Math.round(10000 * data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum) / 100;
                            label += "%)";
                        }
                        return label;
                    }
                }
            },
            aspectRatio: 1.75,
            legend: {position: "right"}
        }
    });
    var ctx = document.getElementById('csvra').getContext('2d');
    chartData.csvra = {
        labels: [
        //    "Failing at scoring on Cone Ship", "Scoring on Cone Ship",
            "Failing at scoring on AMP", "scoring on AMP",
            "Failing at scoring on SPEAKER", "scoring on SPEAKER",
            "Failing at scoring on TRAP", "scoring on TRAP"
        ],
        datasets: [{
            label: "Grid by Attempts",
            data: [
                avgSums(docs, "counts", "FC_CS") + avgSums(docs, "counts", "FH_CS"),
                avgSums(docs, "counts", "C_CS") + avgSums(docs, "counts", "H_CS"),
                avgSums(docs, "counts", "FC_R1") + avgSums(docs, "counts", "FH_R1"),
                avgSums(docs, "counts", "C_R1") + avgSums(docs, "counts", "H_R1"),
                avgSums(docs, "counts", "FC_R2") + avgSums(docs, "counts", "FH_R2"),
                avgSums(docs, "counts", "C_R2") + avgSums(docs, "counts", "H_R2"),
                avgSums(docs, "counts", "FC_R3") + avgSums(docs, "counts", "FH_R3"),
                avgSums(docs, "counts", "C_R3") + avgSums(docs, "counts", "H_R3")
            ],
            backgroundColor: [
                "#cc0000", "#ff0000",
                "#00cc00", "#00ff00",
                "#00cccc", "#00ffff",
                "#0000cc", "#0000ff"
            ]
        }]
    };
    chart.csvra = new Chart(ctx, {
        type: "doughnut",
        data: chartData.csvra,
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index] || '';
                        if (label) {
                            label += ': ';
                            label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
                            label += " times (";
                            sum = 0;
                            for (var i = 0; i < data.datasets[tooltipItem.datasetIndex].data.length; i++) {
                                var tmp = data.datasets[tooltipItem.datasetIndex]._meta;
                                if (!tmp[Object.keys(tmp)[0]].data[i].hidden) {
                                    sum += data.datasets[tooltipItem.datasetIndex].data[i];
                                }
                            }
                            label += Math.round(10000 * data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum) / 100;
                            label += "%)";
                        }
                        return label;
                    }
                }
            },
            aspectRatio: 1.75,
            legend: {position: "left"}
        }
    });
    var ctx = document.getElementById('csvrs').getContext('2d');
    chartData.csvrs = {
        labels: [
          //  "Scoring on Cone Ship",
            "scoring on AMP",
            "scoring on SPEAKER",
            "scoring on TRAP"
        ],
        datasets: [{
            label: "Grid by Score",
            data: [
            //    avgSums(docs, "scoring", "C_CS") + avgSums(docs, "scoring", "H_CS"),
                avgSums(docs, "scoring", "C_R1") + avgSums(docs, "scoring", "H_R1"),
                avgSums(docs, "scoring", "C_R2") + avgSums(docs, "scoring", "H_R2"),
                avgSums(docs, "scoring", "C_R3") + avgSums(docs, "scoring", "H_R3")
            ],
            backgroundColor: [
                "#ff0000",
                "#00ff00",
                "#00ffff",
                "#0000ff"
            ]
        }]
    };
    chart.csvrs = new Chart(ctx, {
        type: "doughnut",
        data: chartData.csvrs,
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index] || '';
                        if (label) {
                            label += ': ';
                            label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
                            label += " points (";
                            sum = 0;
                            for (var i = 0; i < data.datasets[tooltipItem.datasetIndex].data.length; i++) {
                                var tmp = data.datasets[tooltipItem.datasetIndex]._meta;
                                if (!tmp[Object.keys(tmp)[0]].data[i].hidden) {
                                    sum += data.datasets[tooltipItem.datasetIndex].data[i];
                                }
                            }
                            label += Math.round(10000 * data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum) / 100;
                            label += "%)";
                        }
                        return label;
                    }
                }
            },
            aspectRatio: 1.75,
            legend: {position: "right"}
        }
    });/**/

    var ctx = document.getElementById('svdt').getContext('2d');
    chartData.svdt = {
        labels: [
          "Failing at Scoring Note", "Scoring Note AMP","Scoring Note SPEAKER","Scoring Note TRAP", "Picking up Note", "Defense", "Chain", "Nothing"
        ],
        datasets: [{
            label: " Time",
            data: [
                avgSums(docs, "times", "L"),
                avgSums(docs, "times", "FC_CS") +
                avgSums(docs, "times", "FC_R1") +
                avgSums(docs, "times", "FC_R2") +
                avgSums(docs, "times", "FC_R3"),
                avgSums(docs, "times", "C_CS") +
                avgSums(docs, "times", "C_R1") +
                avgSums(docs, "times", "C_R2") +
                avgSums(docs, "times", "C_R3"),
                avgSums(docs, "times", "TC_CS") +
                avgSums(docs, "times", "TC_R1") +
                avgSums(docs, "times", "TC_R2") +
                avgSums(docs, "times", "TC_R3"),
                avgSums(docs, "times", "FH_CS") +
                avgSums(docs, "times", "FH_R1") +
                avgSums(docs, "times", "FH_R2") +
                avgSums(docs, "times", "FH_R3"),
                avgSums(docs, "times", "H_CS") +
                avgSums(docs, "times", "H_R1") +
                avgSums(docs, "times", "H_R2") +
                avgSums(docs, "times", "H_R3"),
                avgSums(docs, "times", "TH_CS") +
                avgSums(docs, "times", "TH_R1") +
                avgSums(docs, "times", "TH_R2") +
                avgSums(docs, "times", "TH_R3"),
                avgSums(docs, "times", "DF"),
                avgSums(docs, "times", "C"),
                avgSums(docs, "times", "N")
            ],
            backgroundColor: [
                "#ff0000", "#cc5200", "#ff6600", "#ffb380", "#cccc00", "#ffff00", "#ffff80", "#0000ff", "#9966ff", "#a6a6a6"
            ]
        }]
    };
    chart.svdt = new Chart(ctx, {
        type: "doughnut",
        data: chartData.svdt,
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index] || '';
                        if (label) {
                            label += ': ';
                            label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
                            label += " secs (";
                            sum = 0;
                            for (var i = 0; i < data.datasets[tooltipItem.datasetIndex].data.length; i++) {
                                var tmp = data.datasets[tooltipItem.datasetIndex]._meta;
                                if (!tmp[Object.keys(tmp)[0]].data[i].hidden) {
                                    sum += data.datasets[tooltipItem.datasetIndex].data[i];
                                }
                            }
                            label += Math.round(10000 * data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum) / 100;
                            label += "%)";
                        }
                        return label;
                    }
                }
            },
            aspectRatio: 1.75,
            legend: {position: "left"}
        }
    });
    var ctx = document.getElementById('svds').getContext('2d');
    chartData.svds = {
        labels: [
             "Scoring Note on AMP", "Scoring Note on SPEAKER", "Scoring Note on Trap, Climbing Chain"
        ],
        datasets: [{
            label: "Scoring Types by Score",
            data: [
                avgSums(docs, "scoring", "L"),
                avgSums(docs, "scoring", "C_CS") +
                avgSums(docs, "scoring", "C_R1") +
                avgSums(docs, "scoring", "C_R2") +
                avgSums(docs, "scoring", "C_R3"),
                avgSums(docs, "scoring", "H_CS") +
                avgSums(docs, "scoring", "H_R1") +
                avgSums(docs, "scoring", "H_R2") +
                avgSums(docs, "scoring", "H_R3"),
                avgSums(docs, "scoring", "C")
            ],
            backgroundColor: [
                "#ff0000", "#ff6600", "#ffff00", "#9966ff"
            ]
        }]
    };
    chart.svds = new Chart(ctx, {
        type: "doughnut",
        data: chartData.svds,
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index] || '';
                        if (label) {
                            label += ': ';
                            label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
                            label += " points (";
                            sum = 0;
                            for (var i = 0; i < data.datasets[tooltipItem.datasetIndex].data.length; i++) {
                                var tmp = data.datasets[tooltipItem.datasetIndex]._meta;
                                if (!tmp[Object.keys(tmp)[0]].data[i].hidden) {
                                    sum += data.datasets[tooltipItem.datasetIndex].data[i];
                                }
                            }
                            label += Math.round(10000 * data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / sum) / 100;
                            label += "%)";
                        }
                        return label;
                    }
                }
            },
            aspectRatio: 1.75,
            legend: {position: "right"}
        }
    });
    if (docs.length > 1) {
        var ctx = document.getElementById('sot').getContext('2d');
        chartData.sot = {
            datasets: [
                /*{
                    label: "Hab Line",
                    data: arrsDate(docs, "scoring", ["L"]),
                    borderColor: "#ff0000",
                    fill: false
                },*/
                {
                    label: "Note",
                    data: arrsDate(docs, "scoring", ["C_CS", "C_R1", "C_R2", "C_R3"]),
                    borderColor: "#ff6600",
                    fill: false
                },
                {
                    label: "Cube",
                    data: arrsDate(docs, "scoring", ["H_CS", "H_R1", "H_R2", "H_R3"]),
                    borderColor: "#ffff00",
                    fill: false
                },
                {
                    label: "Chain", // Climb
                    data: arrsDate(docs, "scoring", ["C"]),
                    borderColor: "#9966ff",
                    fill: false
                },
                {
                    label: "Total",
                    data: arrsDate(docs, "scoring", ["L", "C_CS", "C_R1", "C_R2", "C_R3", "H_CS", "H_R1", "H_R2", "H_R3", "C"]),
                    borderColor: "#000000",
                    fill: false
                }
            ]
        };
        chart.sot = new Chart(ctx, {
            type: "line",
            data: chartData.sot,
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        time: {
                            unit: 'week'
                        },
                        ticks: {
                            minRotation: 70,
                            maxRotation: 90
                        }
                    }]
                }
            }
        });
        var ctx = document.getElementById('cvhot').getContext('2d');
        chartData.cvhot = {
            datasets: [
               /* {
                    label: "Hab Line",
                    data: arrsDate(docs, "scoring", ["L"]),
                    borderColor: "#ff6600",
                    fill: false
                },*/
                {
                    label: "Grid Level 1",
                    data: arrsDate(docs, "scoring", ["C_R1", "H_R1"]),
                    borderColor: "#00ff00",
                    fill: false
                },
                {
                    label: "Grid Level 2",
                    data: arrsDate(docs, "scoring", ["C_R2", "H_R2"]),
                    borderColor: "#00ffff",
                    fill: false
                },
                {
                    label: "Grid Level 3",
                    data: arrsDate(docs, "scoring", ["C_R3", "H_R3"]),
                    borderColor: "#0000ff",
                    fill: false
                },
                {
                    label: "Climb",
                    data: arrsDate(docs, "scoring", ["C"]),
                    borderColor: "#9966ff",
                    fill: false
                },
                {
                    label: "Total",
                    data: arrsDate(docs, "scoring", ["L", "C_CS", "C_R1", "C_R2", "C_R3", "H_CS", "H_R1", "H_R2", "H_R3", "C"]),
                    borderColor: "#000000",
                    fill: false
                }
            ]
        };
        chart.cvhot = new Chart(ctx, {
            type: "line",
            data: chartData.cvhot,
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        time: {
                            unit: 'week'
                        },
                        ticks: {
                            minRotation: 70,
                            maxRotation: 90
                        }
                    }]
                }
            }
        });
    }
}
