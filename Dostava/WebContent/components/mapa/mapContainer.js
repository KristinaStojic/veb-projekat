Vue.component("map-container", {
    template: `
    <div ref="map-container"
        style="width: 100%; height: 100%">
    </div>
    `
    , 
        props: ["coordinates"],
        data: function () {
            return {
                map: null,
                markerFeature: null
            };
        },
        methods: {
            initMap: function () {
                
                this.markerFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat(this.coordinates)),
                });
    
                this.markerFeature.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                  scale: 0.2,
                  src: 'slike/pokazivac.png',
                })}));
    
                vectorLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [this.markerFeature],
                        wrapX: true,
                    }),
                    wrapX: false,
                });
    
                this.map = new ol.Map({
                    target: this.$refs["map-container"],
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM({
                                wrapX: false,
                            }),
                        }),
                        vectorLayer,
                    ],
    
                    view: new ol.View({
                        zoom: 10,
                        center: ol.proj.transform(
                            this.coordinates,
                            "EPSG:4326",
                            "EPSG:3857"
                           ),
                        constrainResolution: true,
                    }),
                });
                this.map.on("singleclick", this.setNewPositionForMarker);
            },
            moveMapView: function (newCoordinates) {
                this.map.getView().animate({
                    center: ol.proj.transform(
                        newCoordinates,
                        "EPSG:4326",
                        "EPSG:3857"
                    ),
                    duration: 500,
                });
            },
            setNewPositionForMarker: function (event) {
                this.markerFeature.getGeometry().setCoordinates(event.coordinate);
    
                const transformedCoordinates = ol.proj.transform(
                    event.coordinate,
                    "EPSG:3857",
                    "EPSG:4326"
                );

                this.$parent.restoran.geografskaDuzina = transformedCoordinates[0];
                this.$parent.restoran.geografskaSirina = transformedCoordinates[1];
                this.$parent.azuriranjeAdrese();
            },
        },
        watch: {
            immediate: true,
            coordinates: function (newCoordinates, oldCoordinates) {
                this.moveMapView(newCoordinates);
                this.markerFeature
                    .getGeometry()
                    .setCoordinates(
                        ol.proj.transform(newCoordinates, "EPSG:4326", "EPSG:3857")
                    );
            },
        },
        mounted() {
            this.initMap();
        },
});
