const express = require('express');
const { DateTime } = require('luxon');
const sendMessageToGoogleSpace = require('./src/googleSpace');
require("dotenv").config();

const app = express();

// Main function to handle the logic
const main = async (req, res) => {
    console.log('------Entered Main function-----');
  try {
    const currentDateTime = DateTime.now().setZone('Asia/Kolkata');
    const date = currentDateTime.toFormat('yyyy-MM-dd');
    const time = currentDateTime.toFormat('hh:mm a');
    
    console.log(`Date: ${date}, Time: ${time}`);

    const message = `Testing cron job from Vercel at ${date} - ${time}`;
    console.log('-----Call Send Message to Space API-----');
    await sendMessageToGoogleSpace(message);

    // Send a success response
    res.status(200).send(`Cron message sent successfully at ${time}`);
  } catch (error) {
    console.error('Error while sending message:', error);
    res.status(500).send('Error while sending a message');
  }
};

app.get('/', main);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
