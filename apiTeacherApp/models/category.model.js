const getAll = () => {
  return db.query("SELECT * FROM categories");
};

module.exports = {
  getAll,
};
