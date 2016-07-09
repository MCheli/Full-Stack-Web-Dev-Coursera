'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.showMenu = false;
        $scope.message = "Loading ...";
        menuFactory.getDishes().query(
            function (response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });


        $scope.select = function (setTab) {
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

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

        var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

        $scope.sendFeedback = function () {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                feedbackFactory.getFeedback().save($scope.feedback);

                $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {


        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)})
            .$promise.then(
                function (response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );


    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.myComment = {rating: 5, comment: "", author: "", date: ""};

        $scope.submitComment = function () {
            $scope.myComment.date = new Date().toISOString();
            console.log($scope.myComment);
            $scope.dish.comments.push($scope.myComment);

            menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
            $scope.commentForm.$setPristine();
            $scope.myComment = {rating: 5, comment: "", author: "", date: ""};
        }
    }])

    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function ($scope, $stateParams, menuFactory, corporateFactory) {
        $scope.showPromo = false;
        $scope.showFeatured = false;
        $scope.showExecutive = false;
        $scope.promoMessage = "Loading...";
        $scope.featuredMessage = "Loading...";
        $scope.executiveMessage = "Loading...";


        $scope.promotion = menuFactory.getPromotion().get({id: 0})
            .$promise.then(
                function (response) {
                    $scope.promotion = response;
                    $scope.showPromo = true;
                },
                function (response) {
                    $scope.promoMessage = "Error: " + response.status + " " + response.statusText;
                }
            )

        $scope.featured = menuFactory.getDishes().get({id: 0})
            .$promise.then(
                function (response) {
                    $scope.featured = response;
                    $scope.showFeatured = true;
                },
                function (response) {
                    $scope.featuredMessage = "Error: " + response.status + " " + response.statusText;
                }
            );

        $scope.executive = corporateFactory.getLeaders().get({id: 3})
            .$promise.then(
                function (response) {
                    $scope.executive = response;
                    $scope.showExecutive = true;
                },
                function (response) {
                    $scope.executiveMessage = "Error: " + response.status + " " + response.statusText;
                }
            )

    }])

    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function ($scope, $stateParams, corporateFactory) {

        $scope.showLeaders = false;
        $scope.leadershipMessage = "Loading...";

        $scope.leadership = corporateFactory.getLeaders().query(
            function (response) {
                $scope.leadership = response;
                $scope.showLeaders = true;
            },
            function (response) {
                $scope.leadershipMessage = "Error: " + response.status + " " + response.statusText;
            }
        )
    }])


;
