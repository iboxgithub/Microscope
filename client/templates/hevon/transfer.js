Template.transfer.created = function() {
    //Session.set('postSubmitErrors', {});

    //TODO : get
    // - the array of ccy/rate accepted
    // - the array of client's reserves his different currencies
    // - token (in the future for a secure OAuth access)
    //console.log('test : ');
    //var temp = Transaction_user.findOne();
    //var temp = Currencies.find();
    //console.log('TEST1 : '+JSON.stringify(temp,null,4));

};

Template.transfer.rendered = function() {

    //first time
    var ccy_to = 'EUR', ccy_from = 'GBP';//todo : add a preference option for the user

    //1. Currency from
    $('#ccy_from_' + ccy_from).removeClass("btn-info").addClass("btn-success");
    //setting up attributes
    var userWallets = Meteor.user().profile.ccy;
    var userWalletAmount = userWallets[ccy_to];
    $('#amount_from').attr("value", userWalletAmount);
    $('#amount_from').attr("max", userWalletAmount);
    $('#amount_from').val(userWalletAmount);
    //just for rendered --> we will convert just a currency in another
    $('#ccy_from_' + ccy_to).hide();
    Session.set('ccy_from_val', userWalletAmount);
    Session.set('ccy_from', ccy_from);

    //2. Target currency
    $('#ccy_to_' + ccy_to).removeClass("btn-info").addClass("btn-success");
    //setting up attributes
    var ccyRef = Session.get('ccyRef');
    var value = userWalletAmount * ccyRef[ccy_from][ccy_to];

    $('#amount_to').attr("value", value);
    $('#amount_to').attr("max", value);
    $('#amount_to').val(value);
    Session.set('ccy_to_val', value);
    Session.set('ccy_to', ccy_to);

    Session.set('userWallets', userWallets);
    //------------------------
    //TODO : add the FEES !!!!
    //------------------------

};

Template.transfer.helpers({

    ccyListTo: function(){
        //console.log('hey');
        var ccyRef = Currencies.findOne({}),list = [];
        //console.log('temp : '+JSON.stringify(temp,null,4));
        for(var ccy in ccyRef){
            if(ccy.toString() != '_id' && list.indexOf(ccy.toString()) == -1) {
                list.push(ccy.toString());
            }
        }
        Session.set('ccyRef', ccyRef);
        return list; //TODO mettre en variable de session
    },
    ccyListFrom: function(){
        //console.log('hey');
        var ccyRef = Currencies.findOne({}),list = [];
        //console.log('temp : '+JSON.stringify(temp,null,4));
        for(var ccy in ccyRef){
            if(ccy.toString() != '_id' && list.indexOf(ccy.toString()) == -1) {
                list.push(ccy.toString());
            }
        }
        Session.set('ccyRef', ccyRef);
        return list; //TODO mettre en variable de session
    }
});

Template.transfer.events({

    'click .btn_ccy_to': function(e) {
        e.preventDefault();

        var ccy_from = Session.get('ccy_from'),
            ccyRef = Session.get('ccyRef'),
            valueConversion = 0,
            userWallets = Session.get('userWallets'),
            ccy_from_val = $('#amount_from').val(),
            ccy_to = Session.get('ccy_to'); //previous ccy selected, back to normal (not focused)

        if($(e.target).val() != ccy_to){//to avoid people clicking on an already selected ccy
            if($(e.target).val() == ccy_from){//when the new selected ccy is the already selected wallet, we change default wallet
                console.log('Same ccies');
                var new_ccy_from = '', noMatch = true;
                for(var temp in ccyRef){
                    if(temp.toString() != ccy_from){
                        new_ccy_from = temp.toString();//in case no wallet properly matches
                    }
                    if(temp.toString() != ccy_from && userWallets[temp.toString()] > 0){
                        new_ccy_from = temp.toString();
                        noMatch = false;
                        break;
                    }
                }
                if(noMatch){//no wallet matched properly
                    //TODO : display a message to refill Hevon account
                    console.log('noMatch');
                }
                //FROM -------------------
                //we will convert just a currency in another
                $('#ccy_from_' + ccy_from).removeClass("btn-success").addClass("btn-info");
                $('#ccy_from_' + new_ccy_from).removeClass("btn-info").addClass("btn-success");
                $('#ccy_from_' + ccy_from).hide('slow');
                $('#ccy_from_' + new_ccy_from).show('slow');
                $('#ccy_from_' + ccy_to).show('slow');
                Session.set('ccy_from', new_ccy_from);
                //setting up attributes on FROM
                var userWallet = userWallets[new_ccy_from];
                $('#amount_from').attr("value", userWallet);
                $('#amount_from').attr("max", userWallet);
                $('#amount_from').val(userWallet);
                Session.set('ccy_from_val', userWallet);

                //TO -----------------------
                $('#ccy_to_' + ccy_to).removeClass("btn-success").addClass("btn-info");
                ccy_to = $(e.target).val(); //we set up the new ccy
                Session.set('ccy_to', ccy_to);
                $(e.target).removeClass("btn-info").addClass("btn-success"); //focus on the new one

                //setting up attributes
                valueConversion = userWallet * ccyRef[new_ccy_from][ccy_to];
                $('#amount_to').attr("value", valueConversion);
                $('#amount_to').attr("max", valueConversion);
                $('#amount_to').val(valueConversion);
                Session.set('ccy_to_val', valueConversion);

            }
            else{
                $('#ccy_to_' + ccy_to).removeClass("btn-success").addClass("btn-info");
                //we adapt the ccy_from selector
                $('#ccy_from_' + ccy_to).show('slow');//we show the previously hidden ccy...
                ccy_to = $(e.target).val(); //we set up the new ccy
                Session.set('ccy_to', ccy_to);
                $('#ccy_from_' + ccy_to).hide('slow');//...and we hide the equivalent currency on the wallets
                $(e.target).removeClass("btn-info").addClass("btn-success"); //focus on the new one
                //Session.set('ccy_from', null); //waiting for user selection

                //setting up attributes
                valueConversion = ccy_from_val * ccyRef[ccy_from][ccy_to];
                $('#amount_to').attr("value", valueConversion);
                $('#amount_to').attr("max", valueConversion);
                $('#amount_to').val(valueConversion);
                Session.set('ccy_to_val', valueConversion);
            }

        }


        /*
        var ccy_to = Session.get('ccy_to');

        //we come back to the normal color for the former ccy selected
        $('#ccy_to_' + ccy_to).removeClass("btn-success").addClass("btn-info");
        $(e.target).removeClass("btn-info").addClass("btn-success");
        Session.set('ccy_to', $(e.target).val());

        //setting up attributes
        var userWallet = Meteor.user().profile.ccy[$(e.target).val()];
        //$('#amount_from').attr("placeholder", userWallet);
        $('#amount_from').attr("value", userWallet);
        $('#amount_from').attr("max", userWallet);
        $('#amount_from').val(userWallet);*/
    },
    'click .btn_ccy_from': function(e) {
        e.preventDefault();
        var ccy_from = Session.get('ccy_from');

        //we come back to the normal color for the former ccy selected
        $('#ccy_to_' + ccy_to).removeClass("btn-success").addClass("btn-info");
        $(e.target).removeClass("btn-info").addClass("btn-success");
        Session.set('ccy_to', $(e.target).val());


        //setting up attributes
        var userWallet = Meteor.user().profile.ccy[$(e.target).val()];
        //$('#amount_from').attr("placeholder", userWallet);
        $('#amount_from').attr("value", userWallet);
        $('#amount_from').attr("max", userWallet);
        $('#amount_from').val(userWallet);
    },
    //"leaving" the amount input box
    'blur .amount_from': function(e) {
        e.preventDefault();

        var amount = $(e.target).val();
        console.log('hey : ' + amount);
        console.log('test2 : ' + Session.get('ccy_to'));

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
