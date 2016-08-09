angular.module('starter.controllers', [])
    .controller('AreaCtrl', function ($scope, CrudService, AccountService, $ionicScrollDelegate) {

        var self = this,
            apiUrl,
            HEADER_HEIGHT = 43,
            HALF_SPRITE_WIDTH = 17,
            HALF_SPRITE_HEIGHT = 17,
            dragging;

        function placeMe(event) {
            var touch = event.gesture.touches[0],
                screenCoordX = (touch.clientX || touch.pageX),
                screenCoordY = (touch.clientY || touch.pageY),
                mapCoordX = screenCoordX - HALF_SPRITE_WIDTH,
                mapCoordY = screenCoordY - HALF_SPRITE_HEIGHT - HEADER_HEIGHT;

            if (AccountService.getAccount() !== undefined) {
                AccountService.locate(mapCoordX, mapCoordY);
                self.myAccount = AccountService.getAccount();
                CrudService.resource(apiUrl)
                    .create(AccountService.getAccount(), function (data) {});
                refresh();
            }
        }

        self.onDrag = function (e) {
            self.scrollX = e.gesture.deltaX;
            self.scrollY = e.gesture.deltaY;
            self.draggedStyle = {
                "margin-top": self.marginTop + "px",
                "margin-left": self.marginLeft + "px",
                "transform": "translate(" + e.gesture.deltaX + "px, " + e.gesture.deltaY + "px)",
                "-webkit-transform": "translate(" + e.gesture.deltaX + "px, " + e.gesture.deltaY + "px)"
            };
            dragging = true;
        };

        self.onRelease = function (e) {
            if (dragging) {
                self.marginLeft += self.scrollX;
                self.marginTop += self.scrollY;
                self.draggedStyle = {
                    "margin-top": self.marginTop + "px",
                    "margin-left": self.marginLeft + "px"
                };
                $scope.$emit('MAP_MOVED', {
                    left: self.marginLeft,
                    top: self.marginTop
                });
                refresh();
                dragging = false;
            }
        };

        function getContacts() {
            CrudService.resource(apiUrl)
                .list(function (data) {
                    self.locations = [];
                    data.forEach(function (location) {
                        if (AccountService.getAccount() !== undefined && location.username !== AccountService.getAccount().username) {
                            location.coordX += self.marginLeft;
                            location.coordY += self.marginTop;
                            self.locations.push(location);
                        }
                    });
                });
        }

        function refresh() {
            getContacts();
        }

        self.placeMe = placeMe;
        self.refresh = refresh;

        //apiUrl = 'http://localhost:1337/localhost:8080/api/locations';
        apiUrl = 'https://maykantoch.herokuapp.com/api/locations';
        self.debugMsg = '';
        self.handle = $ionicScrollDelegate.$getByHandle('mainScroll');
        self.scrollX = 0;
        self.scrollY = 0;
        self.marginTop = 0;
        self.marginLeft = 0;
        self.myAccount = AccountService.getAccount();
        dragging = false;
        getContacts();


    })
    .controller('AccountCtrl', function ($scope, CrudService, AccountService) {

        var self = this;

        self.settings = {
            enableFriends: true
        };

        self.save = function () {
            AccountService.initAccount(self.name);
        };

        if (AccountService.getAccount() !== undefined) {
            self.name = AccountService.getAccount().username;
        }

    });