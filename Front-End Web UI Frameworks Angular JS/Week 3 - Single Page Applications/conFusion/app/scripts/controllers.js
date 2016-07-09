'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.dishes= menuFactory.getDishes();

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            var dish= menuFactory.getDish(parseInt($stateParams.id,10));
            
            $scope.dish = dish;
            
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            $scope.myComment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.myComment.date = new Date().toISOString();
                console.log($scope.myComment);
                
                $scope.dish.comments.push($scope.myComment);
                
                $scope.commentForm.$setPristine();
                
                $scope.myComment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function ($scope, $stateParams, menuFactory, corporateFactory) {
        var promotion = menuFactory.getPromotion(0);
        var featured = menuFactory.getDish(0);
        var executive = corporateFactory.getLeader(3)

        $scope.promotion = promotion;
        $scope.featured = featured;
        $scope.executive = executive;
    }])

    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function ($scope, $stateParams, corporateFactory) {

        $scope.leadership = corporateFactory.getLeaders();

    }])


;
