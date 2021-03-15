/**
 * @author Pamontep Panya
 * @email pamontep.p@gmail.com
 * @create date 2018-06-01 01:05:05
 * @modify date 2018-06-01 01:05:05
 * @desc Status class used to be a sample class for NodeJS API
*/

const fs = require('fs');
const statusFilePath = __dirname + '/../../files/status.txt';

class Status {
    constructor () {}

    /**
     * TODO: Get latest status from File
     */
    getStatusFromFile() {
        let self = this;
        return new Promise(function (resolve, reject) {
            try {
                return self.checkFileExist().then(function (rsCheckFileExist) {
                    if (typeof rsCheckFileExist === 'boolean' && rsCheckFileExist === true) {
                        self.setStatus().then(function (rsSetStatus) {
                            if (typeof rsSetStatus.result === 'boolean' && rsSetStatus.result === true) {
                                return resolve({
                                    result: true,
                                    data: rsSetStatus.mode,
                                    message: 'Successful!'
                                });
                            }
                            else {
                                return resolve({
                                    result: false,
                                    message: 'Error! Cannot read text file!'
                                });
                            }
                        });
                    }
                    else {
                        return resolve({
                            result: false,
                            message: 'Error! Cannot read status.txt file!'
                        });
                    }
                });
            }
            catch (e) {
                console.log(`Catch on getStatusFromFile(), e: ${ e }`);
                return reject(e);
            }
        });
    }

    /**
     * TODO: Check status text file exist and create if it doesn't exist
     */
    checkFileExist() {
        return new Promise(function (resolve, reject) {
            try {
                if (fs.existsSync(statusFilePath)) {
                    console.log('File exist!');
                    return resolve(true);
                }
                else {
                    console.log('File doesn\'t exist! Creating status.txt file.');
                    return fs.writeFile(statusFilePath, 0, function(err) {
					    if (err) {
					        throw err;
					        return reject(err);
					    }

					    return resolve(true);
					}); 
                }
            }
            catch (e) {
                console.log(`Catch on checkFileExist(), e: ${ e }`);
                return reject(e);
            }
        });
    }

    /**
     * TODO: Read and set status data into physical file
     */
    setStatus() {
        return new Promise(function (resolve, reject) {
            try {
                return fs.readFile(statusFilePath, function read(err, data) {
				    if (err) {
				        throw err;
				        return reject(err);
				    }

				    let mode = data.toString();

				    mode = (mode == 0 ? 1 : 0);

				    return fs.writeFile(statusFilePath, mode, function(err) {
					    if (err) {
					        throw err;
					        return reject(err);
					    }

					    return resolve({result : true, mode : mode});
					}); 
				});
            }
            catch (e) {
                console.log(`Catch on setStatus(), e: ${ e }`);
                return reject(e);
            }
        });
    }
}

module.exports = new Status();