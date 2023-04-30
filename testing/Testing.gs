//Comment this code or remove this file while you are actually showing the functionality, because there is doget function in this file too , and after commenting redeploy
//Deploy, then you will get the deployment id url, paste it in chrome, see the test results
var QUnit = QUnitGS2.QUnit;

function doGet() {
   QUnitGS2.init(); // Initializes the library.

   tests();

   QUnit.start();
   
  //var results = getResultsFromServer();
  //Logger.log(JSON.stringify(results, null, 2));
   
   return QUnitGS2.getHtml();
}


function test_UUid_(){
  const pattern= /^[a-z0-9]{8}[-][a-z0-9]{4}[-][a-z0-9]{4}[-][a-z0-9]{4}[-][a-z0-9]{12}$/;
  var i=1;
  var uuid;
  var values = [];
  var is_valid_format=true;
  while(i<101){
    uuid = uuid_();
    values.push(uuid);
    if(!pattern.test(uuid))
    {
       is_valid_format=false;
       break;
    }
    i++;
  }
  if(is_valid_format==false)
  {
    QUnit.test("Valid format test FAILED for uuid"+i, function(assert){
    assert.ok(is_valid_format, 'Failed for'+values[i-1]);
  });
  }
  else
  {
     QUnit.test("Valid format test SUCCESSFUL", function(assert){
    assert.ok(is_valid_format, 'Values are in valid format. Successful!!');
  });
  }
  i=0;
  var j=0;
  var is_unique = true;
  var brk=0;
  while(i<100)
  {
    j=i+1;
    while(j<100)
    {
      if(values[i]==values[j])
      {
        is_unique=false;
        brk=1;
        break;
      }
      j++;
    }
    if(brk==1)
    {
      break;
    }
    i++;
  }
  QUnit.test("Uniqueness test", function(assert){
    assert.ok(is_unique, 'Values are unique. Success!!');
  });
}

function testSendEmail() {
  var _from_email = 'cs20btech11053@iith.ac.in';
  var _to_email = 'cs20btech11053@iith.ac.in';
  var req_cont = 'Unit Testing';
  var attach = '';
  var uuid = uuid_();
  var state1 = APPROVED_STATE;
  var state2 = DENIED_STATE;
  var state3 = undefined;
  var last = 2;//not completely aware of this variable

  //State1
  SendEmail_(_from_email,_to_email, req_cont, attach, uuid, last, state1);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('EMAILTESTING');
  var range = sheet.getDataRange();
  var values = range.getValues();
  var emailSent = false;
  if (values == uuid) {
     emailSent = true;
   }

  QUnit.test("Approved case: send email function behaviour", function(assert){
    assert.ok(emailSent, 'Email was sent successfully!');
  });
  //State2
  uuid=uuid_();

  SendEmail_(_from_email,_to_email, req_cont, attach, uuid, last, state2);
  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('EMAILTESTING');
  range = sheet.getDataRange();
  values = range.getValues();
  emailSent = false;
  if (values == uuid) {
     emailSent = true;
   }

  QUnit.test("Denied case: send email function behaviour", function(assert){
    assert.ok(emailSent, 'Email was sent successfully!');
  });
  //State3
  uuid=uuid_();

  SendEmail_(_from_email,_to_email, req_cont, attach, uuid, last, state3);
  sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('EMAILTESTING');
  range = sheet.getDataRange();
  values = range.getValues();
  emailSent = false;
  if (values == uuid) {
     emailSent = true;
   }

  QUnit.test("Undefined case: send email function behaviour", function(assert){
    assert.ok(emailSent, 'Email was sent successfully!');
  });
  
  
}
function test_trigger() {
 var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Requests');
 var lastrow = sh.getLastRow()+1;
 var formEvent = {
    values :['time','cs20btech11053@iith.ac.in','cs20btech11005@iith.ac.in', 'test','']
  };
  var range = sh.getRange(lastrow,1,1,5);
  range.setValues([formEvent.values]);
  TriggerGoogleForm(formEvent);
  var approved_state_value = sh.getRange(lastrow,7,1,1).getValue();
  var rejected_state_value = sh.getRange(lastrow,8,1,1).getValue();
  var event_trigger = false;
  if(approved_state_value =='NA' && rejected_state_value=='NA')
  {
    event_trigger=true;
  }
   QUnit.test("Trigger testing: check initialisation", function(assert){
    assert.ok(event_trigger, 'Trigger was successfully called!');
  });
}


function test_approval()
{
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Requests');
  var lastrow = sh.getLastRow()+1;
  var range = sh.getRange(lastrow,1,1,8);
  var uuid = uuid_();
  var values =['time','cs20btech11053@iith.ac.in','cs20btech11005@iith.ac.in', 'test','',uuid,'NA','NA'];
  range.setValues([values]);
  var temp = {
    i : uuid,
    last : lastrow,
    state : APPROVED_STATE,
    comment : 'comment'
  };
  request ={
    parameters : temp
  };
  doGet1(request);
  var approved_state_value = sh.getRange(lastrow,7,1,1).getValue();
  var approved_check = false;
  if(approved_state_value!='NA')
  {
    approved_check=true;
  }
  QUnit.test("Approval testing : checking state", function(assert){
    assert.ok(approved_check, 'Approval was successfully done!');
  });
}

function test_denial()
{
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Requests');
  var lastrow = sh.getLastRow()+1;
  var range = sh.getRange(lastrow,1,1,8);
  var uuid = uuid_();
  var values =['time','cs20btech11005@iith.ac.in','cs20btech11005@iith.ac.in', 'test','',uuid,'NA','NA'];
  range.setValues([values]);
  var temp = {
    i : uuid,
    last : lastrow,
    state : DENIED_STATE,
    comment : 'comment'
  };
  request ={
    parameters : temp
  };
  doGet1(request);
  var denied_state_value = sh.getRange(lastrow,8,1,1).getValue();
  var denied_check = false;
  
  if(denied_state_value!='NA')
  {
    denied_check=true;
  }
  QUnit.test("Denial testing : checking state", function(assert){
    assert.ok(denied_check, 'Denial was successfully done!');
  });
}

function tests(){
  console = Logger;
  test_UUid_();
  testSendEmail();
  test_trigger();
  test_approval();
  test_denial();
}

function getResultsFromServer() {
   return QUnitGS2.getResultsFromServer();
}

