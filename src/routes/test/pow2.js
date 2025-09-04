const pow2 = async (req, res, next) => {
  try {
    const { a } = req.query;
    res.json(a * a);
  } catch (error) {
    next(error);
  }
};

module.exports = pow2;
