const Driver = require('../models/driver');

function driversIndex(req, res) {
  let params = {};
  console.log("in driver index")
  Driver.find(params, (err, drivers) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(drivers);
  });
}

function driversCreate(req, res) {
  Driver.create(req.body, (err, driver) => {
    if(err) return res.status(400).json(err);
    return res.status(201).json(driver);
  });
}

function driversShow(req, res) {
  Driver.findById(req.params.id, (err, driver) => {
    if(err) return res.status(500).json(err);
    if(!driver) return res.status(404).json({ message: "No driver with this ID" });
    return res.status(200).json(driver);
  });
}

function driversDelete(req, res) {
  Driver.findByIdAndRemove(req.params.id, (err) => {
    if(err) return res.status(500).json(err);
    return res.status(204).send();
  });
}

module.exports = {
  index: driversIndex,
  create: driversCreate,
  show: driversShow,
  delete: driversDelete
};