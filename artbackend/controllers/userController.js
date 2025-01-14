const normalRes = {
  status: 200,
  data: {
    welcome: "Welcome to ",
    company: "ORCAPIXEL",
  },
};
const userController = (req, res) => {
  res.status(200).json(normalRes);
};
module.exports = { userMsg: userController };
