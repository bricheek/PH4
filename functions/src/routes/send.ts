import authenticateUser from "../middleware/authenticateUser";
import express from 'express';

const router = express.Router();

router.post('/send', (req, res) => {  //What is the data object?
        //verify token with middleware
        //call service method
        //handle routing errors
})

export { router }








