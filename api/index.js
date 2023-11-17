
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');

// Initializing the node API
const app = express();
const port = 3333;
const axiosInstance = axios.create();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Base endpoint that tells if everything is okay
app.get("/", async (req, res) => {
    return res.status(200).send("Server sucessfully running!");
});