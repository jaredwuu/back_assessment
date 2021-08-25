const express = require('express');
const app = express();
const axios = require('axios')
const bodyParser = require('body-parser');
const route1 = require('./routes/route1')
const route2 = require('./routes/route2')
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const apicache = require('apicache-plus');

app.use(apicache('10 minutes'))

app.get('/posts', async (req, res) => {
    const tag = req.query.tag;
    let data;
    const url = `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`
    try {
        const resp = await axios.get(url)
        data = resp.data
        if (data.posts.length > 0) {
            res.status(200).json(
                data
            )
        }else{
            res.status(400).json(
                {
                    "error": "Tags parameter is required"
                }
    
            )
        }
    }
    catch (err) {
        res.status(400).json(
            {
                "error": "Tags parameter is required"
            }

        )
    }
})


app.use('/api/ping', route1)

app.use('/api/posts', route2);

app.listen(5000, () => { console.log('Server has started on port 5000') })