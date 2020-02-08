// ///////////////////////////////////////////////////////////////////////////////////////
// IMPORTS ///////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression')

const app = express();
const api_router = require('./routes');
const PORT = process.env.PORT || 80;
const DIR_PUBLIC = process.env.DIR_PUBLIC || 'public';

// ///////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE ////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(DIR_PUBLIC));
app.use(compression());

// Handle requests to /api/* to be handled by 'api_router'
app.use('/api', api_router);

// ///////////////////////////////////////////////////////////////////////////////////////
// ROUTES ////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////

// Handle an endpoint with a productId (send it to the index.html file)
app.get('/:productId', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});

// ///////////////////////////////////////////////////////////////////////////////////////
// EXPRESS ///////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});