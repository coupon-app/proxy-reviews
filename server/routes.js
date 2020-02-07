// ///////////////////////////////////////////////////////////////////////////////////////
// IMPORTS ///////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const axios = require('axios');
let router = express.Router();

// Create a variable to store details of app services endpoints and Dynamic DNS/EC2 addresses
const routesDescription = [
  {
    urlEntry: '/reviews',
    urlEndpoint: '/api/reviews',
    urlRedirect: 'service-reviews.duckdns.org',
  },
  {
    urlEntry: '/products',
    urlEndpoint: '/api/products',
    urlRedirect: 'carousel.duckdns.org'
  },
  {
    urlEntry: '/checkout',
    urlEndpoint: '/api/checkout',
    urlRedirect: '18.188.34.11:3003'
  }
]


//////////////////////////////////////////////////////////////////////////////////////////
// ROUTES ////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

routesDescription.forEach((route) => {
  const { urlEntry, urlEndpoint, urlRedirect } = route;
  router.get(`${urlEntry}/:productId`, (req, res) => {
    const { productId } = req.params || 0; // Create variable to store productId req.params
    const { page, limit } = req.query; // Create variable to store page/limit from req.query

    let url = `http://${urlRedirect}${urlEndpoint}/${productId}`;
    page ? url += `?page=${page}` : null
    limit ? url += `&limit=${limit}` : null
    console.log(`About to forward a request to ${url}`);
    axios.get(url)
      .then((response) => res.status(200).send(response.data))
      .catch((err) => res.status(404).send(err));
  })
})


// ///////////////////////////////////////////////////////////////////////////////////////
// EXPORTS ///////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
module.exports = router
