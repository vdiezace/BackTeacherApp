const getAllUser = () => {
  return db.query("select * from users");
};

module.exports = { getAllUser };
