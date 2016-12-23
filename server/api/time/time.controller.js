exports.time = function (req, res) {
  res.status(200).json({time: Date()});
}
