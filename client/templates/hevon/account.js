Template.account.created = function() {
};

Template.account.helpers({
    userInfos: function() {
        //return Meteor.users.find();
        return Posts.find();
    }
});

Template.account.events({

});