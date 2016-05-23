new ConditionalField({
  control: '.select-field',
  visibility: {
    'credit': '.sample--select .credit',
    'check': '.sample--select .check'
  }
});

new ConditionalField({
  control: '.payment-radios',
  visibility: {
    'credit': '.sample--radio .credit',
    'check': '.sample--radio .check'
  }
});

new ConditionalField({
  control: '.payment-checkbox',
  visibility: {
    'off': '.sample--checkbox .credit',
    'on': '.sample--checkbox .check'
  }
});