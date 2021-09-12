const express = require("express");

const router = express.Router();

data = [
    {user1: "test"},
    {user2: "bob"},
    {user3: "jim"}
]


router.get('', (req, res, next) => {
    res.status(200).json({
        message: "Data fetched successfully!",
        data: data
      });
});

router.post('',  (req, res, next) => {
    console.log(req.body);
    data.push(req.body);
    res.status(200).json({
        message: "Data posted successfully!",
      });
});

module.exports = router;