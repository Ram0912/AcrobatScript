/**
 * Designed and Developed by 
 * 			Ramkumar Parthasarathy
 * 
 * Release version:
 * 		v1.1
 * 
 * Released on:
 * 		10 November, 2017
 * 
 * Developed by: 
 * 		Ramkumar Parthasarathy
 *		ramkumar0316@gmail.com
 *
 */

var validateFields = [{
	fieldname:'first_name',
	validation:'shouldNotEmptyAndMinlenValidationWithAlert("first_name", 2, errorMsgs.msg002, errorMsgs.msg003, false);'
	
},{
	fieldname:'middle_name',
	validation:'shouldEmptyAndMinlenValidationWithAlert("middle_name", 2, errorMsgs.msg003, false);'
	
},{
	fieldname:'last_name',
	validation:'shouldNotEmptyAndMinlenValidationWithAlert("last_name", 2, errorMsgs.msg002, errorMsgs.msg003, false);'
	
},{
	fieldname:'',
	validation:'dateValidation(dobdd, dobmm, dobyyyy, age, pastdatemsg, msg002 );'
	
},{
	fieldName : 'gender',
	validation :'yesOrNo("gender", msg002);'
},];

var errorMsgs = {
		 msg001 : {icon : 3, msg : ""},
		 msg002 : {icon : 0, msg : "You can't leave it blank, as it is mandatory field."},
		 msg003 : {icon : 0, msg : "The value given in the field is too short."},
		 msg004 : {icon : 0, msg : "The Given Date is a past date"},
		 
};

function getDate(){
	var dateList = [" "];
	for(var i =1;i<=31;i++){
		dateList.push([zeroPad(i, 2), i]);
	}
	return dateList;
}

//this.getField("dobdd").setItems(getDate());

function getMonth(){
	var monthList = [" "];
	for(var i =0;i<=12;i++){
		monthList.push(app.doc.app.doc.AFMonthsRegExp[i].source);
	}
	return monthList;
}
//this.getField("dobmm").setItems(getMonth());

function getYear(){
	var currentyear = new Date().getFullYear();
	var yearList = [" "];
	for(var i=currentyear;i>currentyear-60 ;i--){
		yearList.push(i);
	}
	return yearList;
}

function dateValidation(dd, mmmm, yyyy, agefield, pastdatemsg, missingmsg ){
	var isvalid = true;
	var date= this.getField(dd);
	var mnth= this.getField(mmmm);
	var year= this.getField(yyyy);
	var gvnDate = util.scand("dd/mm/yyyy", date.valueAsString/mnth.valueAsString/year.valueAsString);
	var givenDate = util.printd("dd/mm/yyyy",gvnDate);
	var givenDateyyyy = util.printd("yyyy", gvnDate);
	var currentDateyyyy = util.printd("yyyy",new Date());
	var age = this.getField(agefield);
	if(givenDate !=null && givenDate != "" && givenDate !="undefined"){
		if(givenDate > new Date()){
		if(currentDateyyyy-givenDateyyyy==0)
			age.value="Less than a Year";
		else
			age.value=zeroPad(currentDateyyyy-givenDateyyyy, 2);
	}else {
		isvalid = false;
		date.borderColor = color.red;
		mnth.borderColor = color.red;
		year.borderColor = color.red;
		return isvalid;
	}else {
		isvalid = false;
		date.borderColor = color.red;
		mnth.borderColor = color.red;
		year.borderColor = color.red;
		return isvalid;
	}
	isvalid = true;
	date.borderColor = color.black;
	mnth.borderColor = color.black;
	year.borderColor = color.black;
	return isvalid;
}
	return isvalid;	
}

//this.getField("dobyyyy").setItems(getYear());
/**
 * Alert if field - Mandatory | Minimum length Validation
 * @param {String}
 *            fieldName - field should be validate.
 * @param {number}
 *            minLength - field data length should be above minimum value.
 * @param {object}
 *            requiredMsg - data required message to be displayed
 * @param {object}
 *            validationErrorMsg - data validation message to be displayed
 * @param {bool}
 *            isBorderTransparent - the field border to be change.
 * @return {bool} - is valid or not valid
 */
function shouldNotEmptyAndMinlenValidationWithAlert(fieldName, minLength, requiredMsg, validationErrorMsg, isBorderTransparent) {
    var fieldData = this.getField(fieldName);
    var value = trimWS(fieldData.valueAsString);
     if (value == "" || value.length < minLength) {
         if(value == ""){
            alertDialog(requiredMsg);    
         } else {
             alertDialog(validationErrorMsg);
         }
         fieldData.borderColor = color.red;
         setFocus(fieldData);
         return false;
    }else{
        fieldData.borderColor = isBorderTransparent?color.transparent:color.black;
        return true;
    }
}

/**
 * Checks if the Yes | No is selected
 * @param {string} fieldName			   
 * @param {Object} requiredMsg
 * @return {boolean} true | false
 */
function yesOrNoMandatory(fieldName, requiredMsg){
    var dt = this.getField(fieldName);
    var dtValue = trimWS(dt.value);
    if(dtValue != 'Yes' &&  dtValue != 'No'){
        alertDialog(requiredMsg);
        dt.borderColor = color.red;
        setFocus(dt);
        return false;
    }else{
        dt.borderColor = color.black;
    }
    return true;
}

/**
 * To trim the preceeding and trailing white spaces
 * @param {String} str   
 * @return {string} str
 */
function trimWS(str) {
    if(typeof str == "undefined")
        return '';
    else
        return str.toString().replace(/^\s+|\s+$/gm,'');
}

/**
 * To set focus on the specified field
 * @param {string} fieldData						
 */
function setFocus(fieldData){
	if(!save)
     fieldData.setFocus();
}

/**
 * Check if field - Not Mandatory | Minimum length Validation 
 * @param fieldName
 * @param minLength
 * @param invalidMsg
 * @param isBorderTransparent
 * @returns bool
 */
function shouldEmptyAndMinlenValidationWithAlert(fieldName, minLength, invalidMsg, isBorderTransparent) {
    var fieldData = this.getField(fieldName);
    var value = trimWS(fieldData.valueAsString);
    if (value.length > 0 && value.length < minLength) {
         alertDialog(invalidMsg);
         fieldData.borderColor = color.red;
         setFocus(fieldData);
         return false;
     }else{
        fieldData.borderColor = isBorderTransparent?color.transparent:color.black;
    }
    return true;
}

/**
 * Add the prefix 0 in date or month fields 
 * @param n
 * @param s
 * @returns
 */
function zeroPad(n, s) {   
	n = n.toString();   
	while (n.length < s) n = '0' + n;   
	return n;   
}