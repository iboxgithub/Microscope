/**
 * Created by ibox on 12/22/14.
 */
Future = Npm.require('fibers/future');

newTransaction = function(){

};

Meteor.methods({

    webNewTransaction: function(params){
        check(params,Object);

        // Set up a future
        var future = new Future();
        // A callback so the job can signal completion
        var onComplete = future.resolver();

        /// Make async http call
        HTTP.call("POST", "http://localhost:3002/api/v1.0/fakeToken/transaction/new",
            {timeout: 5000,
                params:{
                    "id_user": params.id_user,
                    "ccy_from": params.ccy_from,
                    "amount_from": params.amount_from,
                    "ccy_to": params.ccy_to,
                    "midmarket_displayed": params.midmarket_displayed,
                    "date_max": params.date_max,
                    "platform_from": 'hevon'
                }
            },
            function(error, result){
                if(error){
                    console.log('error server : '+ error);onComplete(error, result);
                }
                else {
                    console.log('server call ok : '+JSON.stringify(result,null,4));onComplete(error, result);
                }
            }
        );

        return future.wait();
    }


});