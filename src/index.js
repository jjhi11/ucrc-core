// use ES module loadings

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";


const mainMap = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  container: "viewDiv",
  map: mainMap,
  zoom: 7,
  center: [-111.68, 39.33]
});

var wellsUrl = "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/UCRC_Database_App_View/FeatureServer/0";

var labelClass = new LabelClass({
  labelExpressionInfo: {
      expression: "$feature.LABEL"
  },
  symbol: {
      type: "label-3d", // autocasts as new LabelSymbol3D()
      symbolLayers: [{
          type: "text", // autocasts as new TextSymbol3DLayer()
          material: {
              color: "red"
          },
          size: 12,
          weight: "bold",
      }]
  }

});

var rockcore = new FeatureLayer({
  url: wellsUrl,
  title: "Well Locations",
  visible: true,
  outFields: ["*"],
  // popupTemplate: {
  //     title: "Well Information",
  //     featureNavigationEnabled: true,
  //     //actions: [corePhotos],
  //     content: contentWells
  // },
  showRelatedRecords: true,
  //maxScale: 2000000,
  legendEnabled: true
});

var counties = new FeatureLayer({
  url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/ArcGIS/rest/services/Core_Locations_Supporting_Data/FeatureServer/1",
  title: "Counties",
  visible: true,
  labelsVisible: true,
  legendEnabled: false
});


var basins = new FeatureLayer({
  url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/ArcGIS/rest/services/Core_Locations_Supporting_Data/FeatureServer/0",
  title: "Basins",
  visible: true,
  labelsVisible: true,
  legendEnabled: true
});


var fields = new FeatureLayer({
  url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/ArcGIS/rest/services/Core_Locations_Supporting_Data/FeatureServer/2",
  title: "Oil and Gas Fields",
  visible: true,
  legendEnabled: true
});

var townrange = new FeatureLayer({
  url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/ArcGIS/rest/services/Core_Locations_Supporting_Data/FeatureServer/3",
  title: "Township and Range",
  visible: true,
  outfields: ["*"],
  legendEnabled: false,
  minScale: 500000,
  labelsVisible: true,
  labelingInfo: [labelClass]
});

mainMap.add(rockcore);
mainMap.add(rockcore)
mainMap.add(fields);
mainMap.add(townrange);
mainMap.add(counties);
mainMap.add(basins);








