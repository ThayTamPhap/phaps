document.getElementById("downloadButton").addEventListener("click", z);
  
const downloadLink = document.createElement("a");
document.body.appendChild(downloadLink);

async function z(event) {
    event.preventDefault();
    await saveAll();

    var str = "";
    for (var i = 0; i < subsCount; i++) {
        str = str + `${await loadTime(i)} ${await loadText(i)}\n`;
    }
    copyToClipboard(str);

    var file = new Blob([str], {type: 'text/plain'});
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = phapname.split("/")[1] + '.txt';
    downloadLink.target = '_blank';
    downloadLink.click();
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};