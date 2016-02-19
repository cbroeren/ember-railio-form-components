import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

const { get, set, run } = Ember;

moduleForComponent('date-picker', 'Integration | Component | {{date-picker}}', {
  integration: true,
  beforeEach: function() {
    this.on('update', function(value) {
      this.set('value', value);
    });
  }
});

test('Renders date in input', function(assert) {
  set(this, 'datetime', new Date(2015, 0, 1, 12, 30));

  this.render(hbs`{{date-picker value=datetime}}`);

  assert.equal(this.$('input[type="date"]:eq(0)').val(), '2015-01-01');
});

test('Filling in a date changes value', function(assert) {
  this.on('update', function(value) {
    set(this, 'datetime', value);
  });

  this.render(hbs`{{date-picker value=datetime updated=(action 'update')}}`);

  const $dateInput = this.$('input[type="date"]:eq(0)');

  run(() => {
    $dateInput.val('2015-01-02');
    $dateInput.trigger('change');
  });

  assert.equal(+get(this, 'datetime'), +(new Date(2015, 0, 2, 0, 0)),
               'sets date');
});

test('Changes value after changing input', function(assert) {
  set(this, 'datetime', new Date(2015, 0, 1, 12, 30));

  this.on('update', function(value) {
    set(this, 'datetime', value);
  });

  this.render(hbs`{{date-picker value=datetime updated=(action 'update')}}`);

  const $dateInput = this.$('input[type="date"]:eq(0)');

  run(() => {
    $dateInput.val('2015-01-02');
    $dateInput.trigger('change');
  });

  assert.equal(+get(this, 'datetime'), +(new Date(2015, 0, 2, 12, 30)),
               'updates date');
});
