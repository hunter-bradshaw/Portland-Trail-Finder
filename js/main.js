L.control.locate().addTo(map);

var searchLayer = L.layerGroup().addTo(map);
//... adding data in searchLayer ...
map.addControl(new L.Control.Search({
    layer: searchLayer
}));
//searchLayer is a L.LayerGroup contains searched markers