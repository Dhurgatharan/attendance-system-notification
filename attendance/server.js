// server.js
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Twilio credentials
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
  const { studentName, date, status } = req.body;
  
  // Construct your message
  const message = `${studentName}'s attendance on ${date} is marked as ${status}.`;

  // Send SMS using Twilio
  client.messages.create({
    body: message,
    from: '+your_twilio_number',
    to: '+student_phone_number' // Retrieve from database in a real-world scenario
  })
  .then(message => res.json({ success: true, message: message.sid }))
  .catch(error => res.status(500).json({ success: false, error }));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
