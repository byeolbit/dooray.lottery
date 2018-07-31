const Api = require('./api');
const messages = require('./messages');
const participate = require('./participate');
const crypto = require('crypto');
const _ = require('lodash');

const getUserMention = ({ userId, tenantId, tenant, user }) => {
  const userIdNum = userId || user.id;
  const tenantIdNum = tenantId || tenant.id;

  return `(dooray://${tenantIdNum}/members/${userIdNum} "member")`;
}

const getWinner = (fields) => {
  const picked = Math.floor(Math.random() * fields[1].value);
  return fields[0].value.replace(/\)/gi, '),').split(',')[picked];
}

const lottery = (req, res) => {
  const body = req.body,
        [, masterMention] = body.callbackId.split('-');
  
  if (!masterMention) {
    // 추첨 취소
    if (body.actionValue === 'cancel') {
        return res.status(200).send({
          text: messages.get('CONFIRM_CANCEL')
        });
    }

    // 추첨 메시지 생성
    const params = body.actionValue.split(messages.REGEXP);

    const actions = [];
    actions.push({
      name: 'lottery',
      type: 'button',
      text: 'pick me!',
      value: 'participate'
    });

    const now = Date.now();
    const attachments = [
      {
        callbackId: `${now}-${getUserMention(body)}`,
        title: params[1] || params[2],
        actions,
        color: '#4286f4'
      }, 
      {                
        callbackId: `${now}-${getUserMention(body)}`,
        text: '',
        actions: [
          {
            name: 'lottery',
            type: 'button',
            text: messages.get('CLOSE_BTN'),
            value: 'end'
          }
        ]
      }
    ];

    return res.status(200).send({
        responseType: 'inChannel',
        deleteOriginal: true,
        text: messages.get('CREATE', getUserMention(body)),
        attachments
    });
  } else {
    // after start
    if (body.actionValue !== 'end') {
        return res.status(200).send(participate(body, getUserMention));
    }

    // close
    if (getUserMention(body) !== masterMention) {
        return res.status(200).send({
            replaceOriginal: false,
            text: messages.get('CANT_CLOSE', masterMention)
        });
    }

    const message = _.cloneDeep(body.originalMessage);
    message.responseType = 'inChannel';
    
    message.attachments[0].actions = [];
    message.attachments.pop();
    
    if (message.attachments[1] && message.attachments[1].fields) {

      message.replaceOriginal = true;
      message.channelId = body.channel.id;
      message.attachments.push({
        text: messages.get('RESULT_DOWN_BELOW')
      });
      Api.webhook(body.responseUrl, message);

      message.replaceOriginal = false;
      message.attachments.pop();
      message.text = messages.get('CLOSE', getUserMention(body));
      message.attachments[1].title = messages.get('WINNER');
      const participants = message.attachments[1].fields[0].value;
      message.attachments[1].text = getWinner(message.attachments[1].fields);
      message.attachments[1].fields[0] = {
        title: messages.get('TOTAL'),
        value: participants,
        short: true
      }
      
      return res.status(200).send(message);
    } else {
      message.replaceOriginal = true;
      message.text = messages.get('CLOSE_VOTES', getUserMention(body));
      return res.status(200).send(message);
    }
  }
}

module.exports = lottery;