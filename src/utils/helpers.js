import lottie from 'lottie-web';

export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);

  return newNumber;
};

// export const urlDetector = () => {
//   const mainUrl = window.location.href.includes("http://localhost")
//     ? "https://comfyslothapi.herokuapp.com"
//     : window.location.href;
//   const wantedUrl = mainUrl.split(".com")[0].concat(".com");
//   return wantedUrl;
// };

export const hostAddress = 'http://127.0.0.1:9000/api/v1'

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
    console.log(unique);
  }
  return ["all", ...new Set(unique)];
};
