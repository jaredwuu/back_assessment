const express = require('express');
const axios = require('axios')

const router = express.Router();

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

//GET posts/
router.get('/', async (req, res) => {
    let data ,temData,temPosts;
    let searchTag, arr;
    let sortBy, direction;
    let sortInvalid;
    searchTag = (req.query.tags)
    sortBy = (req.query.sortBy)
    direction = (req.query.direction)

    if (searchTag) {
        arr = searchTag.split(',');
        const url = `https://api.hatchways.io/assessment/blog/posts?tag=${arr[0]}`
        const resp = await axios.get(url)
        temData = resp.data
        data = resp.data
        temPosts = temData.posts
        for(let i = 1; i < arr.length; i++) {
            const url = `https://api.hatchways.io/assessment/blog/posts?tag=${arr[i]}`
            const resp = await axios.get(url)
            temData = resp.data
            temPosts = temPosts.concat(temData.posts)
        }

        data.posts =temPosts
        // data.posts = temPosts.filter(function (value, index, array) {
        //     return array.indexOf(value) === index;
        // });
        data.posts = getUniqueListBy(data.posts,'id')
        // const unique = [...new Map(temPosts.map(item => [item['id'], item])).values()]
        // console.log(unique.length)
        //console.log(data.posts[1]===console.log(data.posts[2]))
        console.log(data.posts.length)        
       
    }

    switch (sortBy) {

        case 'likes':
            if (direction === "desc") {
                data.posts = data.posts.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
            } else {
                data.posts = data.posts.sort((a, b) => (a.likes > b.likes) ? 1 : -1)
            }
            break;
        case 'popularity':
            if (direction === "desc") {
                data.posts = data.posts.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1)
            } else {
                data.posts = data.posts.sort((a, b) => (a.popularity > b.popularity) ? 1 : -1)
            }
            break;
        case 'reads':
            if (direction === "desc") {
                data.posts = data.posts.sort((a, b) => (a.reads > b.reads) ? -1 : 1)
            } else {
                data.posts = data.posts.sort((a, b) => (a.reads > b.reads) ? 1 : -1)
            }
            break;
        default:
            if (direction === "desc") {
                data.posts = data.posts.sort((a, b) => (a.id > b.id) ? -1 : 1)
            } else {
                data.posts = data.posts.sort((a, b) => (a.id > b.id) ? 1 : -1)
            }
            break;
    }

    sortInvalid = sortBy !== 'id' && sortBy !== 'likes' && sortBy !== 'popularity' && sortBy !== 'reads'
    let invalidDirection;
    invalidDirection = direction !== 'desc' && direction !== 'asc'

    if ((sortBy && sortInvalid) || (invalidDirection && direction)) {
        res.status(400).json(
            {
                "error": "sortBy parameter is invalid"
            }
        )
    } else if (data && searchTag) {
        res.status(200).json(
            data
        )
    } else if (!searchTag) {
        res.status(400).json(
            {
                "error": "Tags parameter is required"
            }

        )
    }
});


module.exports = router;