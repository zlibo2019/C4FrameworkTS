
function GetRunParams() {
    console.log(JSON.stringify(process.argv));
    console.log(JSON.stringify(process.execArgv));
}

GetRunParams();
