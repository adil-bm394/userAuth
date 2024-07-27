// promises>>setTimeout() (priority)

//Promise
function createPromise() {
  console.log("dkddjdjdjdjdjd");
  return new Promise(function exec(resolve, reject) {
    console.log("Resolving the promise");
    setTimeout(() => {
      resolve("Done");
    }, 0);
  });
}

setTimeout(function process() {
  console.log("Timer1 completed");
}, 0);

let p = createPromise();

setTimeout(function process() {
  console.log("Timer2 completed");
}, 0);

p.then(
  function fulfillHandler1(value) {
    console.log("we fulfilled1 with a value", value);
  },
  function rejectHandler() {}
);
p.then(
  function fulfillHandler2(value) {
    console.log("we fulfilled2 with a value", value);
  },
  function rejectHandler() {}
);
p.then(
  function fulfillHandler3(value) {
    console.log("we fulfilled3 with a value", value);
  },
  function rejectHandler() {}
);


//Convert .then .cath into Async Await
const download = (url) => {
  console.log(`Starting to download data from ${url}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Downloading completed");
      const content = "ABCDEF";
      resolve(content);
    }, 10000);
  });
};
const writeFile = (data) => {
  console.log(`Started writing a file with ${data}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Completed writing the data in a file");
      const filename = "file.txt";
      resolve(filename);
    }, 5000);
  });
};
const upload = (url, file) => {
  console.log(`Started uploading ${file} on ${url}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Upload completed");
      const response = "SUCCESS";
      resolve(response);
    }, 2000);
  });
};
const CallingFunction = async () => {
  try {
    const resultDownload = await download("www.xyz.com");
    console.log("We are now going to process the downloaded data");
    const resultWrite = await writeFile(resultDownload);
    console.log("We have downloaded and written the file, now will upload");
    const result = await upload("www.upload.com", resultWrite);
    console.log("We have uploaded with", result);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
};