const credentials = {
  client: {
    id: "41ee13f3c2d945ddb590fd2a99e1167e", // Change this!
    secret: "7ee133fe141242e38d98aa45d8290d4f", // Change this!
  },
  auth: {
    tokenHost: 'https://api.https://accounts.spotify.com.com',
    tokenPath: '/authorize'
  }
 };
 const oauth2 = require('simple-oauth2').create(credentials);
 
 app.get('/redirect', (req, res) => {
  // Generate a random state verification cookie.
  const state = req.cookies.state || crypto.randomBytes(20).toString('hex');
  // Allow unsecure cookies on localhost.
  const secureCookie = req.get('host').indexOf('localhost:') !== 0;
  res.cookie('state', state.toString(), {maxAge: 3600000, secure: secureCookie, httpOnly: true});
  const redirectUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${req.protocol}://${req.get('host')}/`,
    scope: 'basic',
    state: state
  });
  res.redirect(redirectUri);
});