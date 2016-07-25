function CrudService($resource) {

    this.resource = function (uri, parameters) {

        var resource = $resource(uri, parameters, {
            list: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST',
                isArray: false
            },
            get: {
                method: 'GET',
                isArray: false
            },
            update: {
                method: 'PUT',
                isArray: false
            },
            remove: {
                method: 'DELETE',
                isArray: false
            }
        });

        resource.prototype.list = function (onSuccess, onError) {
            return resource.list().$promise.then(onSuccess, onError);
        };

        resource.prototype.create = function (onSuccess, onError) {
            return resource.create().$promise.then(onSuccess, onError);
        };

        resource.prototype.get = function (onSuccess, onError) {
            return resource.get().$promise.then(onSuccess, onError);
        };

        resource.prototype.update = function (onSuccess, onError) {
            return resource.update().$promise.then(onSuccess, onError);
        };

        resource.prototype.remove = function (onSuccess, onError) {
            return resource.remove().$promise.then(onSuccess, onError);
        };

        return resource;
    };
}

function AccountService() {
    var service = {},
        account;


    function getAccount() {
        return this.account;
    }

    function setAccount(acc) {
        this.account = acc;
    }

    function locate(x, y) {
        this.account.coordX = x;
        this.account.coordY = y;
    }

    function initAccount() {
        this.account = {
            id: '0',
            username: 'Gilles',
            coordX: '250',
            coordY: '350'
        }
    }

    service.getAccount = getAccount;
    service.setAccount = setAccount;
    service.initAccount = initAccount;
    service.locate = locate;

    return service;
}

CrudService.$inject = ['$resource'];


angular.module('starter.services', [])
    .service('CrudService', CrudService)
    .service("AccountService", AccountService);