mapboxgl.accessToken =
  "pk.eyJ1IjoiYW50aGdyaW0iLCJhIjoiY2wxZjhsbjZ5MDEyMzNjbXB6ZmE4azhjdiJ9.RcmW0_4ba6kv9lKlFgL5Rg";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-71.104081, 42.365554],
  zoom: 13,
});

window.onload = () => {
  addRoutes();
};
const drop = document.getElementById("target");
const loadBtn = document.getElementById("loadBtn");

const getData = async () => {
  const res = await fetch("https://api-v3.mbta.com/vehicles/");
  const busData = await res.json();
  return busData.data;
};

const addRoutes = async () => {
  const data = await getData();
  const masterArr = [];
  for (let i = 0; i < data.length; i++) {
    masterArr.push(data[i].relationships.route.data.id);
  }
  const uniArr = [...new Set(masterArr)];

  for (route of uniArr) {
    const newOpt = document.createElement("option");
    newOpt.value = route;
    newOpt.innerText = route;
    drop.appendChild(newOpt);
  }
};

const filterData = async () => {
  const route = document.getElementById("target").value;
  const data = await getData();
  const filterData = data.filter(
    (dat) => dat.relationships.route.data.id === route
  );
  return filterData;
};

const resetMap = () => {};

const getBuses = async () => {
  const targetArr = await filterData();
  for (let i = 0; i < targetArr.length; i++) {
    let marker = new mapboxgl.Marker();
    marker.setLngLat([
      targetArr[i].attributes.longitude,
      targetArr[i].attributes.latitude,
    ]);
    marker.addTo(map);
  }
};

loadBtn.addEventListener("click", getBuses);

const move = (data) => {
  setTimeout(() => {}, 15000);
};
