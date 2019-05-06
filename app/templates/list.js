app.directive('listView', ['dataStore', '$timeout', '$q', function (dataStore, $timeout, $q) {
    return {
        templateUrl: 'templates/list.html',
        compile: function (tElement, tAttributes) {
            
        },
        controller: function ($scope, $element, $attrs) {
            var _idx = $scope.$index;
            $scope.cardName = '';
            $scope.cards = dataStore.getData('list')[_idx]['cards'];

            $scope.showComposer = false;
            $scope.addCardBtn = true;

            $scope.clickMore = function () {
                var opEl = document.querySelector('#pop-over-' + _idx);
                opEl.classList.add('is-shown');
                if (window.innerWidth <= opEl.clientWidth + opEl.offsetLeft) // popup cannot load outside of document visibility
                    opEl.style.left = "0px"
            }

            $scope.addCard = function() {
                var waitForSomeTime = function () {
                    var wait = $q.defer();
                    var composers = document.querySelectorAll('.card-composer');
                    var btns = document.querySelectorAll('.add-card-btn');
                    if (composers) {
                        composers.forEach(function (elem, id) {
                            elem.classList.add("ng-hide");
                            btns[id].classList.remove('ng-hide');
                            if (elem.id === "card-composer-"+_idx) {
                                elem.classList.remove("ng-hide");
                                document.getElementById('add-card-btn-'+_idx).classList.add('ng-hide');
                            }
                        })
                    }
                    wait.resolve();
                    return wait.promise;
                }
                waitForSomeTime().then(function () {
                    $timeout(function () {
                        $scope.cardName = '';                        
                        document.getElementById('cardName-' + _idx).focus();
                        document.getElementById('pop-over-' + _idx).classList.remove('is-shown');
                    }, 0);
                })                
            }

            $scope.hideCardTitleTxtBox = function () {
                document.getElementById('add-card-btn-' + _idx).classList.remove('ng-hide');
                document.getElementById('card-composer-' + _idx).classList.add('ng-hide');
                $scope.cardName = '';
            }

            var _addCardTitle = function () {
                if (!$scope.cardName) {
                    return;
                }
                var lists = dataStore.getData('list');
                if (!lists[_idx]['cards']) 
                    lists[_idx]['cards'] = [];
                lists[_idx]['cards'].push({
                    title: $scope.cardName,
                    position: lists[_idx]['cards'].length
                });
                dataStore.setData('list', lists);
                $timeout(function () {
                    $scope.cards = dataStore.getData('list')[_idx]['cards'];
                    $scope.addCard();
                }, 0)                
            }

            $scope.addCardTitle = function () {
                _addCardTitle(_idx);
            }

            $scope.addCardByKeypress = function (evt) {
                if (evt.charCode === 13)
                    _addCardTitle(_idx);
            }

            $scope.archiveList = function (idx) {
                document.getElementById('pop-over-' + _idx).classList.remove('is-shown');
                var lists = dataStore.getData('list').splice(idx, 1);
                dataStore.setData('list', lists);
                $scope.listItems = dataStore.getData('list');
            }
            $scope.closeThis = function () {
                document.getElementById('pop-over-' + _idx).classList.remove('is-shown');
            }
            $(function () {
                $('div[id^="cards-container"]').sortable({
                    connectWith: ".sortable",
                    receive: function (e, ui) {

                    }

                }).disableSelection();
            });
        }
    }
}]);

/* app.directive('popOver', ['dataStore', function (dataStore) {
    return {
        restrict: 'C',
        templateUrl: 'templates/popover.html',
        scope: true,
        controller: function ($scope, $element, $attrs) {
            $scope.closeThis = function () {
                $element[0].classList.remove('is-shown')
            }
        }
    }
}]); */

/* app.directive('listCardDetails', ['dataStore', function (dataStore) {
    return {
        restrict: 'A',
        templateUrl: 'templates/listdetails.html',
        controller: function ($scope, $element, $attrs) {
           
        }
    }
}]); */