import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

const { get, set, run } = Ember;

moduleForComponent('time-field', 'Integration | Component | {{time-field}}', {
  integration: true,
  beforeEach: function() {
    this.on('update', function(value) {
      this.set('value', value);
    });
  }
});

test('Renders time in input', function(assert) {
  set(this, 'datetime', new Date(2015, 0, 1, 12, 30));

  this.render(hbs`{{time-field value=datetime}}`);

  assert.equal(this.$('input[type="time"]:eq(0)').val(), '12:30');
});

test('Filling in a time changes value', function(assert) {
  this.on('update', function(value) {
    set(this, 'datetime', value);
  });

  this.render(hbs`{{time-field value=datetime updated=(action 'update')}}`);

  const $timeInput = this.$('input[type="time"]:eq(0)');

  run(() => {
    $timeInput.val('12:30');
    $timeInput.trigger('change');
  });

  const date = new Date();
  date.setHours(12);
  date.setMinutes(30);
  date.setSeconds(0);
  date.setMilliseconds(0);

  assert.equal(+get(this, 'datetime'), +(date), 'sets time with date today');
});

test('Changes value after changing input', function(assert) {
  set(this, 'datetime', new Date(2015, 0, 1, 12, 30));

  this.on('update', function(value) {
    set(this, 'datetime', value);
  });

  this.render(hbs`{{time-field value=datetime updated=(action 'update')}}`);

  const $timeInput = this.$('input[type="time"]:eq(0)');

  run(() => {
    $timeInput.val('13:45');
    $timeInput.trigger('change');
  });

  assert.equal(+get(this, 'datetime'), +(new Date(2015, 0, 1, 13, 45)),
               'updates time');
});
