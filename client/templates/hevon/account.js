Template.account.created = function() {
    //var temp = Currencies.findOne();

};

Template.account.helpers({
    userTransacs: function() {
        console.log('user : ' + Meteor.userId());
        var temp =  Transaction_user.find({
            //We don't need becaus we handled the selector at the publish level
            //TODO : best between subscribe and find
            //TODO cf if how can subscribe instead of request
            //id_user:Meteor.userId()
        });
        return temp;
    }
});

Template.account.events({

});