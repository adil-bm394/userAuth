function fetchWithRetry(url, retries) {
  return new Promise((resolve, reject) => {
    const attemptFetch = (attemptsLeft) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          if (attemptsLeft === 0) {
            reject(
              new Error(
                `Failed to fetch data after ${retries} attempts: ${error.message}`
              )
            );
          } else {
            console.log(`Retrying... Attempts left: ${attemptsLeft}`);
            attemptFetch(attemptsLeft - 1);
          }
        });
    };

    attemptFetch(retries);
  });
}

fetchWithRetry("https://64c3af5b620f470f9014abc97971528a.api.mockbin.io/", 3)
  .then((data) => {
    console.log("Fetched data:", data);
  })
  .catch((error) => {
    console.error("Failed to fetch data:", error);
  });
