// https://next.json-generator.com/VJw7RklRX
[
  {
    'repeat(5)': {
      _id: '{{objectId()}}',
      img: 'http://www.fillmurray.com/{{random(200,300)}}/{{random(200,300)}}',
      age: '{{integer(20, 40)}}',
      name: {
        firstName:'{{firstName()}}',
        surname: '{{surname()}}'
      },
      username: function (tags) {
        return (this.name.firstName + integer(10,20)).toLowerCase();
      },
      password: '123456',
      email: function (tags) {
        return (this.name.firstName + '@' + this.name.surname + tags.domainZone()).toLowerCase();
      },
      phone: '+47-{{phone("xxx-xx-xxx")}}',
      location: {
        latitude: '{{floating(63.4115681, 63.4169458)}}',
        longitude: '{{floating(10.3882268, 10.3998998)}}'
      },
      products: []
    }
  }
]
