

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


function createBatch(playlist_name, wp_engine_directory){
    // Downloads a batch file
    // (str, str) -> none

    var data = (`@ECHO off \n
set playlist-name=${playlist_name}
set FileDirectory=${wp_engine_directory} \n
%FileDirectory% -control openPlaylist -playlist %playlist-name%
exit`);
    var file_ext = "bat";

    download_file(data, playlist_name, file_ext);
};


/*
function create_zip(name_playlist, directory, directoryBatch){
    // Adds a file to a zip file (Shoutout to Vincent Lab https://youtu.be/N1I2e-_1cIY)
    // (str, str, str) -> None

    console.log("Creating zip file");
    // Initialize content for zip files
    var [batch_data, batch_ext] = createBatch(name_playlist, directory);
    var [vbscript_data, vbscript_ext] = createVBScript(directoryBatch);

    var zip_content = [batch_data, vbscript_data];
    var zip_ext = [batch_ext, vbscript_ext];

    // Initialize zip file
    var zip = new JSZip();
    
    // Add files to zip file
    for(let i = 0; i < zip_content.length; i++){
        zip.file(`${name_playlist}.${zip_ext[i]}`, zip_content[i]);
    };

    
    // Creates buffer for zip file
    console.log("hi");

};
*/

function submission() {

    var directory = document.getElementById("directory-input").value;
    var playlist_name = document.getElementById("playlist").value;
    
    createBatch(playlist_name, directory);

    localStorage.setItem("name", playlist_name);

    console.log("Batch file created");
};
