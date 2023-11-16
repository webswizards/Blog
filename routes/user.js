const express = require("express");
const router = express.Router();
const { signup, login } = require("../Controllers/Auth");
const { auth, isAdmin } = require("../middlewares/auth");
const {contactUsController} = require('../Controllers/Contact');
const {
  createPost,
  showPost,
  showSinglePost,
  editPost,
  deletePost,
  showAllPost,
  showSinglePostById
} = require("../Controllers/Post");

const {
  createCategory,
  showAllCategories,
  categoryPageDetailspage,
  categoryPageDetails,
} = require("../Controllers/Category");


//auth
router.post("/signup", signup);
router.post("/login", login);

//categories
router.post("/createcategory", auth, isAdmin, createCategory);
router.get("/showallcategory", showAllCategories);
router.post("/showsinglecategory", categoryPageDetails);
router.post("/showpaginationcategory", categoryPageDetailspage);
//posts
router.post("/createpost", auth, isAdmin, createPost);
router.put("/editpost", auth, isAdmin, editPost);
router.post("/deletepost", auth, isAdmin, deletePost);
router.get("/showallpost", showPost);
router.get("/showallpostall", showAllPost);
router.post("/showsinglepost", showSinglePost);
router.post("/showsinglepostbyid", showSinglePostById);



router.post('/contact',contactUsController);
module.exports = router;
