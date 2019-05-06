'use strict';
var app = angular.module('trelloApp', []);
app.controller('dashboardCtrl', ['$scope', '$timeout', 'dataStore', function ($scope, $timeout, dataStore) {
    $scope.list = [];
    $scope.listName = '';
    $scope.showAddListInput = false;
    $scope.showAddListBtn = true;
    $scope.btnName = $scope.list.length > 0 && "Add another list" || "Add a list";
    $scope.showListInput = function () {
        $scope.showAddListBtn = false;
        $scope.showAddListInput = true;
        $timeout(function () {
            $scope.listName = ''; 
            document.getElementById('listName').focus();
            document.querySelector('.content').scrollTo(window.outerWidth, 0)
        }, 0)
    }
    $scope.hideListInput = function () {
        $scope.showAddListInput = false;
        $scope.showAddListBtn = true;
        $scope.listName = '';
    }
    $scope.listItems = dataStore.getData('list');
    var addListItem = function () {
        if (!$scope.listName) {
            return;
        }
        var list = dataStore.getData('list') || [];
        list[list.length] = { 'name': $scope.listName, 'position': list.length };
        dataStore.setData('list', list);
        $scope.listItems = dataStore.getData('list');
        $scope.showListInput();
    }
    $scope.addList = function () {
        addListItem();
    }
    $scope.addListByEnter = function(evt) {
        if (evt.charCode === 13) {
            addListItem();
        }
    }
}]);

app.factory('dataStore', function () {
    var dataObj = {};
    return {
        setData: function(item, data) {
            dataObj[item] = data;
        },
        getData: function(item) {
            return dataObj[item] || null;
        },
        getAllData: function() {
            return dataObj;
        }
    }
})
