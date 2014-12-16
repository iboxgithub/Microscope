/**
 * Created by ibox on 12/11/14.
 */
Transaction_user = new Mongo.Collection('ibox_transactions');

Balance_external = new Mongo.Collection('ibox_balance_external');

Balance_internal = new Mongo.Collection('ibox_balance_internal');

Operations = new Mongo.Collection('ibox_operations');

Currencies = new Mongo.Collection('ibox_currencies');

//TRANSACTIONS
/*Meteor.methods({
    getTransacs: function(userId) {

        var transacs = Transaction_user.find({id_user:userId});

        return transacs;
    }
});*/

//OPERATIONS

//INTERNAL BALANCE

//EXTERNAL BALANCE



