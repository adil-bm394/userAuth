async function fetchWithExponentialBackoff(url, maxRetries) {
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      attempt++;

      if (attempt > maxRetries) {
        throw new Error(`Failed to fetch ${url} after ${maxRetries} retries.`);
      }

      const delay = Math.pow(2, attempt) * 100; 
      console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

const url = "https://jsonplaceholder.typicode.com/posts/1";
const maxRetries = 5;

fetchWithExponentialBackoff(url, maxRetries)
  .then((data) => {
    console.log("Fetched data:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
