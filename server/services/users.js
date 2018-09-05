import { User } from '../model/users';

function findUser(req, res) {
    return User.findOne({email: req.params.email}, 'email',
      function (err, user) {
        if(err) {
          return errHandler(err);
        }
        if(user == null) {
          return res.json({msg: 'User does not exist in the dBase, please' +
          ' sign up to login as a user'});
        }
        console.log(user.email);
        return res.json(user);
    });
  }

module.exports = {
    findUser: findUser,
}