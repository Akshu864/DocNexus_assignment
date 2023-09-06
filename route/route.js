const express=require('express')
const userController=require('../controller/authController')
const blogController=require('../controller/blogController')
const authorize=require('../middleware/auth')

const router=express()

router.post('/register',userController.authorCreate)

router.get('/getDetails',userController.getUser)

router.put('/update/:userId', userController.updateUser);

router.delete('/delete/:userId',userController.deleteUser)

router.post('/login',userController.loginUser)


//blog routes

router.post('/blog-reg',blogController.createBlog)

router.get('/blog',blogController.getAllBlogs)

router.put('/blogs/:blogId', authorize, blogController.updateBlog);

router.delete('/blogs/:blogId', authorize, blogController.deleteBlog);


module.exports=router