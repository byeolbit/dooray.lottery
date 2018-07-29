const express = require('express'),
      router = express.Router(),
      {get} = require('lodash'),
      command = require('./commands'),
      lottery = require('./loterry');

// 받은 토큰이 올바른지 검사
const checkValidToken = (req, res, next) => {
    if (get(req.body, 'appToken') === process.env.DOORAY_TOKEN) {
        next();
    } else {
        return res.status(403).send();
    }
};

// 사용자로부터 커맨드를 받아 처리하기 위한 URL
// 추첨을 생성하는 기능을 불러오게 된다
router.post('/', [checkValidToken, command]);

// Interactive Message Request URL
// 버튼과 드롭다운 메뉴 등 메시지를 통해서 유저와 상호 작용하는 경우, 유저의 요청을 전달받음
// 여기서는 추첨에 관련된 기능들을 수행하게 됨
router.post('/req', [checkValidToken, lottery]);

module.exports = router;