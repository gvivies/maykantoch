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
            //$rootScope.$on('SELF-LOCATE', function (event, data) {
            //var newX = parseInt(data.coordX) - 21,
            //    newY = parseInt(data.coordY) - 42;
            //attrs.style = 'left:' + newX + 'px;top:' + newY + 'px';
            //attrs.xpos = data.coordX;
            //attrs.ypos = data.coordY;
            //});
            scope.user = AccountService.getAccount();
        }

        return {
            restrict: 'AE',
            replace: true,
            translude: true,
            scope: {},
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