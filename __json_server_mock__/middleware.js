const responseFormat = (code, msg, data) => ({
  code,
  msg,
  data,
});

module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      return res.status(200).json(
        responseFormat(200, "成功", {
          token: "ejsadk;alskdl;211",
        }),
      );
    } else {
      return res.status(400).json(responseFormat(-1, "失败"));
    }
  }
  next();
};
