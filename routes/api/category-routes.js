const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: categoryId } }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deleteCategory = await Category.destroy({
      where: { id: categoryId },
    });
    res.status(200).json(deleteCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
