'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.newReview = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const serviceID= requestBody.serviceID;
  const userID = requestBody.userID;
  const title = requestBody.title;
  const body = requestBody.body;
  const stars = requestBody.stars;

  if (typeof title !== 'string' || typeof body !== 'string' || typeof stars !== 'number') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit review because of validation errors.'));
    return;
  }

  submitReviewP(reviewInfo(serviceID, userID, title, body, stars))
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify({
          message: `Sucessfully submitted review from user ${userID}`,
          reviewID: res.reviewID
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit review from user ${userID}`
        })
      })
    });
};

module.exports.updateReview = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const reviewID = requestBody.reviewID;
  const serviceID= requestBody.serviceID;
  const userID = requestBody.userID;
  const title = requestBody.title;
  const body = requestBody.body;
  const stars = requestBody.stars;
  const submittedAt = requestBody.submittedAt;

  if (typeof userID !== 'string' || typeof title !== 'string' || typeof body !== 'string' || typeof stars !== 'number') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update review because of validation errors.'));
    return;
  }

  updateReviewP(reviewInfoU(reviewID, serviceID, userID, title, body, stars, submittedAt))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully updated review from user ${userID}`,
          reviewID: res.reviewID
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit review from ${userID}`
        })
      })
    });
};

module.exports.getReviews = (event, context, callback) => {
  var params = {
      TableName: process.env.REVIEW_TABLE,
      ProjectionExpression: "reviewID, serviceID, userID, title, body, stars, submittedAt, updatedAt"
  };

  console.log("Scanning Review table.");
  const onScan = (err, data) => {

      if (err) {
          console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
          callback(err);
      } else {
          console.log("Scan succeeded.");
          return callback(null, {
              statusCode: 200,
              headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
              },
              body: JSON.stringify({
                  Reviews: data.Items
              })
          });
      }

  };

  dynamoDb.scan(params, onScan);

};

module.exports.getReviewDetails = (event, context, callback) => {
  const params = {
    TableName: process.env.REVIEW_TABLE,
    Key: {
      reviewID: event.pathParameters.reviewID,
    },
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t get review details.'));
      return;
    });
};

module.exports.deleteReview = (event, context, callback) => {
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      reviewID: event.pathParameters.reviewID,
    },
  };

  dynamoDb.delete(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully deleted review`,
          reviewID: res.reviewID
        }),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t delete review.'));
      return;
    });
};


const submitReviewP = review => {
  console.log('Submitting review');
  const userInfo = {
    TableName: process.env.REVIEW_TABLE,
    Item: review,
  };
  return dynamoDb.put(userInfo).promise()
    .then(res => review);
};

// USE DYNAMIC PROGRAMMING FOR UPDATE!!!! 
// EXAMPLE BELOW
/* 
export const update = (item) => {
  console.log(item)
  const Item = {
    note: "dynamic",
    totalChild: "totalChild",
    totalGuests: "totalGuests"
  };
  let updateExpression='set';
  let ExpressionAttributeNames={};
  let ExpressionAttributeValues = {};
  for (const property in Item) {
    updateExpression += ` #${property} = :${property} ,`;
    ExpressionAttributeNames['#'+property] = property ;
    ExpressionAttributeValues[':'+property]=Item[property];
  }

  
  console.log(ExpressionAttributeNames);


  updateExpression= updateExpression.slice(0, -1);
  
  
   const params = {
     TableName: TABLE_NAME,
     Key: {
      booking_attempt_id: item.booking_attempt_id,
     },
     UpdateExpression: updateExpression,
     ExpressionAttributeNames: ExpressionAttributeNames,
     ExpressionAttributeValues: ExpressionAttributeValues
   };

   return dynamo.update(params).promise().then(result => {
       return result;
   })
   
}
*/

const updateReviewP = review => {
  console.log('Updating review');
  const reviewUp = {
    TableName: process.env.REVIEW_TABLE,
    Key: {
      reviewID: review.reviewID
    },
    ExpressionAttributeValues: {
      ":serviceID": review.serviceID,
      ":userID": review.userID,
      ":title": review.title,
      ":body": review.body,
      ":stars": review.stars,
      ":submittedAt": review.submittedAt,
      ":updatedAt": review.updatedAt  
    },
    UpdateExpression: 'SET serviceID = :serviceID, userID = :userID, title = :title, body = :body, stars = :stars, submittedAt = :submittedAt, updatedAt = :updatedAt',
    ReturnValues: 'UPDATED_NEW',
  };
  return dynamoDb.update(reviewUp).promise()
    .then(res => review);
};

const reviewInfoU = (reviewID, userID, serviceID, title, body, stars, submittedAt) => {
  const timestamp = new Date().getTime();
  return {
    reviewID: reviewID,
    userID: userID,
    serviceID: serviceID,
    title: title,
    body: body,
    stars: stars,
    submittedAt: submittedAt,
    updatedAt: timestamp,
  };
};

const reviewInfo = (userID, serviceID, title, body, stars) => {
  const timestamp = new Date().getTime();
  return {
    reviewID: uuid.v1(),
    userID: userID,
    serviceID: serviceID,
    title: title,
    body: body,
    stars: stars,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};
