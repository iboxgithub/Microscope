Template.account.created = function() {
};

Template.account.helpers({
    userTransacs: function() {
        console.log('TEST  ' + userId);
        return Transaction_user.find({id_user:'kWGZA7btmNq3AkN8B'/*this.currentUser*/});
    }
});

Template.account.events({

});