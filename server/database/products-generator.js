// https://next.json-generator.com/V1MymexR7
[
  {
    'repeat(40)': {
      _id: '{{objectId()}}',
      createdAt: '{{moment(this.date(new Date(2014, 0, 1), new Date())).unix()}}',
      description: '{{lorem(1, "paragraphs")}}',
      name: '{{lorem(2, "words")}}',
      image: 'http://via.placeholder.com/{{random(300,350,400)}}x{{random(200,300,350)}}',
      price: '{{integer(300,20000)}}',
      userId: ''
    }
  }
]
