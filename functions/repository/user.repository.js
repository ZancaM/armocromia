const {v4: uuidv4} = require('uuid');

const firestoreConfig = require('../config/firestore-config');
const dbRef = firestoreConfig.firestore.collection('users');
let userList = []

function userMapper(user, userId) {
  return {
    id: userId,
    created_at: user.created_at,
    api_key: user.api_key,
    host: user.host,
    email: user.email,
    usage: user.usage
  }
}

const genKey = () => {
  //create a base-36 string that is always 30 chars long a-z0-9
  // 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join('');
};

const create = (request, response) => {
  let today = new Date().toISOString().split('T')[0];
  dbRef
    .doc(uuidv4())
    .set({
      created_at: Date.now(),
      api_key: genKey(),
      host: request.headers.origin,
      usage: [{ date: today, count: 0 }],
      email: request.body.email
    })
    .then(async doc => {
      console.log('user saved:', doc);
      if (!userList.length) {
        await populateList()
      }
      response.status(200).json({msg: 'success'})
      //TODO: Update Cache
      userList.push(doc);
    })
    .catch(err => {
      console.log('Error getting document', err);
      response.status(500).json({error: 'api-error'})
    });
};



const list = async (request, response) => {
  if (userList.length) {
    return userList
  }
  userList = []
  dbRef
    .get()
    .then(snapshot => {
      userList = [];
      if (snapshot.empty) {
        response.status(200).json(userList);
      } else {
        snapshot.forEach(doc => {
          userList.push(userMapper(doc.data(), doc.id));
        });
        // TODO:  save userList to cache
        console.log('UserList:', userList)
        response.status(201).json(userList);
      }
    })
    .catch(err => {
      console.log('Error getting documents', err);
      response.status(500).json({error: 'api-error'})
    });
};

const populateList = async() => {
  userList = []
  return new Promise((resolve, reject) => {
    dbRef
      .get()
      .then(snapshot => {
        // TODO: Cache this
        snapshot.forEach(doc => {
          userList.push(userMapper(doc.data(), doc.id));
        });
        resolve()
      })
      .catch(err => {
        console.log('Error getting documents', err);
        reject()
      });
  })
};

const getById = (request, response) => {
  const userId = request.params.id;
  dbRef
    .doc(userId)
    .get()
    .then(doc => {
      if (!doc.exists) {
        response.status(200).json({});
      } else {
        response.status(201).json(userMapper(doc.data(), doc.id));
      }
    })
    .catch(err => {
      console.log('Error getting documents', err);
      response.status(500).json({error: 'api-error'})
    });
};

const deleteById = (request, response) => {
  const userId = request.params.id;
  dbRef
    .doc(userId)
    .delete()
    .then(doc => {
      //TODO: Update Cache
      response.status(200).json({msg: 'success'})
    })
    .catch(err => {
      console.log('Error getting documents', err);
      response.status(500).json({error: 'api-error'})
    });
};


module.exports = {
  create,
  list,
  getById,
  deleteById,
  userList,
  populateList
};
