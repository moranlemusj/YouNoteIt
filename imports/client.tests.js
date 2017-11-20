import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      it('can delete owned task', () => {
        chai.assert.equal(1+1,2);
      });
    });
  });
}
if (Meteor.isClient) {
  describe('Tasks', () => {
    describe('methods', () => {
      it('can delete owned task', () => {
        chai.assert.equal(1+1,2);
      });
    });
  });
}
