Template.transfer.created = function() {
    //Session.set('postSubmitErrors', {});

    //TODO : get
    // - the array of ccy/rate accepted
    // - the array of client's reserves his different currencies
    // - token (in the future for a secure OAuth access)
    console.log('test : ');
    //var temp = Transaction_user.findOne();
    //var temp = Currencies.find();
    //console.log('TEST1 : '+JSON.stringify(temp,null,4));
};

Template.transfer.helpers({
    errorMessage: function(field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.transfer.events({

    //"leaving" the amount input box
    'blur .amount_from': function(e) {
        e.preventDefault();

        var amount = $(e.target).val();
        console.log('hey : ' + amount);

    },
    'submit form': function(e) {
        e.preventDefault();

        var amount = $(e.target).find('[name=amount_from]').val();
        console.log('hey : ' + amount);
        console.log('sdf');
        /*var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        var errors = validatePost(post);
        if (errors.title || errors.url)
            return Session.set('postSubmitErrors', errors);

        Meteor.call('postInsert', post, function(error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);

            // show this result but route anyway
            if (result.postExists)
                throwError('This link has already been posted');

            Router.go('postPage', {_id: result._id});
        });*/
    }
});
