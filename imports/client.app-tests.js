import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';

if (Meteor.isClient) {
  describe('Client Tasks', () => {
    describe('methods', () => {
      it('can delete owned task', (done) => {
        Meteor.call('getVideoData','Qb8CZ4ktzFA', function (error, res) {
          if (error) console.error('error', error)
          console.log(res);
          try {
            chai.assert.equal(res.title, 'negramaro - Attenta (Videoclip Ufficiale)');
            chai.assert.property(res, 'description');
            chai.assert.property(res, 'publishedAt');

            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });
  });
}
