Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
/*
Accounts.config({
  sendVerificationEmail: true
});

Meteor.onCreateUser(function(options, user) {
  var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
  user.dexterity = d6() + d6() + d6();
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  return user;
});
*/