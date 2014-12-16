Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
  check(id, String);
  return Posts.find(id);
});


Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('transaction_user', function() {
  return Transaction_user.find({id_user:this.userId});
});

Meteor.publish('currenciesAndRates', function() {
  return Currencies.findOne();
});

Meteor.publish('userWallets', function() {
  return Meteor.users.findOne({_id: this.userId},{'profile.ccy':1});
});


