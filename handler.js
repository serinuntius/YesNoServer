'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const aws = require('aws-sdk');
aws.config.update({region: 'ap-northeast-1'});


const dynamo = new aws.DynamoDB.DocumentClient();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const create = (user_params) => {

  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Users',
      Item: {
        device_token: user_params.device_token,
        status: false
      },
      ConditionExpression: 'attribute_not_exists(device_token)'
    };

    dynamo.put(params, function (err, data) {
      if (err) {
        if (err.code == 'ConditionalCheckFailedException') {
          // 既存ユーザ
          const res = {
            device_token: user_params.device_token
          };
          resolve(res);
        }
        reject(err);
      } else {
        const res = {
          device_token: user_params.device_token,
          status: false
        };
        resolve(res);
      }
    })
  })
};

const update = (params) => {
  return new Promise((resolve, reject) => {

    const user_params = {
      TableName: 'Users',
      Key: {
        "device_token": params.device_token
      },
      ExpressionAttributeValues: {
        ":status": params.status
      },
      ReturnValues: "UPDATED_NEW"
    };

    dynamo.update(user_params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        console.log(data);

        resolve(data);
      }
    })
  })
};

const find = (params) => {
  return new Promise((resolve, reject) => {

    const user_params = {
      TableName: 'Users',
      Key: {
        "device_token": params.device_token
      }
    };

    dynamo.get(user_params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        console.log(data.Item);

        resolve(data.Item);
      }
    })
  })
};


app.post('/api/v1/login', (req, res) => {
  console.log(req);
  create(req.body)
    .then((data) => {
      console.log(data);
      res.send(data)
    })
    .catch((err) => {
      console.log('[ERROR]', err)
    });
});


app.post('/api/v1/status_check', (req, res) => {
  console.log(req.body);

  const users = req.body.users;
  Promise.all(users.map((user) => {
    return find(user).then(data => {
      return data
    })
  })).then((return_users) => {
    const filtered_users = return_users.filter((user) => {
      return (user !== undefined)
    });
    console.log(filtered_users);
    const res_data = {
      users: filtered_users
    };
    console.log(res_data);

    res.send(res_data);
  });
});


app.post('/api/v1/status', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

exports.app = require('express-on-serverless')(app);

// ローカルで開発するときはコメントアウトしない
// var server = app.listen(3000, function () {
//   console.log("Node.js is listening to PORT:" + server.address().port);
// });