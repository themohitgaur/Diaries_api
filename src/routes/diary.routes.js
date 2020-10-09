const express = require('express');
const checkToken =require('../middleware/checktoken');

const diaryController = require('../controllers/diary.controller');


const router = express.Router();

router.use(checkToken);


router.post('/create',diaryController.createD);
router.post('/allEntry',diaryController.getAllEntry);

module.exports= router;