var FileHelpers = (function () {
    function FileHelpers() {
    }
    FileHelpers.GetAsString = function (fileInput, completed, fileIndex) {
        if (typeof fileIndex === "undefined") { fileIndex = 0; }
        var file = fileInput["files"][fileIndex];
        if (file == undefined)
            throw new Error("No file selected");
        var fileReader = new FileReader();
        fileReader.onload = completed;
        fileReader.readAsText(file, "UTF-8");
    };

    FileHelpers.DownloadAsStringFile = function (fileName, data) {
        var blob = new Blob([data], { type: "text/plain", encoding: "UTF-8" });
        if (window.navigator.msSaveOrOpenBlob != undefined) {
            var success = window.navigator.msSaveOrOpenBlob(blob, fileName);
            if (success == false)
                alert("Internet Explorer failed to download file.");
        } else {
            var objectUrl = window["URL"].createObjectURL(blob);
            var downloadAnchor = document.createElement("a");
            downloadAnchor.setAttribute("style", "display:none");
            downloadAnchor.setAttribute("download", fileName);
            downloadAnchor.setAttribute("href", objectUrl);
            document.body.appendChild(downloadAnchor);
            if (downloadAnchor.click != undefined)
                downloadAnchor.click();
            else {
                var clickEvent = document.createEvent("MouseEvents");
                clickEvent["initMouseEvent"]("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                downloadAnchor.dispatchEvent(clickEvent);
            }
            document.body.removeChild(downloadAnchor);
            return objectUrl;
        }
    };

    FileHelpers.RevokeUrlFile = function (objectUrl) {
        window["URL"].revokeObjectURL(objectUrl);
    };
    return FileHelpers;
})();
//# sourceMappingURL=FileHelpers.js.map
