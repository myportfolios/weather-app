const express = require("express")
const router = express.Router()

router.get("/help", (req, res) => {
res.send("<p>Our help comes from God, the creater of heaven and earth</p>")
})

module.exports = router