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
        var value = l == 0 ? " " : s.substring(0, l);
        frequencyMap[value] = parseInt(s.substring(l + 1));
    }

    var frequenciesAscending = Huffman.GetAscendingFrequenciesArray(frequencyMap);
    var tree = Huffman.GetHuffmanTree(frequenciesAscending);
    var bitString = document.getElementById("Bits")["value"];
    outText.innerText = Huffman.Decode(bitString, tree);
}

function UploadBits() {
    FileHelpers.GetAsString(document.getElementById("BitsFile"), function (e) {
        document.getElementById("Bits")["value"] = e.srcElement.result;
    });
}

function UploadFrequencies() {
    FileHelpers.GetAsString(document.getElementById("FrequenciesFile"), function (e) {
        document.getElementById("Frequencies")["value"] = e.srcElement.result;
    });
}

var textFile = undefined;
function DownloadText() {
    if (textFile != undefined)
        FileHelpers.RevokeUrlFile(textFile);
    textFile = FileHelpers.DownloadAsStringFile("Text.txt", document.getElementById("Text").innerText);
}
//# sourceMappingURL=Decode.js.map
