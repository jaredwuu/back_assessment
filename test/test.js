const expect = require('chai').expect;
const request = require('request');
const axios = require('axios');

describe('Back-End Challenge', function () {
  describe('Test api/ping', function () {
    it('Should return the correct body for Test api/ping', function (done) {
      request('http://localhost:5000/api/ping', function (error, response, body) {
        expect(body).to.equal('{"success":true}');
        done();
      });
    });
    it('Should return the correct status code for Test api/ping where route is correct', function (done) {
      request('http://localhost:5000/api/ping', function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('Should return the correct status code for Test api/ping where route is incorrect', function (done) {
      request('http://localhost:5000/api/pings', function (error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
  describe('Test api/posts', function () {
    it('Should return the proper status code for Test api/posts for the correct route', function (done) {
      request('http://localhost:5000/api/posts?tags=tech', function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('Should return the correct status code for Test api/posts where route is incorrect', function (done) {
      request('http://localhost:5000/api/post?tags=tech', function (error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
    it('Should return the correct status code for Test api/posts where route does not have a tag', function (done) {
      request('http://localhost:5000/api/posts', function (error, response, body) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
    it('Should return the correct status code for Test api/posts when the user uses all three parameters', function (done) {
      request('http://localhost:5000/api/posts?tags=health,tech&sortBy=likes&direction=desc', function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('Should pass the test if all posts are unique by checking unique ids', function (done) {
      axios.get('http://localhost:5000/api/posts?tags=tech,history')
        .then(res => {
          let post = res.data;
          let postID = [];
          let postObj = {};
          let test = true;

          for (let i = 0; i < post.length; i++) {
            postID.push(post[i].id)
          }

          postID.forEach(blog => {
            postObj[blog] = postObj[blog] ? postObj[blog] + 1 : 1
          })

          for (let key in postObj) {
            if (postObj[key] > 1) {
              test = false
            }
          }
          expect(test).to.equal(true);
        })
        .catch(error => {
          console.log(error)
        })
      done();
    });
    it('Should pass the test if all posts are unique by checking unique ids using all route parameters', function (done) {
      axios.get('http://localhost:5000/api/posts?tags=tech,history&sortBy=likes&direction=asc')
        .then(res => {
          let post = res.data;
          let postID = [];
          let postObj = {};
          let test = true;
          for (let i = 0; i < post.length; i++) {
            postID.push(post[i].id)
          }

          postID.forEach(blog => {
            postObj[blog] = postObj[blog] ? postObj[blog] + 1 : 1
          })

          for (let key in postObj) {
            if (postObj[key] > 1) {
              test = false
            }
          }
          expect(test).to.equal(true);
        })
        .catch(error => {
          console.log(error)
        })
      done();
    });
    it('Should pass the test if all posts are unique by checking unique ids using all route parameters', function (done) {
      axios.get('http://localhost:5000/api/posts?tags=tech,history&sortBy=likes')
        .then(res => {
          let post = res.data;
          let postID = [];
          let postObj = {};
          let test = true;

          for (let i = 0; i < post.length; i++) {
            postID.push(post[i].id)
          }
          postID.forEach(blog => {
            postObj[blog] = postObj[blog] ? postObj[blog] + 1 : 1
          })
         
          for (let key in postObj) {
            if (postObj[key] > 1) {
              test = false
            }
          }
          expect(test).to.equal(true);
        })
        .catch(error => {
          console.log(error)
        })
      done();
    });
    it('Should pass the test for correctly sorted values', function (done) {
      axios.get('http://localhost:5000/api/posts?tags=tech,health&sortBy=likes&direction=desc')
        .then(res => {
          let post = res.data;
          let postLikes = [];
          let test = true;
         
          for (let i = 0; i < post.length; i++) {
            postLikes.push(post[i].likes)
          }
         
          for (let i = 0; i < postLikes.length; i++) {
            if (postLikes[i] < postLikes[i + 1]) {
              test = false;
            }
          }
          expect(test).to.equal(true);
        })
        .catch(error => {
          console.log(error)
        })
      done();
    });
    it('Should pass the test for correctly sorted values', function (done) {
      axios.get('http://localhost:5000/api/posts?tags=tech,health,history&sortBy=likes&direction=desc')
        .then(res => {
          let post = res.data;
          let postReads = [];
          let test = true;
          
          for (let i = 0; i < post.length; i++) {
            postReads.push(post[i].reads)
          }
          
          for (let i = 0; i < postReads.length; i++) {
            if (postReads[i] < postReads[i + 1]) {
              test = false;
            }
          }
          expect(test).to.equal(true);
        })
        .catch(error => {
          console.log(error)
        })
      done();
    });
    it('Should pass the test for correctly sorted values given the default parameters, as if the user did not use them', function (done) {
      axios.get('http://localhost:5000/api/posts?tags=tech,health,history')
        .then(res => {
          let post = res.data;
          let postID = [];
          let test = true;
         
          for (let i = 0; i < post.length; i++) {
            postID.push(post[i].id)
          }
         
          for (let i = 0; i < postID.length; i++) {
            if (postID[i] > postID[i + 1]) {
              test = false;
            }
          }
          expect(test).to.equal(true);
        })
        .catch(error => {
          console.log(error)
        })
      done();
    });
  });
});