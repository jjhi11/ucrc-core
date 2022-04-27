// use ES module loadings

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import LayerList from "@arcgis/core/widgets/LayerList";
import Legend from "@arcgis/core/widgets/Legend";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";

setAssetPath(location.href);


const map = new Map({
  basemap: "streets-vector"
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 7,
  center: [-111.68, 39.33]
});

view.when(() => {
  let actionBarExpanded = false;
  document.addEventListener("calciteActionBarToggle", (event) => {
    actionBarExpanded = !actionBarExpanded;
    view.padding = {
      left: actionBarExpanded ? 135 : 45
    };
  });
});


document.querySelector("#header-title").textContent = "UGS Rockcore";


let activeWidget;

const handleActionBarClick = ({ target }) => {
  console.log(target)
  if (target.tagName !== "CALCITE-ACTION") {
    return;
  }

  if (activeWidget) {
    document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
    document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
  }

  const nextWidget = target.dataset.actionId;
  if (nextWidget !== activeWidget) {
    document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
    document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
    activeWidget = nextWidget;
  } else {
    activeWidget = null;
  }
};

document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);

document.querySelector("calcite-shell").hidden = false;
document.querySelector("calcite-loader").active = false;

view.ui.move("zoom", "top-right");

      const basemaps = new BasemapGallery({
        view,
        container: "basemaps-container"
      });

      const layerList = new LayerList({
        view,
        selectionEnabled: true,
        container: "layers-container"
      });

      const legend = new Legend({
        view,
        container: "legend-container"
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

map.add(rockcore);
map.add(rockcore)
map.add(fields);
map.add(townrange);
map.add(counties);
map.add(basins);








