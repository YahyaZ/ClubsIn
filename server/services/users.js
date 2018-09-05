import { User } from '../model/users';

function findUser(req, res) {
    console.log(req.session.userId)
    let id = req.session.userId;
    return User.findOne({_id: id},
      function (err, user) {
        if(err) {
          return res.status(404).json({msg: 'User does not exist in the dBase, please' +
          ' sign up to login as a user'})
        }
        if(user == null) {
          return res.json({msg: 'User does not exist in the dBase, please' +
          ' sign up to login as a user'});
        }
        console.log(user);
        return res.json(user);
    });
  }

module.exports = {
    findUser: findUser,
}