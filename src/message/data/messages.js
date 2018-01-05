module.exports = [
    {
      _id: Math.round(Math.random() * 1000000),
      text: "I'm single",
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 1, // là bên phải, của mình 
        name: 'Developer',
      },
      sent: true,
      received: true,
      // location: {
      //   latitude: 48.864601,
      //   longitude: 2.398704
      // },
    },
    {
      _id: Math.round(Math.random() * 1000000),
      text: 'Did you have girlfriend?',
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 2, // của người ta
        name: 'React Native',
      },
    },
  ];