function fetchAllWithErrors(urls) {
  return new Promise((resolve, reject) => {
    Promise.all(
      urls.map((url) =>
        fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      )
    )
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
}

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

fetchAllWithErrors(urls)
  .then((results) => {
    console.log("All data fetched successfully:", results);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
