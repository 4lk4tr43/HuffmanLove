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
        var value = frequency.char;
        if (value == "\n")
            value = "\\n";
        else if (value == "\r")
            value = "\\r";
        li.innerHTML = value + ":" + frequency.count;
        frequenciesUl.appendChild(li);
    }

    var pathMap = Huffman.GetPathMap(tree);
    bitsDiv.innerHTML = Huffman.Encode(text, pathMap);
}

function UploadText() {
    FileHelpers.GetAsString(document.getElementById("TextFile"), function (e) {
        document.getElementById("Text")["value"] = e["target"].result;
    });
}

var bitsFile = undefined;
function DownloadBits() {
    if (bitsFile != undefined)
        FileHelpers.RevokeUrlFile(bitsFile);
    var e = document.getElementById("Bits");
    bitsFile = FileHelpers.DownloadAsStringFile("Bits.txt", e.innerHTML);
}

var frequenciesFile = undefined;
function DownloadFrequencies() {
    if (frequenciesFile != undefined)
        FileHelpers.RevokeUrlFile(frequenciesFile);
    var e = document.getElementById("Frequencies");
    var data = "";

    for (var i = 0; i < e.children.length; i++) {
        var child = e.children[i];
        data += (child.innerHTML);
        data += i == (e.children.length - 1) ? "" : "\n";
    }
    frequenciesFile = FileHelpers.DownloadAsStringFile("Frequencies.txt", data);
}
//# sourceMappingURL=Encode.js.map
