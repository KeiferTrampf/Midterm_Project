const location = document.querySelector("#location");
const suggestions = document.querySelector("#suggestions");
const latInput = document.querySelector("#latitude");
const lngInput = document.querySelector("#longitude");

let locations = [];

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// input = 'CN Tower', '123 sesame st'
const fetchSuggestions = async (input) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search.php?q=${input}&format=jsonv2`
  );
  const data = await response.json();
  locations = [...data];
};

const renderLocations = async (e, latInput, lngInput) => {
  const input = e.target.value;
  const temp = `<h1>hacked</h1>`;
  if (!input) return;

  await fetchSuggestions(input);

  suggestions.innerHTML = locations
    .slice(0, 5)
    .map(
      (location) => `
<li>
    <a class="dropdown-item" href="#" data-lat="${location.lat}" data-lng="${
        location.lon
      }">
    <img src="/icons/map-pin.svg" alt=""> ${DOMPurify.sanitize(temp)}</a>
</li>
     `
    )
    .join("");
  console.log(">> ", DOMPurify.sanitize(temp));
};
const debounceRenderLocations = debounce(renderLocations, 1000);

location.addEventListener("change", debounceRenderLocations);
location.addEventListener("keyup", debounceRenderLocations);
suggestions.addEventListener("click", (e) => {
  const place = e.target.textContent;
  location.value = place;
  latInput.value = e.target.dataset.lat;
  lngInput.value = e.target.dataset.lng;
});
