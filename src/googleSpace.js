require("dotenv").config();
const { google } = require('googleapis');
const axios = require('axios');
const { env } = require("process");

// Function to send a message to a Support - Scheduled Meetings Google Chat space

// const spaceName = process.env.SPACE_NAME;
// const spaceKey = process.env.SPACE_KEY;
// const spaceToken = process.env.SPACE_TOKEN;

// Below are the test space creds

const spaceName = process.env.TEST_SPACE_NAME;
const spaceKey = process.env.TEST_SPACE_KEY;
const spaceToken = process.env.TEST_SPACE_TOKEN;

console.log(spaceName, spaceKey, spaceToken);

// const sendMessageToGoogleSpace = async (messageText, startTime, endTime, interval, time)

const sendMessageToGoogleSpace = async (messageText) => {
    console.log('-----Entered Space API func-----');
  const url = `https://chat.googleapis.com/v1/spaces/${spaceName}/messages?key=${spaceKey}&token=${spaceToken}`;
  
  const message = {
    text: messageText
    // text: `Testing node cron job: ${interval} alert at ${time}\n\n`+messageText
  };

  console.log(message);

  try {
    const response = await axios.post(url, message);
    console.log('Message sent to Google Space: ', response.data);
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    throw new Error('Failed to send the message');
  }
}

// const spaceName = 'AAAAbCB2rvY';
// const userId = '105310362366424071704';
// const message = `Hello <users/${userId}>!!!!`;  


// sendMessageToGoogleSpace(message);

module.exports = sendMessageToGoogleSpace;