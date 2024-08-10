const { Category } = require("../models/Book");

  /** retrieve categories
   * @api GET api/categories
  */
  const getCategory = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ categories });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };

  module.exports = getCategory;
  