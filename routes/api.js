/* code from https://github.com/nhnent/dooray.vote */
const axios = require('axios');

/**
 * Send message into Webhook URL
 * @param {string} url Webhook URL
 * @param {object} body Message Object with channelId
 */
module.exports = {
  webhook: (url='WEBHOOK_URL', body={text: 'TEST'}) => axios(
    {
      method: 'POST',
      url,
      headers: {'Content-Type': 'application/json'},
      data: body
    })
};
