/**
 * Created by miguelplazas on 10/14/15.
 */
/*
 app.factory('events', ['$resource', function($resource) {
 return{
 all: function(){
 return $http.get('http://al/api/events');
 }
 }
 }]);
 */
angular.module('appAlApp')
    .factory('events', function($resource) {

    var EventsResource = $resource('http://sip.pulsarit.co/api/events/:id');

    //var EventsResource = $resource('http://al/api/events/:id');
    return EventsResource;
});

function Marker()
{
    //this.markerId = '';
    this.markerArray = '';
}

angular.module('appAlApp')
    .factory('MarkersResource', ['$resource', function($resource) {
    var url = 'http://sip.pulsarit.co/api/events/';
    var res = $resource(url, {}, {
        query: {
            method: 'GET',
            params: {
            },
            isArray: true,
            transformResponse: function(data, header) {
                var jsonData = JSON.parse(data); //Getting string data in response
                var markers = [];

                angular.forEach(jsonData, function(item){
                    var marker = new Marker();
                    marker.markerArray = {
                        id: item.event.id,
                        coords: {
                            latitude: item.event.lat,
                            longitude: item.event.lng
                        },
                        window: {
                            title: item.event.nombre,
                            inicio: item.event.inicio,
                            fin: item.event.fin,
                            details: item.event.details
                        }
                    };
                    markers.push(marker);
                });

                return markers;
            }
        }
    })
    return res;
}]);

