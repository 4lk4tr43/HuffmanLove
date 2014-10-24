/// <reference path="Huffman.ts" />
/// <reference path="FileHelpers.ts" />
function Decode() {
    var outText = document.getElementById("Text");

    outText.innerHTML = "";

    var frequencyString = document.getElementById("Frequencies")["value"];
    var frequencyStrings = frequencyString.split("\n");
    var frequencyPairs = [];
    for (var i = 0; i < frequencyStrings.length; i++) {
        var s = frequencyStrings[i];
        if (s.indexOf(":") != -1)
            frequencyPairs.push(s.trim());
    }
    frequencyPairs.sort(Huffman.CompareFrequencies);
    var frequencyMap = {};
    for (var i = 0; i < frequencyPairs.length; i++) {
        var s = frequencyPairs[i];
        var l = s.lastIndexOf(":");
        var value;
        if (l == 0) {
            value = " ";
        } else {
            value = s.substring(0, l);
            if (l > 1) {
                if (value == "\\n")
                    value = "\n";
                else if (value == "\\r")
                    value = "\r";
            }
        }
        frequencyMap[value] = parseInt(s.substring(l + 1));
    }

    var frequenciesAscending = Huffman.GetAscendingFrequenciesArray(frequencyMap);
    var tree = Huffman.GetHuffmanTree(frequenciesAscending);
    var bitString = document.getElementById("Bits")["value"];
    var data = Huffman.Decode(bitString, tree);
    var html = data.replace(/\n/g, "<br>").replace(/\r/g, "<div></div>");
    outText.innerHTML = html;
}

function UploadBits() {
    FileHelpers.GetAsString(document.getElementById("BitsFile"), function (e) {
        document.getElementById("Bits")["value"] = e["target"].result;
    });
}

function UploadFrequencies() {
    FileHelpers.GetAsString(document.getElementById("FrequenciesFile"), function (e) {
        document.getElementById("Frequencies")["value"] = e["target"].result;
    });
}

var textFile = undefined;
function DownloadText() {
    if (textFile != undefined)
        FileHelpers.RevokeUrlFile(textFile);
    var e = document.getElementById("Text");
    var data = e.innerHTML.replace(/<br>/g, "\n").replace(/<div><\/div>/g, "\r");
    textFile = FileHelpers.DownloadAsStringFile("Text.txt", data);
}
//# sourceMappingURL=Decode.js.map
