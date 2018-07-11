window.onload = function() {

// 1. O primeiro passo para inicializar o site, vamos definir os parâmetros para a página inicial
	var map = L.map("meumapa", {
		center: [-25.45, -49.25],
		zoom: 12,
		zoomSnap: 0.5,
		zoomDelta: 0.5,
		minZoom: 4.5,
		maxZoom: 18
	});

	// 2. Em seguida adicionamos o mapa base (Base Cartografica)
	var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

	// 3. Aqui carregamos o layer do geoJson
	var eventos = L.geoJson(protestos).addTo(map);

	// 4. Em seguida vem a elaboração do Mapa de Calor
	// 4.a. a princípio é necessária a função que analisa o geoJSON e extrai as coordenadas, retornando-as no formato requerido pelo plugin leaflet.heat
	geoJson2heat = function(geojson, intensidade) {
		return geojson.features.map(function(feature) {
			return [parseFloat(feature.geometry.coordinates[1]),
							parseFloat(feature.geometry.coordinates[0]), intensidade];
		});
	}
	//'protestos' é o nome da variável inserida dentro do arquivo geoJson, seguido do valor da intensidade
	var coord_mapa = geoJson2heat(protestos, 2);

	// 4.b. Agora que temos a matriz de coordenadas, com as respectivas intensidades, é possível utilizar o plugin leaflet.heat
	var mapaCalor = L.heatLayer(coord_mapa, {radius: 23, blur: 40, maxZoom: 13});
	map.addLayer(mapaCalor);


	// 5. Com o mapa de calor implementado, podemos implementar a função que possibilitará a seleção dos eventos
  // 5.a A princípio é necessário converter a variável para objeto
	var options = {
        position: 'topright',
        title: 'Seleção',
        showInvisibleFeatures: true,
        showResultFct: function(feature, container) {
            props = feature.properties;
            var name = L.DomUtil.create('b', null, container);
            name.innerHTML = props.nom_comple;

            container.appendChild(L.DomUtil.create('br', null, container));

            var cat = props.libtype ? props.libtype : props.libcategor,
                info = '' + cat + ', ' + props.commune;
            container.appendChild(document.createTextNode(info));
        }
    };

		// 5.b Criamos o controle "L.control.fuseSearch" e adicionamos ao mapa
		var fuseSearchCtrl = L.control.fuseSearch(options);
	    map.addControl(fuseSearchCtrl);

	    layerCtrl.addTo(map);

	    var icons = setupIcons();

	    // Load the data
	    jQuery.getJSON(protestos, function(data) {
	        displayFeatures(data.features, layers, icons);
	        var props = ['Categoria', 'Data'];
	        fuseSearchCtrl.indexFeatures(data.features, props);
	   });


}
