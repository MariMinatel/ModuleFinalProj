window.onload = function() {

	var map = L.map("meumapa", {
		center: [-25.45, -49.25],
		zoom: 12,
		zoomSnap: 0.5,
		zoomDelta: 0.5,
		minZoom: 4.5,
		maxZoom: 18
	});

	// Base Cartografica
	var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

	// Mapa de Calor
	var addressPoints = [
	[-25.45, -49.25, 50], // lat, lng, intensity
	[-25.44, -49.26, 50],
	[-25.44, -49.25, 50],
	[-25.45, -49.26, 50],
	[-25.44, -49.26, 50],
	[-25.44, -49.25, 50]
];


//var heat = L.heatLayer(addressPoints, {radius: 150, minOpacity:0.4 }).addTo(map);

L.geoJSON(escolas_munic).addTo(map).bindPopup(escolas_munic.properties.descricao);

}
