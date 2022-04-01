mapboxgl.accessToken =
  "pk.eyJ1IjoiYW50aGdyaW0iLCJhIjoiY2wxZjhsbjZ5MDEyMzNjbXB6ZmE4azhjdiJ9.RcmW0_4ba6kv9lKlFgL5Rg";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-71.104081, 42.365554],
  zoom: 13,
});

let marker = new mapboxgl.Marker();
marker.setLngLat([-71.092761, 42.357575]);
marker.addTo(map);

const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.108717, 42.368355],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

let counter = 0;

const move = () => {
  setTimeout(() => {
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  }, 1000);
};
