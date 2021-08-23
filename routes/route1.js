const express =require('express');

const router = express.Router();

//GET posts/
router.get('/',(req, res) => {
    try {
        res.status(200).json({
            "success": true
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});


module.exports=router;