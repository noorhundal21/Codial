const Post = require('../models/post');
const User = require('../models/users');

module.exports.home = async function (req, res) {
    // console.log(req.cookies);
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })

        let user = await User.find({})

        return res.render('home', {
            title:'Home',
            posts: posts,
            users: user
        })
    } catch (err) {
        console.log('Error ', err);
        return;
    }
}