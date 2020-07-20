var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
  });
});
router.post('/scan', function(req, res, next) {
  var params = req.body;
  console.log(params);
  var clientId = params.clientId;
  if (global.client.get(clientId)) {
    global.client.get(clientId).emit('QRCODE_START', 'start');
  }
  var userId = params.userId;
  var time = params.time;
  if (global.webServer) {
    global.webServer.emit('refresh', 1);
  }

  setTimeout(() => {
    global.client.get(clientId).emit('QRCODE_FINISHED', {
      userId: userId,
      time: time,
      img: '1212313',
      status: 0,
      recently: ['杭州', '武汉'],
    });
  }, 3000);

  res.json({
    code: 200,
    msg: 'success',
  });
});

router.get('/codes', function(req, res, next) {
  res.json({
    code: 200,
    msg: 'success',
    data: {
      total: 100,
      pages: 10,
      page: 1,
      data: [
        {
          id: '202012312313',
          status: 1,
          time: 20201202101,
          from: 0,
        },
        {
          id: '202012312314',
          status: 1,
          time: 20201202101,
          from: 0,
        },
        {
          id: '202012312315',
          status: 1,
          time: 20201202101,
          from: 0,
        },
        {
          id: '202012312316',
          status: 1,
          time: 20201202101,
          from: 0,
        },
        {
          id: '202012312317',
          status: 1,
          time: 20201202101,
          from: 0,
        },
      ],
    },
  });
});

module.exports = router;
