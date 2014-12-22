/**
 * Created by ibox on 12/13/14.
 */
/*{{#each transacs}}
<ul class="list-group">
<li class="list-group-item list-group-item-info">

Transaction: {{_id}} <br/>
Date: {{date_creation}}
</li>
<li class="list-group-item list-group-item-success">
<table class="table table-striped">
<thead>
<tr>
<th>amount_from</th>
<th>ccy_from</th>
<th>ccy_to</th>
</tr>
</thead>
<tbody>
<td>
<tr>
{{amount_from}}
</tr>
</td>
<td>
<tr>
{{ccy_from}}
</tr>
</td>
<td>
<tr>
{{ccy_to}}
</tr>
</td>
</tbody>
</table>


</li>


</ul>
{{/each}}*/
//hide & show btns
/*if($(e.target).val() == ccy_from){//when the new selected ccy is the already selected wallet, we change default wallet
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
 //$('#ccy_from_' + ccy_from).hide('slow');
 //$('#ccy_from_' + new_ccy_from).show('slow');
 //$('#ccy_from_' + ccy_to).show('slow');
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
 else{*/