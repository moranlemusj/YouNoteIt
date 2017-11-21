import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';

if (Meteor.isClient) {
  describe('Server Tasks', () => {
    describe('methods', () => {
      it('check title, description, publishing date', (done) => {
        Meteor.call('getVideoData','Qb8CZ4ktzFA', function (error, res) {
          //JSON.parse(result.content).items[0].snippet
          if (error) console.error('error', error)
          res = JSON.parse(res.content).items[0].snippet;
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

      // it('can delete owned task', (done) => {
      //   Meteor.call('getVideoData','Qb8CZ4ktzFA', function (error, res) {
      //     if (error) console.error('error', error)
      //     try {
      //       chai.assert.equal(res.title, 'negramaro - Attenta (Videoclip Ufficiale)');
      //       chai.assert.property(res, 'description');
      //       chai.assert.property(res, 'publishedAt');
      //       done();
      //     } catch (e) {
      //       done(e);
      //     }
      //   });
      // });


    });

  });
}
