var express = require('express');
var router = express.Router();
var winston=require('winston');
var Academics= require('../models/academics');
var Events = require('../models/events');

/*Logger*/
winston.add(
  winston.transports.File,{
    filename: 'schedule.log',
    level: 'info',
    json: 'true',
    eol: 'rn',
    timestamp: true
  }
)
winston.log('info',"Info level")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Add Schedule*/
router.post('/addAcademicSchedule', function(req,res,next){
  var t= new Academics({
    School_Id:req.body.School_Id,
    Class_Id:req.body.Class_Id,
    Subject:req.body.Subject,
    Term:req.body.Term,
    Description:req.body.Description
  })


    t.save(function(err,suc){
      if(err)
      res.send(err)
      else
      return res.status(201).send({"Message":"Created", type:"internal"});
  })

})

/* Get all records*/
router.get('/fetchAcademicSchedule', function(req, res, next) {
  winston.log('info',"Info: Get all records")
  console.log("info");
  Academics.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});

/* Get schedule of a particular school */
router.get('/getAcademicSchedule/:School_Id',function(req,res,next){
  winston.log('info',"Info: Get schedule of a  particular school")
  Academics.find({School_Id: req.params.School_Id},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})


/* Get schedule of a particular class */
router.get('/getClassSchedule/:School_Id/:Class_Id',function(req,res,next){
  winston.log('info',"Info: Get class schedule of a particular school")
  Academics.find({School_Id: req.params.School_Id,Class_Id:req.params.Class_Id},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})
/* Get schedule of a particular subject */
router.get('/getSubjectSchedule/:School_Id/:Class_Id/:Subject',function(req,res,next){
  winston.log('info',"Info: Get subject details of particular class")
  Academics.find({School_Id: req.params.School_Id,Class_Id:req.params.Class_Id,Subject:req.params.Subject},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})

/* Get schedule of a particular term */
router.get('/getTermSchedule/:School_Id/:Term',function(req,res,next){
  winston.log('info',"Info: Get term details of particular class")
  console.log("yterm "+req.params.Term);
  Academics.find({School_Id: req.params.School_Id,Term:req.params.Term},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})

/* Delete  a particular term */
router.get('/deleteTerm/:School_Id/:Class_Id/:Term',function(req,res,next){
  winston.log('info',"Info: Delete particular term")
  Academics.remove({School_Id: req.params.School_Id,Class_Id:req.params.Class_Id,Term:req.params.Term},function(err,data){
    console.log('deleted');
    if(err)
    res.status(404).send(err);
    else
    res.status(200).json(data);
  });
})


/* Update particular term details */
router.put('/updateTerm/:School_Id/:Class_Id/:Term', function(req,res,next){
  winston.log('info',"Info level")
var query={School_Id: req.params.School_Id,
             Class_Id:req.params.Class_Id,Term:req.params.Term};
      Academics.update(query, req.body, function(err,data){
                   if(err) res.status(404).json(err);
                   else {
                     res.status(202).json(data)
                   }

  })
})

/* Update particular term details */
router.put('/updateTerm/:School_Id/:Class_Id/:Term', function(req,res,next){
  winston.log('info',"Info level")
var query={School_Id: req.params.School_Id,
             Class_Id:req.params.Class_Id,Term:req.params.Term};
      Academics.update(query, req.body, function(err,data){
                   if(err) res.status(404).json(err);
                   else {
                     res.status(202).json(data)
                   }

  })
})

/*Add Events*/
router.post('/addEvent', function(req,res,next){
  var t1= new Events({
    School_Id:req.body.School_Id,
    Event_Type:req.body.Event_Type,
    Date:req.body.Date,
    Description:req.body.Description
  })


    t1.save(function(err,suc){
      if(err)
      res.send(err)
      else
      return res.status(201).send({"Message":"Created", type:"internal"});
  })

})

/* Get all records*/
router.get('/fetchEvents', function(req, res, next) {
  winston.log('info',"Info: Get all records")
  console.log("info");
  Events.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })

  /* Get event type*/
  router.get('/getEvent/:School_Id/:Event_Type',function(req,res,next){
    winston.log('info',"Info: Get schedule of a  particular school")
    Events.find({School_Id: req.params.School_Id, Event_Type:req.params.Event_Type},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
    })
  })





  /* Update holidays */

  router.put('/updateHolidays/:School_Id/:Event_Type', function(req,res,next){
    winston.log('info',"Info level")
  var query={School_Id: req.params.School_Id,
               Event_Type:req.params.Event_Type};
        Events.update(query, req.body, function(err,data){
                     if(err) res.status(404).json(err);
                     else {
                       res.status(202).json(data)
                     }

    })
  })



  /* Delete  a  holiday */
  router.get('/deleteHoliday/:School_Id/:Event_Type',function(req,res,next){
    winston.log('info',"Info: Delete particular term")
    Events.remove({School_Id: req.params.School_Id,Event_Type:req.params.Event_Type},function(err,data){
      console.log('deleted');
      if(err)
      res.status(404).send(err);
      else
      res.status(200).json(data);
    });
  })


});
module.exports = router;
