
   
const fs = require('fs');
const readline = require("readline");
const prompt = require('prompt');
const rl = readline.createInterface({ //creating an instance of readline
    input: process.stdin, // configuring the readable streams
    output: process.stdout // configuring the writable streams
});

rl.question(" Enter file Path please: ", function(filePath) {
    if(filePath.match(/.json$/)) { // to ensure that the file is json
    let rawdata = fs.readFileSync(filePath);
    let obj = JSON.parse(rawdata);
    const cTable = require('console.table');
    console.table(obj.users);
  
    

    rl.question(" Enter userId you need to update: ", function(id1) {
        prompt.start();
        prompt.get(['firstname', 'lastname', 'phonenumber', 'emailaddress'], function (err, result) {
            if (err) { return onErr(err); }
            for (var i in obj.users) {
                if (obj.users[i].userId == id1) {
                    Object.assign(obj.users[i], {firstName:result.firstname, lastName:result.lastname, phoneNumber:result.phonenumber, emailAddress:result.emailaddress });
                    let data = JSON.stringify(obj);
                        fs.writeFile(filePath, data,(err) => {
                        if (err) throw err;
                        console.log('Data written to file');
                        rl.close();
                    });
                }
            }
        });
       });
    
}
    
    else {
        console.log("invalid file type");
        rl.close();
    }
});

rl.on("close", function() {
    process.exit(0);
});