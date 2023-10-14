const request = require('supertest');
const app = require('./server')
const axios = require('axios')
const User = require('./models/userMode')
const mongoose= require('mongoose')

const testUser = {
  favorites: [
    "648fb640c6d5fe0097a51d0f",
    "648fb639c6d5fe0097a51d07",
    ],
    _id: '64fbb9e2e2046c008fd98136',
    email: 'same@gmail.com',
    password: '$2b$10$IkeHDINtJMsCkQleSQRv7u6yfq9eO0oOsr2MXuswcfW1kz7zakqYO',
    username: 'try',
    firstName: 'Miaou',
    lastName: 'Gkaou',
    birthday: '1997-09-10',
    entryDate: '2023-09-09T00:18:42.140Z',
    __v: 2,
    refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRyeSIsImlhdCI6MTY5NDQ3OTA4OCwiZXhwIjoxNjk0NTY1NDg4fQ.A7q07RXC9uaGV9fuD_p0Ynant2fx7rSab4QJPnBF0jA',
  };


  describe('/hello endpoint', () => {
    it('should return the user object when the username is "try"', async () => {
      // Simulate a GET request to the /hello endpoint
      // const user = await User.find({username:"try"}).then(result=> {
      //   console.log(result)
      // })
      const response = await axios.get('/hello');
      // console.log(response.status)
      // Add assertions to test the response
      expect(response.status).toBe(200); // Check that the status code is 200 (OK)
      expect(response.data).toEqual(testUser); // Compare the response to the testUser object
    });
  },25000);

