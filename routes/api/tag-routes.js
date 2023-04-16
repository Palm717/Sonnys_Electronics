const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(createTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // create a new tag
});

router.put("/:id", async (req, res) => {
  try {
    const tagId = req.params.id;
    const updateTagId = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: tagId } }
    );
    res.status(200).json(updateTagId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const tagId = req.params.id;
    const deleteTag = await Tag.destroy({ where: { id: tagId } });
    res.status(200).json(deleteTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // delete on tag by its `id` value
});

module.exports = router;
