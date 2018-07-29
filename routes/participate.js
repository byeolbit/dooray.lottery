const {cloneDeep} = require('lodash'),
      messages = require('./messages');

const initFields = (message) => {
  const fields = [];

  fields.push({
      title: 'pick me!',
      value: '0',
      short: true
  });

  fields.push({
      title: ' ',
      value: '',
      short: true
  });

  fields.push({
    title: messages.get('TOTAL'),
    value: '0',
    short: false
  });
  
  message.attachments.splice(1, 0, {
    text: '',
    fields
  });

  return message;
}

const addParticipate = (message, metion) => {
  message.fields[0].value++;
  message.fields[1].value += metion;
  message.fields[2].value++;
}

const removeParticipate = (message, mention) => {
  message.fields[0].value--;
  message.fields[1].value = message.fields[1].value.replace(mention, '');
  message.fields[2].value--;
}

const participate = (data, getUserMention) => {
  const message = cloneDeep(data.originalMessage),
        userMention = getUserMention(data)
        participateMessage = message.attachments[1];

  if (!participateMessage.fields) {
    message = initFields(message);
  }

  if (participateMessage.fields[1].value.includes(userMention)) {
    removeParticipate(participateMessage, userMention);
  } else {
    addParticipate(participateMessage, userMention);
  }

  message.responseType = 'inChannel';
  message.replaceOriginal = true;
  
  return message;
}

module.exports = participate;