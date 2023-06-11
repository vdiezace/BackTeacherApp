const getAllCategories = () => {
  return db.query("SELECT * FROM categories");
};

module.exports = {
  getAllCategories,
};
