const express = require('express')
const router = express.Router()


router.get("/weather", (req,res) => {
    res.send(
        {
            location:"Oshawa",
            cloud:"clear",
            humidity:"86%",
            feels_like:"1 degrees",
            presipitation:"0cm"
        }
    )
})

module.exports = router