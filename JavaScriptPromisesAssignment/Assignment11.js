async function batchFetch(urls, batchSize) {
  const results = [];

  const fetchBatch = async (batch) => {
    const promises = batch.map((url) =>
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    );
    return Promise.all(promises);
  };

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    try {
      const batchResults = await fetchBatch(batch);
      results.push(...batchResults);
    } catch (error) {
      console.error("Batch fetch error:", error);
    }
  }

  return results;
}

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
  "https://jsonplaceholder.typicode.com/posts/6",
];

const batchSize = 2;

batchFetch(urls, batchSize)
  .then((results) => {
    console.log("All results:", results);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
