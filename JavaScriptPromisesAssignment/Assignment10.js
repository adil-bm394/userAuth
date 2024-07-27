async function conditionalChaining(initialUrl, secondaryUrl1, secondaryUrl2) {
  try {
    const initialResponse = await fetch(initialUrl);
    if (!initialResponse.ok) {
      throw new Error(`HTTP error! status: ${initialResponse.status}`);
    }
    const initialData = await initialResponse.json();

    let secondaryUrl;
    if (initialData.condition === "someCondition") {
      secondaryUrl = secondaryUrl1;
    } else {
      secondaryUrl = secondaryUrl2;
    }

    const secondaryResponse = await fetch(secondaryUrl);
    if (!secondaryResponse.ok) {
      throw new Error(`HTTP error! status: ${secondaryResponse.status}`);
    }
    const secondaryData = await secondaryResponse.json();
    return {
      initialData,
      secondaryData,
    };
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}

const initialUrl = "https://jsonplaceholder.typicode.com/posts/1";
const secondaryUrl1 = "https://jsonplaceholder.typicode.com/posts/2";
const secondaryUrl2 = "https://jsonplaceholder.typicode.com/posts/3";

conditionalChaining(initialUrl, secondaryUrl1, secondaryUrl2)
  .then((result) => {
    console.log("Fetched data:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
