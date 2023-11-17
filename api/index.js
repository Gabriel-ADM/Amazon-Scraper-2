
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

// Get Amazon items info by searching with a keyword
app.get("/api", async (req, res) => {
    try {
        const searchKey = req.query.keyword;
        // Searching the product and sorting it by best sellers, with the second query parameter
        const amazonUrl = `https://www.amazon.com/s?k=${searchKey}&s=exact-aware-popularity-rank`;

        if (!searchKey) {
            return res.status(400).send("Bad Request: 'keyword' query parameter is required.");
        }

        // This if return ficctional in case your IP Address is blocked
        if (searchKey === 'test' || searchKey === 'ficctional data') {
            return res.status(202).send([
                {
                    "name": "6.89 Inch Giant Glitter Rubber Duck Big Glitter Rubber Ducky Jumbo Sparkly Duck Bath Toy with Squeaky Sound for Baby Shower Birthday Party Favor Gift Summer Beach Pool (Glitter,Dark Blue)",
                    "image": "https://m.media-amazon.com/images/I/81kMMzjDRIL._AC_UL320_.jpg",
                    "link": "https://www.amazon.com/Glitter-Rubber-Sparkly-Squeaky-Birthday/dp/B0C6Q2FJ7G/ref=sr_1_1?keywords=pato&qid=1699580619&sr=8-1",
                    "rating": "4.8 out of 5 stars",
                    "totalRatings": "37",
                    "price": "$15.99",
                    "pos": 1,
                    "ASIN": "B0C6Q2FJ7G"
                },
                {
                    "name": "Assorted Rubber Ducks Toy Duckies for Kids and Toddlers, Bath Birthday Baby Showers Classroom, Summer Beach and Pool Activity, 2\" Inches (25-Pack)",
                    "image": "https://m.media-amazon.com/images/I/81Dbq1Lq7BL._AC_UL320_.jpg",
                    "link": "https://www.amazon.com/Assorted-Toddlers-Birthday-Classroom-Activity/dp/B0B7Q651ST/ref=sr_1_2?keywords=pato&qid=1699580619&sr=8-2",
                    "rating": "4.6 out of 5 stars",
                    "totalRatings": "895",
                    "price": "$15.99",
                    "pos": 2,
                    "ASIN": "B0B7Q651ST"
                },
                {
                    "name": "Andrea Camilleri's The Vanishing Of Pato [DVD]",
                    "image": "https://m.media-amazon.com/images/I/71SmbiiGupL._AC_UL320_.jpg",
                    "link": "https://www.amazon.com/Andrea-Camilleris-Vanishing-Pato-DVD/dp/B01ABUYANQ/ref=sr_1_3?keywords=pato&qid=1699580619&sr=8-3",
                    "rating": "3.8 out of 5 stars",
                    "totalRatings": "42",
                    "price": "$26.25",
                    "pos": 3,
                    "ASIN": "B01ABUYANQ"
                },
                {
                    "name": "Women's Patos Slides",
                    "image": "https://m.media-amazon.com/images/I/613ELLBccDL._AC_UL320_.jpg",
                    "link": "https://www.amazon.com/Tory-Burch-Womens-Slides-Perfect/dp/B08R1NXRG6/ref=sr_1_4?keywords=pato&qid=1699580619&sr=8-4",
                    "rating": "4.3 out of 5 stars",
                    "totalRatings": "32",
                    "price": "$248.00",
                    "pos": 4,
                    "ASIN": "B08R1NXRG6"
                },
                {
                    "name": "White Duck Stuffed Animal Toy Soft Plush Toy for Kids Girls DIY Hugglable Plush Stuffed Toy with Cute Pink Hat and Costume Best Gifts for Christmas . (12inch/30cm)",
                    "image": "https://m.media-amazon.com/images/I/71M-PuLmuRL._AC_UL320_.jpg",
                    "link": "https://www.amazon.com/Stuffed-Animal-Hugglable-Costume-Birthday/dp/B08YRMPPNC/ref=sr_1_5?keywords=pato&qid=1699580619&sr=8-5",
                    "rating": "4.7 out of 5 stars",
                    "totalRatings": "1,681",
                    "price": "$20.89",
                    "pos": 5,
                    "ASIN": "B08YRMPPNC"
                },
                {
                    "name": "Cute Rubber Duck Throw Blanket Ultra Soft Warm All Season Yellow Cartoon Ducks Decorative Fleece Blankets for Bed Chair Car Sofa Couch Bedroom 50\"X40\"",
                    "image": "https://m.media-amazon.com/images/I/81WhKDvqfEL._AC_UL320_.jpg",
                    "link": "https://www.amazon.com/Perinsto-Blanket-Cartoon-Decorative-Blankets/dp/B09LT7CKW8/ref=sr_1_6?keywords=pato&qid=1699580619&sr=8-6",
                    "rating": "4.7 out of 5 stars",
                    "totalRatings": "158List: ",
                    "price": "$20.99$21.99",
                    "pos": 6,
                    "ASIN": "B09LT7CKW8"
                },
                {
                    "name": "Goose Stuffed Animal 20 Inch Cute Duck Plush Toy, Goose Plush Soft Swan Hugging Pillow, Gift for Kids and Friends, White",
                    "image": "https://m.media-amazon.com/images/I/6167wRsyI9L._AC_UL320_.jpg",
                    "link": "https://www.amazon.com/CottonStar-Stuffed-Animal-Hugging-Friends/dp/B0BV9NM7R1/ref=sr_1_7?keywords=pato&qid=1699580619&sr=8-7",
                    "rating": "4.5 out of 5 stars",
                    "totalRatings": "200",
                    "price": "$11.99",
                    "pos": 7,
                    "ASIN": "B0BV9NM7R1"
                },
                {
                    "name": "Yellow Duck Stuffed Plush Pillow Animal Dolls Super Soft Huggable Toy Gift for Children",
                    "image": "https://m.media-amazon.com/images/I/51vnlvh3LiL._AC_UL320_.jpg",
                    "link": "https://www.amazon.com/Adanina-Yellow-Stuffed-Huggable-Children/dp/B07HG3W9PV/ref=sr_1_8?keywords=pato&qid=1699580619&sr=8-8",
                    "rating": "4.6 out of 5 stars",
                    "totalRatings": "782",
                    "price": "$9.99",
                    "pos": 8,
                    "ASIN": "B07HG3W9PV"
                },
                {
                    "name": "Big Duck Stuffed Animal Clothes Accessories 12 in Duck Plush Kawaii Stuffed Animal Toy with Glasses, Large Cute Plushies Super Soft Plush for Girls Boys, Softest Birthday Valentine Gift (Yellow)",
                    "image": "https://m.media-amazon.com/images/I/61ZXpXs0cJL._AC_UL320_.jpg",
                    "link": "https://www.amazon.com/Stuffed-Accessories-Plushies-Birthday-Valentine/dp/B0BVFNST7G/ref=sr_1_9?keywords=pato&qid=1699580619&sr=8-9",
                    "rating": "4.6 out of 5 stars",
                    "totalRatings": "39",
                    "price": "$42.99",
                    "pos": 9,
                    "ASIN": "B0BVFNST7G"
                }])
        }
        const response = await scrapAmazonSearch(amazonUrl);

        if (response.length === 0) {
            return res.status(401).send("Bad Request: 'keyword' did not return any data.");
        }
        if (response.error) {
            return res.status(500).send(`Failed to fetch data from Amazon. Error: ${response.error}`);
        }

        return res.status(200).send(response);
    } catch (err) {
        console.log(err);
        return res.status(500).send(`Something went wrong, internal server error.\n Error:${err}`);
    }
})

// Running the api server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})

// Scraping items function
async function scrapAmazonSearch(url) {
    try {
        const pageRes = await axiosInstance.get(url);
        const $ = cheerio.load(pageRes.data);

        // Get quantity of pages of a product and limiting to five
        let pageNumber = $('.s-pagination-container').find('.s-pagination-item').last().prev().text();
        pageNumber = pageNumber > 5 ? 5 : pageNumber;

        const products = [];
        let position = 1;
        for (let page = 1; page <= parseInt(pageNumber); page++) {
            // Scrap product data from each page retrieved
            let pageRes = await axiosInstance.get(`${url}&page=${page}`);
            const $ = cheerio.load(pageRes.data);

            const table = $('.s-result-list');
            table.find('.s-result-item').each((index, product) => {
                const name = $(product).find('.a-text-normal').find('.a-text-normal').text();
                const image = $(product).find('.s-image').attr('src');
                const link = 'https://www.amazon.com' + $(product).find('.a-link-normal').attr('href');
                const price = $(product).find('.a-offscreen').text();
                const rating = $(product).find('.a-icon-alt').text();
                const totalRatings = $(product).find('.a-section').find('.a-link-normal').find('.a-size-base').text();

                // The following regex expression gets the string after /dp/ and before the next / in the product URL
                // That's where the ASIN code is in amazon products
                const ASIN = link.match(/\/dp\/([^\/]+)/) ? link.match(/\/dp\/([^\/]+)/)[1] : null;

                // After getting the data from the currently tags, pushing them into a response array
                if (name !== '' && name !== undefined && ASIN !== null) {
                    products.push({
                        name: name,
                        image: image,
                        link: link,
                        rating: rating === '' ? 0 : rating,
                        totalRatings: rating === '' ? "$0.00" : totalRatings,
                        price: price,
                        page: page,
                        ASIN: ASIN,
                        pos: position,
                    });
                }
                position++;
            })

        }
        return products;
    } catch (err) {
        console.log(err);
        return [];
        // throw err;
    }
}
