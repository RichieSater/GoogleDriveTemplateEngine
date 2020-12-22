function autoFillGoogleDocFromForm(e) {

  // Create Variables To Reference Google Doc/Sheet
  var sheetID = '1JO8jIcLJDw73hwKPeWDR4ng2Wl8Dy1Dy5CwA6RRlzOs';
  var templateID = '123CsthfdgOCUNL8vySk0Mn35gUHZz_TlenraJBKeEuc';

  //open the template document by ID
  //you can find the ID in the link of the document
  var templateDoc = DriveApp.getFileById(templateID);
  //create a copy of the template, we don't wanna mess up the template doc
  var newTempFile = templateDoc.makeCopy();
  
  //open the new template document for editing
  var openDoc = DocumentApp.openById(newTempFile.getId());
  var body = openDoc.getBody();
  
  //get the responses triggered by On Form Submit
  var items = e.response.getItemResponses();

  //Form Responses Into Variables


  var date = items[0].getResponse();
  var accomplishments = items[1].getResponse();
  var names = items[2].getResponse();
  var goals = items[3].getResponse();
  var interface = items[4].getResponse();
  var materials = items[5].getResponse();
  var exercise = items[6].getResponse();
  var weight = items[7].getResponse();
  var alcohol = items[8].getResponse();
  var coldcalls = items[9].getResponse();
  var fear = items[10].getResponse();
  var early = items[11].getResponse();
  var affirmations = items[12].getResponse();
  var calls = items[13].getResponse();
  var workout = items[14].getResponse();
  var diet = items[15].getResponse();
  var habits = items[16].getResponse();
  var faced = items[17].getResponse();
  var emotion = items[18].getResponse();
  
  //Calculate Score
  var num_early = parseFloat(early)
  var num_affirmations = parseFloat(affirmations)
  var num_calls = parseFloat(calls)
  var num_workout = parseFloat(workout)
  var num_diet = parseFloat(diet)
  var num_habits = parseFloat(habits)
  var num_faced = parseFloat(faced)
  var score = num_early+num_affirmations+num_calls+num_workout+num_diet+num_habits+num_faced
  console.log(score);
  score = score/7;
  console.log(score);
  score = (score*100).toFixed(2) + '%';
 
  


  //find the text in the template doc and replace it with the Form response
  //Replace Field Variables
  body.replaceText('{{Date}}', date);
  body.replaceText('{{Early}}',early);
  body.replaceText('{{Affirmations}}',affirmations);
  body.replaceText('{{Calls}}',calls);
  body.replaceText('{{Workout}}',workout);
  body.replaceText('{{Diet}}',diet);
  body.replaceText('{{Habits}}',habits);
  body.replaceText('{{Faced}}',faced);
  body.replaceText('{{Score}}',score);
  body.replaceText('{{Emotion}}',emotion)
  body.replaceText('{{Accomplishments}}', accomplishments);
  body.replaceText('{{Names}}', names);
  body.replaceText('{{Goals}}', goals);
  body.replaceText('{{Interface}}', interface);
  //Placeholder to solve time sheet
  body.replaceText('{{Materials}}', materials);
  body.replaceText('{{Weight}}',weight);
  body.replaceText('{{Exercise}}',exercise);
  body.replaceText('{{Alcohol}}',alcohol)
  body.replaceText('{{Cold Calls}}',coldcalls);
  body.replaceText('{{Fear}}',fear);


  
  //Save and Close the open document and set the name
  openDoc.saveAndClose();
  newTempFile.setName(date+' Daily Report')

  //If you don't need the option to send email with PDF,
  //just delete this section of the script, leave the last curly bracket

  // convert the new document to PDF and mail it
  var theBlob = newTempFile.getBlob().getAs('application/pdf');
  var email = 'richiesater@gmail.com'
  var subject = 'Your new document';
  var body = date + ', Report.';
  GmailApp.sendEmail(email, subject, body, {
    htmlBody: body,
    attachments: [{
      fileName: items[0].getResponse() + ".pdf",
      content: theBlob.getBytes(),
      mimeType: "application/pdf"
      }]
   });

}


