// CallBAck

function download(url, cb) {
  /**
   * Downloads content from the given url and passed the
   * downloaded content to the given callback cb
   */
  console.log("Starting to download data from", url);
  setTimeout(function down() {
    console.log("Downloading completed");
    const content = "ABCDEF"; // assume dummy download content
    cb(content);
  }, 10000);
}
function writeFile(data, cb) {
  /**
   * writes the given data into a new file
   */
  console.log("Started writing a file with", data);
  setTimeout(function wrtie() {
    console.log("Completed writing the data in a file");
    const filename = "file.txt";
    cb(filename);
  }, 5000);
}
function upload(url, file, cb) {
  /**
   * uploads the data from a file to a given url
   */
  console.log("Started uploading", file, "on", url);
  setTimeout(function up() {
    console.log("upload completed");
    const response = "SUCCESS";
    cb(response);
  }, 2000);
}
download("www.xyz.com", function processDownload(content) {
  console.log("We are now going to process the downloaded data");
  writeFile(content, function processWrite(filename) {
    console.log("We have downloaded and written the file, now will upload");
    upload("www.upload.com", filename, function processUpload(response) {
      console.log("we have uploaded with", response);
    });
  });
});

//Convert into Promise

const download = (url) => {
  console.log("Starting to download data from", url);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Downloading completed");
      const content = "ABCDEF";
      resolve(content);
    }, 10000);
  });
};
const writeFile = (data) => {
  console.log("Started writing a file with", data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Completed writing the data in a file");
      const filename = "file.txt";
      resolve(filename);
    }, 5000);
  });
};
const upload = (url, file) => {
  console.log("Started uploading", file, "on", url);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Upload completed");
      const response = "SUCCESS";
      resolve(response);
    }, 2000);
  });
};
download("www.xyz.com")
  .then((content) => {
    console.log("We are now going to process the downloaded data");
    return writeFile(content);
  })
  .then((filename) => {
    console.log("We have downloaded and written the file, now will upload");
    return upload("www.upload.com", filename);
  })
  .then((response) => {
    console.log("We have uploaded with", response);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });