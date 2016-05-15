describe('ConditionalField', function() {
  describe('#constructor', function(){
    it('shows only visible elements on page load', function() {
      new ConditionalField({
        control: '.test-select select',
        visibility: {
          'mothers': '.test-select .zappa',
          'spiders': '.test-select .bowie'
        }
      });

      expect($('.test-select .zappa').is(':visible')).to.equal(true)
      expect($('.test-select .bowie').is(':visible')).to.equal(false)
    });

    describe('when control selector contains no results', function(){
      it('returns silently', function(){
        var cf = new ConditionalField({
          control: '.does-not-exist',
          visibility: {
            'mothers': '.test-select .zappa',
            'spiders': '.test-select .bowie'
          }
        });

        expect(cf.args).to.equal(undefined);
      });
    });
  });

  describe('#getInputType', function(){
    describe('when control is a `select` element', function(){
      it('returns "select"', function(){
        var cf = new ConditionalField({
          control: '.test-select select',
          visibility: {
            'off': '.test-checkbox .zappa',
            'on': '.test-checkbox .bowie'
          }
        });

        expect(cf.getInputType()).to.equal('select');
      });
    });

    describe('when control is a `radio` input', function(){
      it('returns "radio"', function(){
        var cf = new ConditionalField({
          control: '.test-radio [type="radio"]',
          visibility: {
            'off': '.test-checkbox .zappa',
            'on': '.test-checkbox .bowie'
          }
        });

        expect(cf.getInputType()).to.equal('radio');
      });
    });

    describe('when control is a `checkbox` input', function(){
      it('returns "checkbox"', function(){
        var cf = new ConditionalField({
          control: '.test-checkbox [type="checkbox"]',
          visibility: {
            'off': '.test-checkbox .zappa',
            'on': '.test-checkbox .bowie'
          }
        });

        expect(cf.getInputType()).to.equal('checkbox');
      });
    });
  });

  describe('#destroy', function(){
    it('removes the `change` event handler', function(){
      var cf = new ConditionalField({
        control: '.test-destroy select',
        visibility: {
          'mothers': '.test-destroy .zappa',
          'spiders': '.test-destroy .bowie'
        }
      });

      expect($('.test-destroy .zappa').is(':visible')).to.equal(true);
      expect($('.test-destroy .bowie').is(':visible')).to.equal(false);

      cf.destroy();

      $('.test-destroy select').val('spiders').trigger('change');

      expect($('.test-destroy .zappa').is(':visible')).to.equal(true);
      expect($('.test-destroy .bowie').is(':visible')).to.equal(false);
    });
  });

  describe('when the control changes value', function(){
    describe('and the control is a `select` element', function(){
      it('shows only visible elements declared in visibility', function(){
        new ConditionalField({
          control: '.test-select select',
          visibility: {
            'mothers': '.test-select .zappa',
            'spiders': '.test-select .bowie'
          }
        });

        $('.test-select select').val('spiders').trigger('change');

        expect($('.test-select .zappa').is(':visible')).to.equal(false)
        expect($('.test-select .bowie').is(':visible')).to.equal(true)
      });
    });

    describe('and the control is a `radio` element', function(){
      it('shows only visible elements declared in visibility', function(){
        new ConditionalField({
          control: '.test-radio [name="artists"]',
          visibility: {
            'mothers': '.test-radio .zappa',
            'spiders': '.test-radio .bowie'
          }
        });

        $('.test-radio [value="spiders"]').prop('checked', true).trigger('change');

        expect($('.test-radio .zappa').is(':visible')).to.equal(false)
        expect($('.test-radio .bowie').is(':visible')).to.equal(true)
      });
    });

    describe('and the control is a `checkbox` element', function(){
      it('shows the `on` value when checked, and the `off` value when unchecked', function(){
        new ConditionalField({
          control: '.test-checkbox input[type="checkbox"]',
          visibility: {
            'off': '.test-checkbox .zappa',
            'on': '.test-checkbox .bowie'
          }
        });

        $('.test-checkbox [type="checkbox"]').prop('checked', true).trigger('change');

        expect($('.test-checkbox .zappa').is(':visible')).to.equal(false);
        expect($('.test-checkbox .bowie').is(':visible')).to.equal(true);

        $('.test-checkbox [type="checkbox"]').prop('checked', false).trigger('change');

        expect($('.test-checkbox .zappa').is(':visible')).to.equal(true)
        expect($('.test-checkbox .bowie').is(':visible')).to.equal(false)
      });
    });
  });
});