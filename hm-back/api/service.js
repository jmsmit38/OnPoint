'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.newService = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const userID = requestBody.userID;
  const location = requestBody.location;
  const numareas = requestBody.numareas;
  const sqft = requestBody.sqft;
  const rooms = requestBody.rooms;
  const walls = requestBody.walls;
  const timeline = requestBody.timeline;
  const finance = requestBody.finance;
  const description = requestBody.description;

  if (typeof userID !== 'string' || typeof location !== 'string' || typeof numareas !== 'string' || typeof sqft !== 'string' || typeof rooms !== 'string' || typeof walls !== 'string' || typeof timeline !== 'string' || typeof finance !== 'string' || typeof description !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit service request because of validation errors.'));
    return;
  }

  submitServiceP(serviceInfo(userID, location, numareas, sqft, rooms, walls, timeline, finance, description))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted service request`,
          serviceID: res.serviceID
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit service request`
        })
      })
    });
};

module.exports.getServices = (event, context, callback) => {
  var params = {
      TableName: process.env.SERVICE_TABLE,
      ProjectionExpression: "serviceID, userID, location, numareas, sqft, rooms, walls, timeline, finance, description"
  };

  console.log("Scanning Service table.");
  const onScan = (err, data) => {

      if (err) {
          console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
          callback(err);
      } else {
          console.log("Scan succeeded.");
          return callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                  services: data.Items
              })
          });
      }
  };
  dynamoDb.scan(params, onScan);
};

module.exports.getServiceDetails = (event, context, callback) => {
  const params = {
    TableName: process.env.SERVICE_TABLE,
    Key: {
      serviceID: event.pathParameters.serviceID,
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
      callback(new Error('Couldn\'t fetch service.'));
      return;
    });
};


const submitServiceP = service => {
  console.log('Submitting service request');
  const serviceInfo = {
    TableName: process.env.SERVICE_TABLE,
    Item: service,
  };
  return dynamoDb.put(serviceInfo).promise()
    .then(res => service);
};

const serviceInfo = (userID, location, numareas, sqft, rooms, walls, timeline, finance, description) => {
  const timestamp = new Date().getTime();
  return {
    serviceID: uuid.v1(),
    userID: userID,
    location: location,
    numareas: numareas,
    sqft: sqft,
    rooms: rooms,
    walls: walls,
    timeline: timeline,
    finance: finance,
    description: description,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};
