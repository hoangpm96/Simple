module.exports = [
    {
      _id: Math.round(Math.random() * 1000000),
      
        text: "Oh, It is great",
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 1,
        name: "React Native"
      }
    },
    {
      _id: Math.round(Math.random() * 1000000),
      text:
      "I love Cat, and I like playing guitar",
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 1,
        name: "Developer"
      }
    },
  ];;