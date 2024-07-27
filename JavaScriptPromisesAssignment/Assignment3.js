console.log("Program started");

const initialPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ data: "Hello, friend!", error: null });
  }, 5000);
});

console.log("Program in progress...");

initialPromise
  .then((result) => {
    console.log(result);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("First promise chain complete!");
      }, 2000);
    });
  })
  .then((message) => {
    console.log(message);
  });

initialPromise
  .then((result) => {
    console.log(result);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Second promise chain complete!");
      }, 10000);
    });
  })
  .then((message) => {
    console.log(message);
  });
