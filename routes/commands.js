const messages = require('./messages'),
      MINIMUM_PARAMS_LENGTH = 4;   //  ('', title, undefined, ' ') => 4

// 도움말 메시지를 생성하여 보내줍니다.
const help = (res) => {
    return res.status(200).send({
        text: messages.get('HELP')
    });
}

// 새로운 추첨 시작 다이얼로그를 생성하여 보내줍니다.
const newLottery = (params, res) => {
    return res.status(200).send({
        text: messages.get('CONFIRM'),
        attachments:[
            {
                title: params[1] || params[2],
                fields: []
            },
            {                
                callbackId: 'lottery',
                actions: [
                    {
                        name: 'lottery',
                        type: 'button',
                        text: messages.get('START'),
                        value: req.body.text,
                        style: 'primary'
                    },                    
                    {
                        name: 'lottery',
                        type: 'button',
                        text: messages.get('CANCEL'),
                        value: 'cancel',
                        style: 'danger'
                    }
                ]
            }
        ]
    });
}

const commands = (req, res) => {
    const params = req.body.text.split(messages.REGEXP);
    return params.length < MINIMUM_PARAMS_LENGTH || params[1].toLowerCase() === 'help'
        ? help(res)
        : newLottery(params, res);
};

module.exports = commands;