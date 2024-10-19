const express = require('express');
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');
const {taskReciever , taskExport ,taskDelete , editTask , putTime} = require("../controllers/Tasklist");
const {newSession , getSessions , putSesTime , deleteSessionTime , deleteSession} = require("../controllers/FocusController")
const {postNote , getNotes , getTheNote , updateNote , deleteNote} = require("../controllers/NotesController")

const router = express.Router();

router.post('/register', register); 
router.post('/login', login);

router.post("/sendTask", taskReciever);
router.post("/getTask", taskExport);

router.post("/deleteTask" , taskDelete);
router.put("/editTask" , editTask);

router.put("/putTime" , putTime);


router.post("/newFocus" , newSession );
router.post("/getSessions" , getSessions );
router.post("/putSesTime" , putSesTime );
router.post("/deleteTime" , deleteSessionTime );
router.post("/deleteSes" , deleteSession );

router.post("/postNote" , postNote);
router.post("/getNotes" , getNotes);
router.post("/getTheNote" , getTheNote);
router.put("/updateNote" , updateNote);
router.post("/deleteNote" , deleteNote);



router.get('/home', verifyToken, (req, res) => {
    res.send({ message: 'Welcome to the home page' });
});

module.exports = router;
