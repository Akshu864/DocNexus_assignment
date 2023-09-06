const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');
const authorModel = require('../models/userModel');

const createBlog = async function (req, res) {
  try {
    const { title, body, authorId, isPublished } = req.body;

    if (!title) {
      return res.status(400).send({ status: false, message: 'Title is required' });
    }

    if (!body) {
      return res.status(400).send({ status: false, message: 'Body is required' });
    }

    if (!authorId) {
      return res.status(400).send({ status: false, message: 'authorId is required' });
    }

    const findAuthor = await userModel.findById(authorId);

    if (!findAuthor) {
      return res.status(400).send({ status: false, message: 'Author does not exist' });
    }

    const blogData = {
      title,
      body,
      authorId,
    
      publishedAt: new Date(), 
    };

    const myBlog = await blogModel.create(blogData);

    return res.status(200).send({ status: true, message: 'Blog created successfully', data: blogData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: 'Server error' });
  }
};



// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
    
      const blogs = await blogModel.find();
  
      if (!blogs || blogs.length === 0) {
        return res.status(404).json({ msg: 'No blogs found' });
      }
  
      return res.status(200).json({ msg: 'Blogs retrieved successfully', data: blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  };

  //update


const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, body } = req.body;

   
    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    if (req.user.userId !== blog.authorId.toString()) {
      return res.status(403).json({ msg: 'Unauthorized to update this blog' });
    }

    blog.title = title || blog.title;
    blog.body = body || blog.body;

  
    await blog.save();

    return res.status(200).json({ msg: 'Blog updated successfully', data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};


//delete blog 

const deleteBlog = async (req, res) => {
    try {
      const { blogId } = req.params;
  
   
      const blog = await blogModel.findById(blogId);
  
      if (!blog) {
        return res.status(404).json({ msg: 'Blog not found' });
      }
  
      if (req.user.userId !== blog.authorId.toString()) {
        return res.status(403).json({ msg: 'Unauthorized to delete this blog' });
      }
  
      const result = await blogModel.deleteOne({ _id: blogId });
  
      if (result.deletedCount === 1) {
        return res.status(200).json({ msg: 'Blog deleted successfully' });
      } else {
        return res.status(500).json({ msg: 'Blog deletion failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  


  


module.exports = { createBlog,getAllBlogs,updateBlog ,deleteBlog};
