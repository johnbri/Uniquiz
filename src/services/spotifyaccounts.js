// Instagram OAuth 2 setup
const credentials = {
    client: {
      id: "", // Change this!
      secret: "", // Change this!
    },
    auth: {
      tokenHost: 'https://api.instagram.com',
      tokenPath: '/oauth/access_token'
    }
   };
   const oauth2 = require('simple-oauth2').create(credentials);