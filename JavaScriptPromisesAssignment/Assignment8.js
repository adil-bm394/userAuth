function fetchAnyWithErrors(urls) {
  return new Promise((resolve, reject) => {
    const fetchPromises = urls.map((url) =>
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    );

    Promise.allSettled(fetchPromises).then((results) => {
      const successfulResponses = results.filter(
        (result) => result.status === "fulfilled"
      );
      if (successfulResponses.length > 0) {
        resolve(successfulResponses[0].value);
      } else {
        const errors = results.map((result) => result.reason.message);
        reject(new Error(`All requests failed: ${errors.join(", ")}`));
      }
    });
  });
}

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

fetchAnyWithErrors(urls)
  .then((result) => {
    console.log("First successful response:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
