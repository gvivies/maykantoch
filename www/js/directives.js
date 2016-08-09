(function () {
    'use strict';

    function LocationDirective($rootScope) {

        function linkFn(scope, element, attrs) {

        }

        return {
            restrict: 'AE',
            replace: true,
            translude: true,
            scope: {
                user: '='
            },
            templateUrl: 'templates/location.html',
            link: linkFn
        };
    }

    function SelfDirective($rootScope, AccountService) {

        function linkFn(scope, element, attrs) {
            scope.user = scope.myself;
            scope.selfDefined = function () {
                return (scope.user != undefined);
            }

            function onMapMoved(event, data) {
                element.css('transform', 'translate(' + data.left + 'px, ' + data.top + 'px)');
                element.css('-webkit-transform', 'translate(' + data.left + 'px, ' + data.top + 'px)');
            }
            $rootScope.$on('MAP_MOVED', onMapMoved)
        }

        return {
            restrict: 'AE',
            replace: true,
            translude: true,
            scope: {
                myself: '=account'
            },
            templateUrl: 'templates/self.html',
            link: linkFn
        };
    }

    SelfDirective.$inject = ['$rootScope', 'AccountService'];
    LocationDirective.$inject = ['$rootScope'];

    angular.module('directives', [])
        .directive('location', LocationDirective)
        .directive('self', SelfDirective);
}());