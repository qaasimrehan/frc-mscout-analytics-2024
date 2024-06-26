var process = (input) => {
    var doc = Object.assign({}, input);
    doc.times = {
        DF: 0,
        L: 0,
        C: 0,
        S_C_CS: 0, S_TC_CS: 0, S_FC_CS: 0,
        S_H_CS: 0, S_TH_CS: 0, S_FH_CS: 0,
        S_C_R1: 0, S_TC_R1: 0, S_FC_R1: 0,
        S_H_R1: 0, S_TH_R1: 0, S_FH_R1: 0,
        S_C_R2: 0, S_TC_R2: 0, S_FC_R2: 0,
        S_H_R2: 0, S_TH_R2: 0, S_FH_R2: 0,
        S_C_R3: 0, S_TC_R3: 0, S_FC_R3: 0,
        S_H_R3: 0, S_TH_R3: 0, S_FH_R3: 0,
        NS_C_CS: 0, NS_TC_CS: 0, NS_FC_CS: 0,
        NS_H_CS: 0, NS_TH_CS: 0, NS_FH_CS: 0,
        NS_C_R1: 0, NS_TC_R1: 0, NS_FC_R1: 0,
        NS_H_R1: 0, NS_TH_R1: 0, NS_FH_R1: 0,
        NS_C_R2: 0, NS_TC_R2: 0, NS_FC_R2: 0,
        NS_H_R2: 0, NS_TH_R2: 0, NS_FH_R2: 0,
        NS_C_R3: 0, NS_TC_R3: 0, NS_FC_R3: 0,
        NS_H_R3: 0, NS_TH_R3: 0, NS_FH_R3: 0,
        C_CS: 0, TC_CS: 0, FC_CS: 0,
        H_CS: 0, TH_CS: 0, FH_CS: 0,
        C_R1: 0, TC_R1: 0, FC_R1: 0,
        H_R1: 0, TH_R1: 0, FH_R1: 0,
        C_R2: 0, TC_R2: 0, FC_R2: 0,
        H_R2: 0, TH_R2: 0, FH_R2: 0,
        C_R3: 0, TC_R3: 0, FC_R3: 0,
        H_R3: 0, TH_R3: 0, FH_R3: 0,
        N: 0
    };
    doc.counts = {
        DF: 0,
        FC: 0,
        L: 0,
        C: 0,
        S_C_CS: 0, S_FC_CS: 0,
        S_H_CS: 0, S_FH_CS: 0,
        S_C_R1: 0, S_FC_R1: 0,
        S_H_R1: 0, S_FH_R1: 0,
        S_C_R2: 0, S_FC_R2: 0,
        S_H_R2: 0, S_FH_R2: 0,
        S_C_R3: 0, S_FC_R3: 0,
        S_H_R3: 0, S_FH_R3: 0,
        NS_C_CS: 0, NS_FC_CS: 0,
        NS_H_CS: 0, NS_FH_CS: 0,
        NS_C_R1: 0, NS_FC_R1: 0,
        NS_H_R1: 0, NS_FH_R1: 0,
        NS_C_R2: 0, NS_FC_R2: 0,
        NS_H_R2: 0, NS_FH_R2: 0,
        NS_C_R3: 0, NS_FC_R3: 0,
        NS_H_R3: 0, NS_FH_R3: 0,
        C_CS: 0, FC_CS: 0,
        H_CS: 0, FH_CS: 0,
        C_R1: 0, FC_R1: 0,
        H_R1: 0, FH_R1: 0,
        C_R2: 0, FC_R2: 0,
        H_R2: 0, FH_R2: 0,
        C_R3: 0, FC_R3: 0,
        H_R3: 0, FH_R3: 0
    };
    doc.scoring = {
        L: 0,
        C: 0,
        S_C_CS: 0,
        S_H_CS: 0,
        S_C_R1: 0,
        S_H_R1: 0,
        S_C_R2: 0,
        S_H_R2: 0,
        S_C_R3: 0,
        S_H_R3: 0,
        NS_C_CS: 0,
        NS_H_CS: 0,
        NS_C_R1: 0,
        NS_H_R1: 0,
        NS_C_R2: 0,
        NS_H_R2: 0,
        NS_C_R3: 0,
        NS_H_R3: 0,
        C_CS: 0,
        H_CS: 0,
        C_R1: 0,
        H_R1: 0,
        C_R2: 0,
        H_R2: 0,
        C_R3: 0,
        H_R3: 0
    };

    doc.times.L = doc.matchData.lineData.timeStamp;
    doc.counts.L = doc.matchData.lineData.level;
    doc.scoring.L = doc.matchData.lineData.level * 3;

    doc.times.C = doc.matchData.climbData.interval;
    doc.counts.C = doc.matchData.climbData.level;
    doc.scoring.C = doc.matchData.climbData.level * 3;
    if (doc.matchData.climbData.level == 3) {
        doc.scoring.C += 3;
    }

    for (var i = 0; i < doc.matchData.scoreData.length; i++) {
        var INF = doc.matchData.scoreData[i].intervalNoFail;
        var IWF = doc.matchData.scoreData[i].intervalWithFail;
        if (!doc.matchData.scoreData[i].failed) {
            if (doc.matchData.scoreData[i].objectType == "cargo") {
                if (doc.matchData.scoreData[i].scoreType == "cargoShip") {
                    doc.times.C_CS += INF;
                    doc.times.TC_CS += IWF - INF;
                    doc.counts.C_CS++;
                    doc.scoring.C_CS += 3;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket1") {
                    doc.times.C_R1 += INF;
                    doc.times.TC_R1 += IWF - INF;
                    doc.counts.C_R1++;
                    doc.scoring.C_R1 += 2;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket2") {
                    doc.times.C_R2 += INF;
                    doc.times.TC_R2 += IWF - INF;
                    doc.counts.C_R2++;
                    doc.scoring.C_R2 += 3;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket3") {
                    doc.times.C_R3 += INF;
                    doc.times.TC_R3 += IWF - INF;
                    doc.counts.C_R3++;
                    doc.scoring.C_R3 += 5;
                }
                if (doc.matchData.scoreData[i].timeStamp <= 15) {
                    if (doc.matchData.scoreData[i].scoreType == "cargoShip") {
                        doc.times.S_C_CS += INF;
                        doc.times.S_TC_CS += IWF - INF;
                        doc.counts.S_C_CS++;
                        doc.scoring.S_C_CS += 3;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket1") {
                        doc.times.S_C_R1 += INF;
                        doc.times.S_TC_R1 += IWF - INF;
                        doc.counts.S_C_R1++;
                        doc.scoring.S_C_R1 += 3;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket2") {
                        doc.times.S_C_R2 += INF;
                        doc.times.S_TC_R2 += IWF - INF;
                        doc.counts.S_C_R2++;
                        doc.scoring.S_C_R2 += 4;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket3") {
                        doc.times.S_C_R3 += INF;
                        doc.times.S_TC_R3 += IWF - INF;
                        doc.counts.S_C_R3++;
                        doc.scoring.S_C_R3 += 6;
                    }
                }
            } else {
                if (doc.matchData.scoreData[i].scoreType == "cargoShip") {
                    doc.times.H_CS += INF;
                    doc.times.TH_CS += IWF - INF;
                    doc.counts.H_CS++;
                    doc.scoring.H_CS += 2;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket1") {
                    doc.times.H_R1 += INF;
                    doc.times.TH_R1 += IWF - INF;
                    doc.counts.H_R1++;
                    doc.scoring.H_R1 += 2;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket2") {
                    doc.times.H_R2 += INF;
                    doc.times.TH_R2 += IWF - INF;
                    doc.counts.H_R2++;
                    doc.scoring.H_R2 += 3;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket3") {
                    doc.times.H_R3 += INF;
                    doc.times.TH_R3 += IWF - INF;
                    doc.counts.H_R3++;
                    doc.scoring.H_R3 += 5;
                }
                if (doc.matchData.scoreData[i].timeStamp <= 15) {
                    if (doc.matchData.scoreData[i].scoreType == "cargoShip") {
                        doc.times.S_H_CS += INF;
                        doc.times.S_TH_CS += IWF - INF;
                        doc.counts.S_H_CS++;
                        doc.scoring.S_H_CS += 2;
                        doc.times.C_CS += INF;
                        doc.times.TC_CS += IWF - INF;
                        doc.counts.C_CS++;
                        doc.scoring.C_CS += 3;
                        doc.times.S_C_CS += INF;
                        doc.times.S_TC_CS += IWF - INF;
                        doc.counts.S_C_CS++;
                        doc.scoring.S_C_CS += 3;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket1") {
                        doc.times.S_H_R1 += INF;
                        doc.times.S_TH_R1 += IWF - INF;
                        doc.counts.S_H_R1++;
                        doc.scoring.S_H_R1 += 3;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket2") {
                        doc.times.S_H_R2 += INF;
                        doc.times.S_TH_R2 += IWF - INF;
                        doc.counts.S_H_R2++;
                        doc.scoring.S_H_R2 += 4;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket3") {
                        doc.times.S_H_R3 += INF;
                        doc.times.S_TH_R3 += IWF - INF;
                        doc.counts.S_H_R3++;
                        doc.scoring.S_H_R3 += 6;
                    }
                }
            }
        } else {
            if (doc.matchData.scoreData[i].objectType == "cargo") {
                if (doc.matchData.scoreData[i].scoreType == "cargoShip") {
                    doc.times.FC_CS += INF;
                    doc.times.TC_CS += IWF - INF;
                    doc.counts.FC_CS++;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket1") {
                    doc.times.FC_R1 += INF;
                    doc.times.TC_R1 += IWF - INF;
                    doc.counts.FC_R1++;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket2") {
                    doc.times.FC_R2 += INF;
                    doc.times.TC_R2 += IWF - INF;
                    doc.counts.FC_R2++;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket3") {
                    doc.times.FC_R3 += INF;
                    doc.times.TC_R3 += IWF - INF;
                    doc.counts.FC_R3++;
                }
                if (doc.matchData.scoreData[i].timeStamp <= 15) {
                    if (doc.matchData.scoreData[i].scoreType == "cargoShip") {
                        doc.times.S_FC_CS += INF;
                        doc.times.S_TC_CS += IWF - INF;
                        doc.counts.S_FC_CS++;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket1") {
                        doc.times.S_FC_R1 += INF;
                        doc.times.S_TC_R1 += IWF - INF;
                        doc.counts.S_FC_R1++;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket2") {
                        doc.times.S_FC_R2 += INF;
                        doc.times.S_TC_R2 += IWF - INF;
                        doc.counts.S_FC_R2++;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket3") {
                        doc.times.S_FC_R3 += INF;
                        doc.times.S_TC_R3 += IWF - INF;
                        doc.counts.S_FC_R3++;
                    }
                }
            } else {
                if (doc.matchData.scoreData[i].scoreType == "cargoShip") {
                    doc.times.FH_CS += INF;
                    doc.times.TH_CS += IWF - INF;
                    doc.counts.FH_CS++;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket1") {
                    doc.times.FH_R1 += INF;
                    doc.times.TH_R1 += IWF - INF;
                    doc.counts.FH_R1++;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket2") {
                    doc.times.FH_R2 += INF;
                    doc.times.TH_R2 += IWF - INF;
                    doc.counts.FH_R2++;
                } else if (doc.matchData.scoreData[i].scoreType == "rocket3") {
                    doc.times.FH_R3 += INF;
                    doc.times.TH_R3 += IWF - INF;
                    doc.counts.FH_R3++;
                }
                if (doc.matchData.scoreData[i].timeStamp <= 15) {
                    if (doc.matchData.scoreData[i].scoreType == "cargoShip") {
                        doc.times.S_FH_CS += INF;
                        doc.times.S_TH_CS += IWF - INF;
                        doc.counts.S_FH_CS++;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket1") {
                        doc.times.S_FH_R1 += INF;
                        doc.times.S_TH_R1 += IWF - INF;
                        doc.counts.S_FH_R1++;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket2") {
                        doc.times.S_FH_R2 += INF;
                        doc.times.S_TH_R2 += IWF - INF;
                        doc.counts.S_FH_R2++;
                    } else if (doc.matchData.scoreData[i].scoreType == "rocket3") {
                        doc.times.S_FH_R3 += INF;
                        doc.times.S_TH_R3 += IWF - INF;
                        doc.counts.S_FH_R3++;
                    }
                }
            }
        }
    }
    for (var j = 0; j < doc.matchData.defenseData.defense.length; j++) {
        doc.times.DF += doc.matchData.defenseData.defense[j].interval;
        doc.counts.DF++;
    }
    doc.times.NS_C_CS = doc.times.C_CS - doc.times.S_C_CS;
    doc.times.NS_TC_CS = doc.times.TC_CS - doc.times.S_TC_CS;
    doc.times.NS_FC_CS = doc.times.FC_CS - doc.times.S_FC_CS;
    doc.times.NS_C_R1 = doc.times.C_R1 - doc.times.S_C_R1;
    doc.times.NS_TC_R1 = doc.times.TC_R1 - doc.times.S_TC_R1;
    doc.times.NS_FC_R1 = doc.times.FC_R1 - doc.times.S_FC_R1;
    doc.times.NS_C_R2 = doc.times.C_R2 - doc.times.S_C_R2;
    doc.times.NS_TC_R2 = doc.times.TC_R2 - doc.times.S_TC_R2;
    doc.times.NS_FC_R2 = doc.times.FC_R2 - doc.times.S_FC_R2;
    doc.times.NS_C_R3 = doc.times.C_R3 - doc.times.S_C_R3;
    doc.times.NS_TC_R3 = doc.times.TC_R3 - doc.times.S_TC_R3;
    doc.times.NS_FC_R3 = doc.times.FC_R3 - doc.times.S_FC_R3;
    doc.times.NS_H_CS = doc.times.H_CS - doc.times.S_H_CS;
    doc.times.NS_TH_CS = doc.times.TH_CS - doc.times.S_TH_CS;
    doc.times.NS_FH_CS = doc.times.FH_CS - doc.times.S_FH_CS;
    doc.times.NS_H_R1 = doc.times.H_R1 - doc.times.S_H_R1;
    doc.times.NS_TH_R1 = doc.times.TH_R1 - doc.times.S_TH_R1;
    doc.times.NS_FH_R1 = doc.times.FH_R1 - doc.times.S_FH_R1;
    doc.times.NS_H_R2 = doc.times.H_R2 - doc.times.S_H_R2;
    doc.times.NS_TH_R2 = doc.times.TH_R2 - doc.times.S_TH_R2;
    doc.times.NS_FH_R2 = doc.times.FH_R2 - doc.times.S_FH_R2;
    doc.times.NS_H_R3 = doc.times.H_R3 - doc.times.S_H_R3;
    doc.times.NS_TH_R3 = doc.times.TH_R3 - doc.times.S_TH_R3;
    doc.times.NS_FH_R3 = doc.times.FH_R3 - doc.times.S_FH_R3;

    doc.counts.NS_C_CS = doc.counts.C_CS - doc.counts.S_C_CS;
    doc.counts.NS_FC_CS = doc.counts.FC_CS - doc.counts.S_FC_CS;
    doc.counts.NS_C_R1 = doc.counts.C_R1 - doc.counts.S_C_R1;
    doc.counts.NS_FC_R1 = doc.counts.FC_R1 - doc.counts.S_FC_R1;
    doc.counts.NS_C_R2 = doc.counts.C_R2 - doc.counts.S_C_R2;
    doc.counts.NS_FC_R2 = doc.counts.FC_R2 - doc.counts.S_FC_R2;
    doc.counts.NS_C_R3 = doc.counts.C_R3 - doc.counts.S_C_R3;
    doc.counts.NS_FC_R3 = doc.counts.FC_R3 - doc.counts.S_FC_R3;
    doc.counts.NS_H_CS = doc.counts.H_CS - doc.counts.S_H_CS;
    doc.counts.NS_FH_CS = doc.counts.FH_CS - doc.counts.S_FH_CS;
    doc.counts.NS_H_R1 = doc.counts.H_R1 - doc.counts.S_H_R1;
    doc.counts.NS_FH_R1 = doc.counts.FH_R1 - doc.counts.S_FH_R1;
    doc.counts.NS_H_R2 = doc.counts.H_R2 - doc.counts.S_H_R2;
    doc.counts.NS_FH_R2 = doc.counts.FH_R2 - doc.counts.S_FH_R2;
    doc.counts.NS_H_R3 = doc.counts.H_R3 - doc.counts.S_H_R3;
    doc.counts.NS_FH_R3 = doc.counts.FH_R3 - doc.counts.S_FH_R3;

    doc.scoring.NS_C_CS = doc.scoring.C_CS - doc.scoring.S_C_CS;
    doc.scoring.NS_C_R1 = doc.scoring.C_R1 - doc.scoring.S_C_R1;
    doc.scoring.NS_C_R2 = doc.scoring.C_R2 - doc.scoring.S_C_R2;
    doc.scoring.NS_C_R3 = doc.scoring.C_R3 - doc.scoring.S_C_R3;
    doc.scoring.NS_H_CS = doc.scoring.H_CS - doc.scoring.S_H_CS;
    doc.scoring.NS_H_R1 = doc.scoring.H_R1 - doc.scoring.S_H_R1;
    doc.scoring.NS_H_R2 = doc.scoring.H_R2 - doc.scoring.S_H_R2;
    doc.scoring.NS_H_R3 = doc.scoring.H_R3 - doc.scoring.S_H_R3;

    doc.times.N = 150 - doc.times.DF - doc.times.L - doc.times.C;
    doc.times.N = doc.times.N - doc.times.C_CS - doc.times.TC_CS - doc.times.FC_CS;
    doc.times.N = doc.times.N - doc.times.H_CS - doc.times.TH_CS - doc.times.FH_CS;
    doc.times.N = doc.times.N - doc.times.C_R1 - doc.times.TC_R1 - doc.times.FC_R1;
    doc.times.N = doc.times.N - doc.times.H_R1 - doc.times.TH_R1 - doc.times.FH_R1;
    doc.times.N = doc.times.N - doc.times.C_R2 - doc.times.TC_R2 - doc.times.FC_R2;
    doc.times.N = doc.times.N - doc.times.H_R2 - doc.times.TH_R2 - doc.times.FH_R2;
    doc.times.N = doc.times.N - doc.times.C_R3 - doc.times.TC_R3 - doc.times.FC_R3;
    doc.times.N = doc.times.N - doc.times.H_R3 - doc.times.TH_R3 - doc.times.FH_R3;
    return doc;
}

var sums = (docs, arg1, arg2) => {
    var sum = 0;
    for (var i = 0; i < docs.length; i++) {
        sum += docs[i][arg1][arg2];
    }
    return sum;
}

var avgSums = (docs, arg1, arg2) => {
    return sums(docs, arg1, arg2) / docs.length;
}

var arrs = (docs, arg1, arg2) => {
    var res = [];
    for (var i = 0; i < docs.length; i++) {
        res.push(docs[i][arg1][arg2]);
    }
    return res;
}
var arrsDate = (docs, arg1, arrArg2) => {
    var res = [];
    for (var i = 0; i < docs.length; i++) {
        var sum = 0;
        for (var j = 0; j < arrArg2.length; j++) {
            sum += docs[i][arg1][arrArg2[j]];
        }
        res.push({
            t: docs[i].timeStamp,
            y: sum
        });
    }
    res.sort((a, b) => {
        return a.t - b.t;
    })
    return res;
}
