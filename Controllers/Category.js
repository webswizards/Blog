const Category = require("../models/Category");
const Post = require("../models/Post");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategorysDetails);
    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find();
    res.status(200).json({
      success: true,
      data: allCategorys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { name } = req.body;

    const selectedCategory = await Category.findOne({
      name: name,
    }).populate('posts').exec();

    res.status(200).json({
      success: true,
      data: selectedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.categoryPageDetailspage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Use query parameters for pagination
    const { name } = req.body;
    const pageNumber = parseInt(page) || 1;
    const perPage = 12; // Number of posts to display per page
    const selectedCategory = await Category.findOne({ name: name });

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    console.log("first");

    const totalPosts = selectedCategory.posts.length;
    const totalPages = Math.ceil(totalPosts / perPage);
    console.log("second");

    const skip = (pageNumber - 1) * perPage;
    const limit = perPage;
    console.log("third");

    const categoryPosts = await Post.find({
      category: selectedCategory._id,
    })
      .skip(skip)
      .limit(limit)
      .populate("category") // Fix the typo here
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({
      success: true,
      data: {
        category: selectedCategory,
        currentPage: pageNumber,
        totalPages: totalPages,
        posts: categoryPosts,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

