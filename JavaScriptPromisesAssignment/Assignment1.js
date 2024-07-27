console.log("Program started");
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject("Rejected after 2 seconds"), 2000);
  setTimeout(() => resolve("Resolved after 3 seconds"), 3000);
});
console.log("Program in progress...");
myPromise
  .then((result) => {
    console.log(result);
    console.log("Program complete");
  })
  .catch((error) => {
    console.log(error);
    console.log("Program failure");
  });
