const MAX = process.env.API_MAX || 25;

const validateKey = (req, res, next) => {
  //Where is the API key expected to be?
  userList = require('../service/user.service').getUserList()

  let host = req.headers.origin;
  //let api_key = req.query.api_key; //version 1 with the querystring
  //let api_key = req.params.apikey; //version 2 with the URL params
  let api_key = req.header('x-api-key'); //version 3 using a header
  let account = userList.find(
    (user) => user.host == host && user.api_key == api_key
  );
  // find() returns an object or undefined
  if (account) {
    //good match
    //check the usage
    let today = new Date().toISOString().split('T')[0];
    let usageIndex = account.usage.findIndex((day) => day.date == today);
    if (usageIndex >= 0) {
      //already used today
      if (account.usage[usageIndex].count >= MAX) {
        //stop and respond
        res.status(429).send({
          error: {
            code: 429,
            message: 'Max API calls exceeded.',
          },
        });
      } else {
        //have not hit todays max usage
        account.usage[usageIndex].count++;
        console.log('Good API call', account.usage[usageIndex]);
        next();
      }
    } else {
      //not today yet
      account.usage.push({ date: today, count: 1 });
      //ok to use again
      next();
    }
  } else {
    //stop and respond
    res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
  }
};

module.exports = { validateKey };
