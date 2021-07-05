Vue.component("map-view-container", {
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
                markerFeature: null,
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
                  src: 'static/images/mapPointer.png',
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
                        zoom: 6,
                        center: ol.proj.transform(
                            this.coordinates,
                            "EPSG:4326",
                            "EPSG:3857"
                           ),
                        constrainResolution: true,
                    }),
                });
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
