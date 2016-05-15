new ConditionalField({
  control: '.select-field',
  visibility: {
    'mothers': '.test-select .zappa',
    'spiders': '.test-select .bowie'
  }
});

new ConditionalField({
  control: '.test-radio [name="artists"]',
  visibility: {
    'mothers': '.test-radio .zappa',
    'spiders': '.test-radio .bowie'
  }
});

new ConditionalField({
  control: '.test-checkbox input[type="checkbox"]',
  visibility: {
    'off': '.test-checkbox .zappa',
    'on': '.test-checkbox .bowie'
  }
});