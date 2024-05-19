function formatText(command) {
    document.execCommand(command, false, null);
}

function setColor(command, color) {
    document.execCommand(command, false, color);
}

function setFontSize(size) {
    document.execCommand('fontSize', false, size);
}