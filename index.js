const express = require('express');
const app = express();
const databaseConnect = require('./db');
const path = require('path');

databaseConnect();

//reuest body parser
app.use(express.json({ expanded: false }));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use('/api/registration', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));