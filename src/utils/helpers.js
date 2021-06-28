export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);

  return newNumber;
};

export const urlDetector = () => {
  const mainUrl = window.location.href.includes("http://localhost")
    ? "https://comfyslothapi.herokuapp.com"
    : window.location.href;
  const wantedUrl = mainUrl.split(".com")[0].concat(".com");
  return wantedUrl;
};

export const getUniqueValues = () => {};

//// hey i am helper
