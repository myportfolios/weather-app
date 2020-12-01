const express = require("express")
const router = express.Router()

router.get("/about", (req, res) => {
res.send({
    author:"Alexander Agunbiade",
    profession:"Programmer",
    nationality:"Nigerian",
    dual_nationality: true
})
})



module.exports = router