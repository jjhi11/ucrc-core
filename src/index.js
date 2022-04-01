// use ES module loadings

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

const mainMap = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  container: "viewDiv",
  map: mainMap,
  zoom: 7,
  center: [-111.3, 39.4]
});








