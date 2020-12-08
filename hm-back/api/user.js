'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.newUser = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const firstname = requestBody.firstname;
  const lastname = requestBody.lastname;
  const email = requestBody.email;
  const phone = requestBody.phone;
  const address1 = requestBody.address1;
  const address2 = requestBody.address2;
  const city = requestBody.city;
  const stateCode = requestBody.stateCode;

  if (typeof firstname !== 'string' || typeof lastname !== 'string' || typeof email !== 'string' || typeof phone !== 'string' || typeof address1 !== 'string' || typeof address2 !== 'string' || typeof city !== 'string' || typeof stateCode !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit candidate because of validation errors.'));
    return;
  }

  submitUserP(userInfo(firstname, lastname, email, phone, address1, address2, city, stateCode))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted user with email ${email}`,
          userID: res.userID
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit user with email ${email}`
        })
      })
    });
};

module.exports.getUsers = (event, context, callback) => {
  var params = {
      TableName: process.env.USER_TABLE,
      ProjectionExpression: "userID, firstname, lastname, email, phone, address1, address2, city, stateCode"
  };

  console.log("Scanning User table.");
  const onScan = (err, data) => {

      if (err) {
          console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
          callback(err);
      } else {
          console.log("Scan succeeded.");
          return callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                  users: data.Items
              })
          });
      }

  };

  dynamoDb.scan(params, onScan);

};

module.exports.getUserDetails = (event, context, callback) => {
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      userID: event.pathParameters.userID,
    },
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t fetch candidate.'));
      return;
    });
};


const submitUserP = user => {
  console.log('Submitting user');
  const userInfo = {
    TableName: process.env.USER_TABLE,
    Item: user,
  };
  return dynamoDb.put(userInfo).promise()
    .then(res => user);
};

const userInfo = (firstname, lastname, email, phone, address1, address2, city, stateCode) => {
  const timestamp = new Date().getTime();
  return {
    userID: uuid.v1(),
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    address1: address1,
    address2: address2,
    city: city,
    stateCode: stateCode,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};