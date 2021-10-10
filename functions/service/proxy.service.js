const axios = require('axios');
const apiURL = 'https://backend-tpmxe4bpfq-ey.a.run.app/image'

const season = async (request, response) => {
  const instance = axios.create();
  try {
    const ret = await instance.post(apiURL, { image: request.data.image });
    response.status(200).json({msg: 'success', prediction: ret.data.Prediction})
  } catch (e) {
    response.status(500).json({msg: 'api-error', e: e})
  }
};

const getSeason = async (req, response) => {
  return season(req, response)
};


module.exports = {
  getSeason
};
