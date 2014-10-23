/// <reference path="Huffman.ts" />
/// <reference path="FileHelpers.ts" />

function Encode() {
    var frequenciesUl = document.getElementById("Frequencies");
    var bitsDiv = document.getElementById("Bits");
    frequenciesUl.innerHTML = "";
    bitsDiv.innerHTML = "";

    var text = document.getElementById("Text")["value"];

    var frequencyMap = Huffman.GetFrequenciesMap(text);
    var frequenciesAscending = Huffman.GetAscendingFrequenciesArray(frequencyMap);

    var tree = Huffman.GetHuffmanTree(frequenciesAscending);


    for (var i = frequenciesAscending.length - 1; i >= 0; i--) {
        var frequency = frequenciesAscending[i];
        var li = document.createElement("li");
        li.innerHTML = frequency.char + ":" + frequency.count;
        frequenciesUl.appendChild(li);
    }

    var pathMap = Huffman.GetPathMap(tree);
    bitsDiv.innerHTML = Huffman.Encode(text, pathMap);
}

function UploadText() {
    FileHelpers.GetAsString(document.getElementById("TextFile"), function (e) {
        document.getElementById("Text")["value"] = e.srcElement.result;
    });
}

var bitsFile = undefined;
function DownloadBits() {
    if (bitsFile != undefined)
        FileHelpers.RevokeUrlFile(bitsFile);
    bitsFile = FileHelpers.DownloadAsStringFile("Bits.txt", document.getElementById("Bits").innerText);
}

var frequenciesFile = undefined;
function DownloadFrequencies() {
    if (frequenciesFile != undefined)
        FileHelpers.RevokeUrlFile(frequenciesFile);
    frequenciesFile = FileHelpers.DownloadAsStringFile("Frequencies.txt", document.getElementById("Frequencies").innerText);
}