import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';

if (Meteor.isClient) {
  describe('Client Tasks', () => {
    describe('methods', () => {
      it('can delete owned task', () => {
        Meteor.call('getVideoData','Qb8CZ4ktzFA', function (error, res) {
          if (error) console.log('error', error)
          console.log('ok', res);
        })
        //chai.assert.equal(1+1,2);
      });
    });
  });
}
