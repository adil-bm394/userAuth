async function fetchWithFallback(urls) {
  const results = await Promise.allSettled(
    urls.map((url) =>
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    )
  );

  const successfulResults = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  if (successfulResults.length === 0) {
    throw new Error("All fetches failed.");
  }

  return successfulResults;
}

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

fetchWithFallback(urls)
  .then((results) => {
    console.log("Fetched data:", results);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
