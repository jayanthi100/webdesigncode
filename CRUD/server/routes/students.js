const express=require('express');
const router=express.Router();
const studentscontrol=require("../controllers/studentscontrol");

router.get("/",studentscontrol.view);



router.get("/adduser",studentscontrol.adduser);
router.post("/adduser",studentscontrol.save);

router.get("/edituser/:id",studentscontrol.edituser);
router.post("/edituser/:id",studentscontrol.edit);



router.get("/deleteuser/:id",studentscontrol.delete);
router.get("/viewuser/:id",studentscontrol.viewuser);




  module.exports=router;






