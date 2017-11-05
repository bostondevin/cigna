const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ntlm = require('express-ntlm');
const shortId = require('shortid-36');
const s = require('localStorage');
const cors = require('express-cors');
const wildcardSubdomains = require('wildcard-subdomains');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongooseI18n = require('mongoose-i18n-localize');
const generator = require('mongoose-gen');
const findOrCreate = require('mongoose-findorcreate');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;
const COLLECTION = 'things';
const execSettings = {maxBuffer: 1024 * 50000000};



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,X-XSRF-TOKEN,Authorization');
    next();
});


app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.json({type: 'application/vnd.api+json'})); 
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(wildcardSubdomains({whitelist: []}));

express.static.mime.define({
  'application/x-application-woff2': ['woff2']
});





//app.get('/', function(req, res){
//  res.json(req.ntlm);
//});

//app.get(['/_sub/:subdomain/s', '/_sub/:subdomain/s*'], function(req, res) { 
  // res.sendFile(__dirname + '/index.html')
//});




io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(4201, function(){
  console.log('Cigna API listening on port 4201!');
});





// Required constants for app inititialization...
s.setItem('Schema', 'F3JWHQUAMRZ');
s.setItem('Constant', 'F3QQ7QUAB6Z');
s.setItem('ThingType', 'F33QHWGSBRY');
s.setItem('UsersCollection', 'FKDF7QUSBRY');
s.setItem('AttributeCollection', 'PKPF7WGSM6Z');
s.setItem('ProfilePicture', 'F33JFFUAMRZ');
s.setItem('Email', 'P398VUAB6Y');
s.setItem('Password', 'FKJFPUSM6Z');
s.setItem('Format', 'F3VWHQGSB6Y');
s.setItem('Select', 'FKWE6UAM6Z');
s.setItem('Date', 'F35QHWUABRY');
s.setItem('JsonData', 'F3HC4RGSM6Y');
s.setItem('Radio', 'PK64RGABRY');
s.setItem('File', 'P39PHQUSM6Y');
s.setItem('SortIndex', 'P3QP7WGSM6Z');
s.setItem('Label', 'FKHPFGAB6Z');
s.setItem('Collection', 'FK7W7WUABRY');
s.setItem('Column', 'P3RDVGSB6Y');
s.setItem('Number', 'FK4E6USB6Y');
s.setItem('DateTime', 'P3UZAPGSM6Z');

s.setItem('InputFormatCollection_id', '565b25cd8ef2ae111d9e67cb');
s.setItem('Email_id', '565e0a731141d78b05793138');
s.setItem('Password_id', '566de99f3563262e3cb5f40d');
s.setItem('Select_id', '565b25ee8ef2ae111d9e67cd');
s.setItem('Date_id', '565b273e8ef2ae111d9e67cf');
s.setItem('DateTime_id', '565b24a08ef2ae111d9e67c7');
s.setItem('JsonData_id', '57c98682a99355922105e768');
s.setItem('Radio_id', '565b24398ef2ae111d9e67c3');
s.setItem('File_id', '565b24e58ef2ae111d9e67c9');
s.setItem('Number_id', '565b25cd8ef2ae111d9e67cb');

/*
s.setItem('Schema', '5659bff045754252aef356af');
s.setItem('Constant', '56678838120e52e14938130f');
s.setItem('ThingType', '5659c01145754252aef356b1');
s.setItem('UsersCollection', '565d303e9c1888562948f10e');
s.setItem('AttributeCollection', '565b462ddf86c1c5bb15a4ff');
s.setItem('ProfilePicture', '565be4a12144b4d620426d28');
s.setItem('Format', '565b29c58ef2ae111d9e67d4');
s.setItem('SortIndex', '565c81e6d887042f220fc11f');
s.setItem('Label', '565b22c48ef2ae111d9e67bd');
s.setItem('Collection', '565b28b98ef2ae111d9e67d2');
s.setItem('Column', '5686b381f96c88d613353054');

s.setItem('LinkedInUserId', '5888ffd54591115fee5ee898');
s.setItem('GoogleUserId', '');
s.setItem('GitHubUserId', '');
s.setItem('InstagramUserId', '');
s.setItem('WindowsLiveUserId', '');
s.setItem('FacebookUserId', '');
s.setItem('YahooUserId', '');
s.setItem('TwitterUserId', '');
s.setItem('FourSquareUserId', '');
s.setItem('TwitchUserId', '');
s.setItem('BitBucketUserId', '');
s.setItem('SpotifyUserId', '');
s.setItem('FirstName', '565beced47bef56021ae7e1d');
s.setItem('LastName', '565bed0747bef56021ae7e1e');
s.setItem('Website', '565bed0747bef56021ae7e1e');
*/









let Things;
mongoose.connect('mongodb://localhost:27017/local');

let objectList = [];

function buildSchema(){

  if (mongoose.connection.models.hasOwnProperty(COLLECTION))
    delete mongoose.connection.models[COLLECTION];

  let BaseThingSchema = new Schema({}, {collection: COLLECTION});
  // BaseThingSchema.set('redisCache', isProduction);

  let BaseThings = mongoose.model(COLLECTION, BaseThingSchema);

  let searchObj = {};
  searchObj[s.getItem('Constant')] = {$nin: [null, '']};


  let ts = {
    __v: {type: 'Number', select: false},
    _sid:  {type: 'String', index: true}
  };

  ts[s.getItem('CopyOf')] = {'type': 'ObjectId', 'ref': COLLECTION};
  ts[s.getItem('CreatedBy')] = {'type': 'ObjectId', 'ref': COLLECTION};
  ts[s.getItem('CreatedOn')] = {'type': 'Date'};

  BaseThings.find(searchObj).lean().exec(execSettings, function(err, data){
    
    let str = "";
    objectList = [];

    data.forEach(d => {

      s.setItem(d[s.getItem('Constant')], d._sid); // Populate the constants for use in node
      s.setItem(d[s.getItem('Constant')] + '_id', d._id); // Populate the constants for use in node


      if (d.hasOwnProperty(s.getItem('Format'))){

        if (d.hasOwnProperty(s.getItem('Collection'))){

          if (d[s.getItem('Format')] == s.getItem('Select_id') || d[s.getItem('Format')] == s.getItem('Radio_id') || d[s.getItem('Format')] == s.getItem('File_id')){
            ts[d._sid] = {'type': 'ObjectId', 'ref': COLLECTION};
          }else{
            ts[d._sid] = [{'type': 'ObjectId', 'ref': COLLECTION}];
          }
          objectList.push(d._sid);

        } else {

          if (d[s.getItem('Format')] == s.getItem('String_id') || d[s.getItem('Format')] == s.getItem('TextArea_id') || d[s.getItem('Format')] == s.getItem('RichText_id') && d[s.getItem('Format')] == s.getItem('Email_id') || d[s.getItem('Format')] == s.getItem('Password_id') || d[s.getItem('Format')] == s.getItem('SignatureComponent_id')){
            ts[d._sid] = {'type': 'String'};

            if (d[s.getItem('TranslatableText')])
              ts[d._sid].i18n = true;
          }

          if (d[s.getItem('Format')] == s.getItem('JsonData_id'))
            ts[d._sid] = {'type': 'ObjectId'};

          if (d[s.getItem('Format')] == s.getItem('Number_id'))
            ts[d._sid] = {'type': 'Number'};

          if (d[s.getItem('Format')] == s.getItem('Date_id') || d[s.getItem('Format')] == s.getItem('DateTime_id'))
            ts[d._sid] = {'type': 'Date'};

          if (d[s.getItem('Format')] == s.getItem('Select_id') || d[s.getItem('Format')] == s.getItem('Radio_id') || d[s.getItem('Format')] == s.getItem('File_id')){
            ts[d._sid] = {'type': 'ObjectId', 'ref': COLLECTION};
            objectList.push(d._sid);
          }

        }

      }

    });

    delete mongoose.connection.models[COLLECTION];
    let ThingSchema = new Schema(generator.convert(ts), {collection: COLLECTION, strict: false});
    // ThingSchema.set('redisCache', isProduction);

    ThingSchema.plugin(deepPopulate);
    ThingSchema.plugin(findOrCreate);
    ThingSchema.plugin(mongooseI18n, {
      locales: ['en', 'fr', 'es']
    });

    Things = mongoose.model(COLLECTION, ThingSchema);

  });
}

buildSchema();







function generateShortId(){
  return shortId.generate();
}

function getData(req, res, searchBy, dp, populate, select, isList, locale){

  let perPage = 5000;
  let page = Math.max(0, req.query.page);
  let searchObj = {};
  let populateObj = null;
  let selectObj = {};

  if (populate){
    populateObj = {populate: {}};
    let popPatterns = populate.split(',');

    popPatterns.forEach(d => {
      let popParts = d.split(':');
      populateObj.populate[popParts[0]] = {select: popParts[1]};
    });

  }

  let condition3 = {};
  condition3[searchBy] = req.params.id;

  let c1 = {},
    c2 = {},
    c3 = {};

  c1[s.getItem('LoginRequired')] = req.query.hasOwnProperty('userId');
  c2[s.getItem('LoginRequired')] = false;
  c3[s.getItem('LoginRequired')] = null;

  let condition5 = {$or: [c1, c2, c3]};

  let id = req.params.id.toString().trim();
  let subdomain = req.params.subdomain.toString().trim();

  // ToDo - make this list dynamic
  if (isList && (
    id === s.getItem('BugCollection_id') || 
    id === s.getItem('InventoryCollection_id') || 
    id === s.getItem('CalendarEventsCollection_id') || 
    id === s.getItem('OrdersCollection_id') || 
    id === s.getItem('FileCollection_id') || 
    id === s.getItem('SkusCollection_id') || 
    id === s.getItem('TimelineEventsCollection_id') || 
    id === s.getItem('UserGroupCollection_id') || 
    id === s.getItem('PieSampleCollection_id') || 
    id === s.getItem('FaqCollection_id') || 
    id === s.getItem('EmailNotificationCollection_id') || 
    id === s.getItem('CaroselItemsCollection_id') || 
    id === s.getItem('TemplatesCollection_id') || 
    id === s.getItem('BugCollection') || 
    id === s.getItem('InventoryCollection') || 
    id === s.getItem('CalendarEventsCollection') || 
    id === s.getItem('OrdersCollection') || 
    id === s.getItem('FileCollection') || 
    id === s.getItem('SkusCollection') || 
    id === s.getItem('TimelineEventsCollection') || 
    id === s.getItem('UserGroupCollection') || 
    id === s.getItem('PieSampleCollection') || 
    id === s.getItem('FaqCollection') || 
    id === s.getItem('EmailNotificationCollection') || 
    id === s.getItem('CaroselItemsCollection') || 
    id === s.getItem('TemplatesCollection') )){


    let condition2 = {};
    condition2[s.getItem('ApplicationsProperty')] = {$in: [req.query.appId]};

    let arr = [];
    arr.push(condition2);
    arr.push(condition3);
    searchObj = {$and: arr};

 

  } else if (isList && (id === s.getItem('ClientsCollection_id') || id === s.getItem('ClientsCollection'))){

    let arr = [];
    if (subdomain === 'www'){
      arr.push(condition3);
    } else {
      arr.push({_sid: {$eq: 'blank'}});
    }
  
    searchObj = {$and: arr};

  } else if (isList && (id === s.getItem('ApplicationsCollection_id') || id === s.getItem('ApplicationsCollection') || id == s.getItem('UsersCollection_id') || id == s.getItem('UsersCollection'))){

    let arr = [];
    let condition2 = {};
    condition2[s.getItem('ClientProperty')] = {$eq: req.query.clientId};

    //if (subdomain !== 'www')
      //arr.push(condition2);

    arr.push(condition3);
    searchObj = {$and: arr};




  } else if (id === s.getItem('Thing_id') || id === s.getItem('AttributeCollection_id') || id === s.getItem('Thing') || id === s.getItem('AttributeCollection')){




    let arr2 = [];

    let condition7 = {};
    condition7[s.getItem('CommonProperty')] = {$eq: true};
    arr2.push(condition7);

    let condition8 = {};
    condition8[s.getItem('ApplicationsProperty')] = {$in: [req.query.appId]};
    arr2.push(condition8);

    let condition9 = {};
    condition9[s.getItem('ApplicationsProperty')] = null;
    arr2.push(condition9);

    let condition10 = {};
    condition10[s.getItem('ApplicationsProperty')] = {$eq: []};
    arr2.push(condition10);

    let condition2 = {$or: arr2};

    let arr = [];
    arr.push(condition2);
    arr.push(condition3);
    searchObj = {$and: arr};



  } else {



      if (id !== 'all'){

        let arr = [];
        arr.push(condition3);
        searchObj = {$and: arr};

      }



  }


  //if (id === s.getItem('ApplicationsCollection_id'))
    //searchObj[s.getItem('ClientProperty')] = '58df8913b5e51d9754ab4267'; //req.query.clientId;

/*
  if (req.query.hasOwnProperty('appId'))
    searchObj[s.getItem('AppId')] = req.query.appId;

  if (req.query.hasOwnProperty('userId'))
    searchObj[s.getItem('CreatedBy')] = req.query.userId;
*/


  let sortObject = {};
  sortObject[s.getItem('SortIndex')] = 1,
  sortObject[s.getItem('Label')] = 1;

  if (select){
    let selectPatterns = select.split(' ');
    selectPatterns.forEach(d => {
      selectObj[d] = 1;
    });      
  }  

  Things.find(searchObj)
    .deepPopulate(dp, populateObj)
    .select(selectObj)
    .limit(perPage)
    .skip(perPage * page)
    .sort(sortObject)
    .exec(execSettings, function(err, data){
      if (err){
        res.json(err);
      }else{
        var localizedResources = Things.schema.methods.toObjectLocalizedOnly(data, locale, 'en');
        res.json(err ? err : localizedResources);
      }
    });

}






function buildDeepPopulate(schema, callback){
  let o = [];

  async.each(schema[s.getItem('Schema')], function(attribute, cb1){
    if (attribute.hasOwnProperty(s.getItem('Collection'))){
      let parent = attribute._sid;

      if (o.indexOf(parent) == -1)
        o.push(parent);

      Things.findById(attribute[s.getItem('Collection')]).populate(s.getItem('Schema')).lean().execAsync(execSettings).then(function(s2){

        let schema2 = s2;

        async.each(schema2[s.getItem('Schema')], function(a, cb2){

          if (a.hasOwnProperty(s.getItem('Collection'))){
            //buildDeepPopulate(s, function(results){

              if (o.indexOf(parent + '.' + a._sid) === -1)
                o.push(parent + '.' + a._sid);

              cb2(null);
            //});

          } else {
            cb2(null);
          }

        }, function(err){
          cb1(null);
        });
        
      });

    } else {
      cb1(null);
    }
  }, function(err){
    callback(o);
  });
}










app.use('/api', express.static(__dirname + '/api'));



app.get('/_sub/:subdomain/api/constants', function(req, res){


  let searchObj = {};
  searchObj[s.getItem('Constant')] = {$nin: [null, '']};

  Things.find(searchObj).lean().exec(execSettings).then(function(data){
    let o = {};

    data.forEach(d => {
      o[d[s.getItem('Constant')]] = {id: d._id, sid: d._sid};
    });   

    res.json([o]);
  });

});







// Read all...
app.get('/_sub/:subdomain/api/list/:id', function(req, res){

  let searchObj = {};
  searchObj[s.getItem('ThingType')] = s.getItem('ApplicationsCollection_id');
  searchObj[s.getItem('AppId')] = {$regex: new RegExp(req.params.subdomain, 'i')};

  
  Things.findOne(searchObj).select('_id ' + s.getItem('ClientProperty')).lean().exec(execSettings).then(function(respApp){


    if (respApp){


      req.query.appId = respApp._id;
      req.query.clientId = respApp[s.getItem('ClientProperty')];
      delete req.query.userId;

      let searchBy = {};
      searchBy[req.params.id.toString().length > 16 ? '_id' : '_sid'] = req.params.id;

      Things.findOne(searchBy).lean().exec(execSettings).then(function(respType){

        if (respType){
          req.params.id = respType._id;
          getData(req, res, s.getItem('ThingType'), ((req.query.deepPopulate) ? req.query.deepPopulate : objectList.join(' ')), (req.query.populate ? req.query.populate : null), (req.query.select ? req.query.select : null), true, (req.query.locale ? req.query.locale : null));
        } else {
          res.json({success: false, message: 'Sorry, no matching list exists'});
        }
      });

      
    } else {

      res.json({success: false, message: 'Sorry, no matching application exists'});
    }

  });


});





