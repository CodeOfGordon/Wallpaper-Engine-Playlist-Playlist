function download_file(file_content, name_playlist, file_ext){
    // Downloads the file depending on the file extension  (Shoutout to uidotdev https://youtu.be/io2blfAlO6E)
    // (str, str, str) -> None

    // -- Create blob
    var data = file_content;

    var blob = new Blob(
    [data],
    {type: 'text/plain'}
    );
    var href = URL.createObjectURL(blob);

    // -- Create download
    var a = Object.assign(document.createElement('a'), { // Object.assign(target, source)
        href,
        style: 'display:none',
        download: `${name_playlist}.${file_ext}`,
    }); 
    document.body.appendChild(a);

    
    // -- Download
    a.click();

    // -- Clean up
    URL.revokeObjectURL(href);
    a.remove();
    
};


function createVBScript(playlist_name,batchDirectory){
    // Downloads a vbscript file
    // (str, str) -> none

    var data = (`Set WshShell = CreateObject("WScript.Shell" ) \n\
WshShell.Run chr(34) & "${batchDirectory}\\${playlist_name}.bat" & Chr(34), 0 \n\
Set WshShell = Nothing`);
    var file_ext = "vbs";

    download_file(data, playlist_name, file_ext);
};

function submission2() {

    var directoryBatch = document.getElementById("batch-input").value;
    var playlist_name = document.getElementById("playlist").value;
    
    createVBScript(playlist_name, directoryBatch);

    localStorage.clear();
    console.log("VBScript file created");
};


console.log(localStorage.getItem("name"));
document.getElementById("playlist").innerHTML = localStorage.getItem("name");
document.getElementById("playlist").value = localStorage.getItem("name");