var angular = window.angular

var app = angular.module('chatapp', ['ngResource'])

app.factory('Message', function ($resource) {
  return $resource('/api/messages')
})

app.value('User', {
  nickname: 'Anonymous'
})

app.service('MessageService', function (User, Message) {
  var messages = Message.query()

  this.get = function () {
    return messages
  }

  this.send = function (text) {
    var msg = new Message({
      sender: User.nickname,
      text: text,
      date: new Date()
    })
    msg.$save()
  }
})

app.controller('ChatController', function ($scope, User, MessageService) {
  $scope.user = User
  $scope.messages = MessageService.get()

  $scope.setNick = function () {
    User.nickname = $scope.nickname
  }

  $scope.send = function () {
    MessageService.send($scope.text)
    $scope.text = ''
  }
})
