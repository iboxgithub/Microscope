Template.account.created = function() {
};

Template.account.helpers({
    userTransacs: function() {
        return Transaction_user.find({id_user:Meteor.userId()});
    }
});

Template.account.events({

});