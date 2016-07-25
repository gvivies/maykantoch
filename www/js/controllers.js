angular.module('starter.controllers', [])
    .controller('AreaCtrl', function ($scope, CrudService, AccountService) {

        var vm = this;

        function locateMe(event) {

            var touch = event.gesture.touches[0];
            var coordX = touch.clientX - 21;
            var coordY = touch.clientY - 56;
            // or taking offset into consideration
            //var x_2 = touch.pageX - canvas.offsetLeft;
            //var y_2 = touch.pageY - canvas.offsetTop;



            //var coordX = event.gesture.srcEvent.clientX - 21,
            //    coordY = event.gesture.srcEvent.clientY - 56;
            AccountService.locate(coordX, coordY);
            //$scope.$emit('SELF-LOCATE', AccountService.getAccount());
            CrudService.resource('http://localhost:1337/localhost:8080/api/locations')
                .create(AccountService.getAccount(), function (data) {
                    $scope.$emit('SELF-LOCATE', AccountService.getAccount());
                });
        }

        function getContacts() {
            //CrudService.resource('https://maykantoch.herokuapp.com/api/locations')
            CrudService.resource('http://localhost:1337/localhost:8080/api/locations')
                .list(function (data) {
                    vm.locations = data;
                });
        }

        function refresh() {
            getContacts();
        }

        vm.locateMe = locateMe;
        vm.refresh = refresh;

        AccountService.initAccount();
        getContacts();

    })
    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });