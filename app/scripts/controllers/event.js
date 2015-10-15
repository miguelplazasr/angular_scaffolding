angular.module('appAlApp')
    .controller('EventListController', [
        '$scope',
        'events',
        function ($scope, events) {
            $scope.events = [];
            $scope.loading = true;
            $scope.title = 'Company Name';
            $scope.promo = 'Próximos Eventos';


            events.query().$promise.then(function (data) {
                $scope.isCollapsed = true;
                $scope.events = data;
                $scope.loading = false;
            })

        }
    ]);


angular.module('appAlApp')
    .controller('EventShowController', [
        '$scope',
        '$routeParams',
        'events',
        function ($scope, $routeParams, events) {
            events.get({id: $routeParams.id}).$promise.then(function (event) {
                console.log(event);
                $scope.detail = event;
                $scope.map = {
                    center: {
                        latitude: event.lat,
                        longitude: event.lng
                    },
                    options: {
                        mapTypeControl: false,
                        streetViewControl: false,
                        optimized: true,
                        draggable: false,
                    },
                    zoom: 16
                };
                $scope.marker = {
                    id: $routeParams.id,
                    coords: angular.copy($scope.map.center)
                };
            })
        }
    ]);

angular.module('appAlApp')
    .controller('LocationController', [
        '$scope',
        'MarkersResource',
        function ($scope, MarkersResource) {
            $scope.title = 'Events Location';

            $scope.map = {
                center: {
                    latitude: 4.64862585,
                    longitude: -74.24823761
                },
                options: {
                    mapTypeControl: false,
                    streetViewControl: false,
                    optimized: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                },
                zoom: 10,
                maxZoom: 15,
                minZoom: 10,
                events: {
                    click: function () {
                        $scope.itemSelected = false;
                    }
                },
                clusterOptions: {
                    minimumClusterSize: 10
                }
            };

            $scope.map.markers = [];

            var data = MarkersResource.query(function (result) {

                angular.forEach(result, function (value) {

                    $scope.map.markers.push({
                        id: value.markerArray.id,
                        latitude: value.markerArray.coords.latitude,
                        longitude: value.markerArray.coords.longitude,
                        title: value.markerArray.window.title,
                        inicio: value.markerArray.window.inicio,

                    })
                });

                $scope.showloadedmap = true;
            });

            $scope.map.markersEvents = {
                click: function (marker, eventName, model, arguments) {
                    console.log('Marker was clicked (' + marker + ', ' + eventName);//+', '+mydump(model, 0)+', '+mydump(arguments)+')');
                    $scope.map.window.model = model;
                    $scope.map.window.title = model.title;
                    $scope.map.window.inicio = model.inicio;
                    $scope.map.window.show = true;
                }
            };

            $scope.map.window = {
                marker: {},
                show: false,
                closeClick: function () {
                    this.show = false;
                },
                options: {}, // define when map is ready
                title: ''
            };
            $scope.onMarkerClicked = function (m) {
                //this.windowOptions = !this.windowOptions;
                console.log('Marker was clicked');
                console.log(m);
            };

            $scope.closeClick = function () {
                this.window = false;
            };
            console.log(data);
        }

    ])
