//express and port
const express = require('express');
const app = express();
const cors = require ('cors');
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
require('dotenv/config');

//import routes
const admin = require('./routes/admin');
const instructor = require('./routes/instructor');
const auth = require('./routes/auth');
const documents = require('./routes/documents');
const reviewer = require('./routes/reviewer');

//middleware
app.use(cors());
app.use('/api/admin/:adminUser', admin);
app.use('/api/instructor/:instructorUser', instructor)
app.use('/api/reviewer/:reviewerUser',reviewer);
app.use('/api/auth', auth);
app.use('/api/documents', documents);

//DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('DB connected.')
})
.catch((err) => {
    console.log(err);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
