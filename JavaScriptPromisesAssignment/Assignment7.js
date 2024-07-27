function fetchWithRace(urls, timeout) {
  return new Promise((resolve, reject) => {
    const timeoutPromise = new Promise((_, rejectTimeout) =>
      setTimeout(() => rejectTimeout(new Error("Request timed out")), timeout)
    );

    const fetchPromises = urls.map((url) =>
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    );
    Promise.race([timeoutPromise, ...fetchPromises])
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];
const timeout = 5000;

fetchWithRace(urls, timeout)
  .then((result) => {
    console.log("First successful response:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
