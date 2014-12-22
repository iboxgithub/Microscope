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
    //$('#ccy_from_' + ccy_to).hide();
    Session.set('ccy_from_val', userWalletAmount);
    Session.set('ccy_from', ccy_from);

    //2. Target currency
    $('#ccy_to_' + ccy_to).removeClass("btn-info").addClass("btn-success");
    //setting up attributes
    var ccyRef = Session.get('ccyRef');
    var value = userWalletAmount * ccyRef[ccy_from][ccy_to];
    $('#midmarket_displayed').attr("value", ccyRef[ccy_from][ccy_to]);
    $('#midmarket_displayed').val(ccyRef[ccy_from][ccy_to]);

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

        //if there were in warning before
        if(ccy_from == ccy_to){
            $('#ccy_from_' + ccy_from).removeClass("btn-warning").addClass("btn-success");
            $('#ccy_to_' + ccy_to).removeClass("btn-warning").addClass("btn-success");
        }

        if($(e.target).val() != ccy_to){//to avoid people clicking on an already selected ccy

            $('#ccy_to_' + ccy_to).removeClass("btn-success").addClass("btn-info");
            //we adapt the ccy_from selector
            ccy_to = $(e.target).val(); //we set up the new ccy
            Session.set('ccy_to', ccy_to);
            $(e.target).removeClass("btn-info").addClass("btn-success"); //focus on the new one

            if(ccy_from != ccy_to){
                valueConversion = ccy_from_val * ccyRef[ccy_from][ccy_to];
                $('#midmarket_displayed').attr("value", ccyRef[ccy_from][ccy_to]);
                $('#midmarket_displayed').val(ccyRef[ccy_from][ccy_to]);
            }
            else{
                valueConversion = $('#amount_from').val(); //TODO : put warning for client and forbid operation
                $('#ccy_from_' + ccy_from).removeClass("btn-success").addClass("btn-warning");
                $('#ccy_to_' + ccy_to).removeClass("btn-success").addClass("btn-warning");
                $('#midmarket_displayed').attr("value", 1);
                $('#midmarket_displayed').val(1);
            }
            //setting up attributes
            $('#amount_to').attr("value", valueConversion);
            $('#amount_to').attr("max", valueConversion);
            $('#amount_to').val(valueConversion);
            Session.set('ccy_to_val', valueConversion);
        }
    },
    'click .btn_ccy_from': function(e) {
        e.preventDefault();

        var ccy_from = Session.get('ccy_from'),
            ccyRef = Session.get('ccyRef'),
            valueConversion = 0,
            userWallets = Session.get('userWallets'),
            ccy_from_val = $('#amount_from').val(),
            ccy_to = Session.get('ccy_to'); //previous ccy selected, back to normal (not focused)

        //if there were in warning before
        if(ccy_from == ccy_to){
            $('#ccy_from_' + ccy_from).removeClass("btn-warning").addClass("btn-success");
            $('#ccy_to_' + ccy_to).removeClass("btn-warning").addClass("btn-success");

        }

        if($(e.target).val() != ccy_from){//to avoid people clicking on an already selected ccy

            //we come back to the normal color for the former ccy selected
            $('#ccy_from_' + ccy_from).removeClass("btn-success").addClass("btn-info");
            $(e.target).removeClass("btn-info").addClass("btn-success");
            ccy_from = $(e.target).val(); //we set up the new ccy
            Session.set('ccy_from', ccy_from);
            ccy_from_val = userWallets[ccy_from];

            //setting up attributes
            if(ccy_from != ccy_to){
                valueConversion = ccy_from_val * ccyRef[ccy_from][ccy_to];
                $('#midmarket_displayed').attr("value", ccyRef[ccy_from][ccy_to]);
                $('#midmarket_displayed').val(ccyRef[ccy_from][ccy_to]);
            }
            else{
                valueConversion = ccy_from_val; //TODO : put warning for client and forbid operation
                $('#ccy_from_' + ccy_from).removeClass("btn-success").addClass("btn-warning");
                $('#ccy_to_' + ccy_to).removeClass("btn-success").addClass("btn-warning");
                $('#midmarket_displayed').attr("value", 1);
                $('#midmarket_displayed').val(1);
            }

            $('#amount_to').attr("value", valueConversion);
            $('#amount_to').attr("max", valueConversion);
            $('#amount_to').val(valueConversion);
            Session.set('ccy_to_val', valueConversion);

            $('#amount_from').attr("value", ccy_from_val);
            $('#amount_from').attr("max", ccy_from_val);
            $('#amount_from').val(ccy_from_val);
            Session.set('ccy_from_val', ccy_from_val);

        }

    },
    'keyup .amount_from': function(e) {
        e.preventDefault();

        var ccy_from = Session.get('ccy_from'),
            ccyRef = Session.get('ccyRef'),
            valueConversion = 0,
            userWallets = Session.get('userWallets'),
            ccy_from_val = $('#amount_from').val(),
            ccy_to = Session.get('ccy_to'); //previous ccy selected, back to normal (not focused)

        //ccy_from_val = userWallets[ccy_from];

        //setting up attributes
        if(ccy_from != ccy_to){
            valueConversion = ccy_from_val * ccyRef[ccy_from][ccy_to];
            //TODO : to add when amount rise --> rate lower according to internal rules
            //$('#midmarket_displayed').attr("value", ccyRef[ccy_from][ccy_to]);
            //$('#midmarket_displayed').val(ccyRef[ccy_from][ccy_to]);
        }
        else{
            valueConversion = ccy_from_val; //TODO : put warning for client and forbid operation
            //$('#midmarket_displayed').attr("value", 1);
            //$('#midmarket_displayed').val(1);
        }

        $('#amount_to').attr("value", valueConversion);
        $('#amount_to').attr("max", valueConversion);
        $('#amount_to').val(valueConversion);
        Session.set('ccy_to_val', valueConversion);
        Session.set('ccy_from_val', ccy_from_val);

    },
    //"leaving" the amount input box
    'blur .amount_from': function(e) {
        e.preventDefault();

        /*var amount = $(e.target).val();
        console.log('hey : ' + amount);
        console.log('test2 : ' + Session.get('ccy_to'));*/

    },
    'submit form': function(e) {
        e.preventDefault();

        var amount = $(e.target).find('[name=amount_from]').val(),
            midmarket = $(e.target).find('[name=midmarket_displayed]').val();

        /*console.log('hey : ' + Meteor.userId());
        console.log('hey : ' + Session.get('ccy_from'));
        console.log('hey : ' + amount);
        console.log('hey : ' + Session.get('ccy_to'));
        console.log('hey : ' + midmarket);
        console.log('hey : ' + 'hevon');*/

        var params = {
            id_user:Meteor.userId(),
            ccy_from: Session.get('ccy_from'),
            amount_from: amount,
            ccy_to: Session.get('ccy_to'),
            midmarket_displayed: midmarket,
            date_max: new Date().toISOString()
        };


        Meteor.call('webNewTransaction', params, function(error, result) {
            // display the error to the user and abort
            if (error) {
                console.log('Client ERROR : ' + error.reason);
            }
            else {
                console.log('Client COOL : ' + JSON.stringify(result, null, 4));
                $('#output').val(result.data.result.data.id + ' - ' + result.data.result.data.amount_received);
            }

            //Router.go('postPage', {_id: result._id});
        });

    }
});
