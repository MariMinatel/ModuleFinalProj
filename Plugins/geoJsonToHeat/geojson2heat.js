var geojson2heat = function(geojson, options) {
    options = options || {};
    var heat = geojson.features.map(function(d) {
        var lng = d.geometry.coordinates[0];
        var lat = d.geometry.coordinates[1];
        var compounds = d.properties.Compounds;
        var sum = 0;
        for (var key in compounds) {
        	//Convert val from string to numeric
            var number = compounds[key].replace(',', '');

            //If it's not a number, ignore it. If it is, we are good
            var val = !isNaN(number) ? +number : null;
            if (val) {
            	//add number to the total sum in the feature
                sum += val;
            }
        }
        return [lat, lng, sum];
    });

    //filter if you don't want 0 values included. Not sure if it makes a difference
    if (options.filter) {
        heat = heat.filter(function(array) {
            return array[2] !== 0;
        });
    }
    return heat;
};