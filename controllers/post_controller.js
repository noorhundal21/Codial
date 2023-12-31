const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

      

        req.flash('success' , 'Post created');
        return res.redirect('back');

    } catch (err) {
        console.log('Error ', err);
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post && post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id })
            req.flash('success' , 'Post Deleted Successfully!')
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error: ', err);
    }
}

