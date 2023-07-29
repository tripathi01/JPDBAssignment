/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseUrl = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var dbname = "SCHOOL-DB";
var relname = "STUDENT-TABLE";
var tokn = "90931385|-31949321870167312|90950345";
$("#rollno").focus();
function saverecLS(jsonObj){
    var lvdata = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvdata.rec_no);
}
function getrollnoasJsonObj(){
    var rollno  = $("#rollno").val();
    var jsonStr = {
        rollno: rollno
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj){
    saverecLS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#fullname').val(record.name);
    $('#cls').val(record.standard);
    $('#birthdate').val(record.birthdate);
    $('#address').val(record.address);
    $('#enrolldate').val(record.enrolldate);
}
function resetForm(){
    $('#rollno').val("");
    $('#fullname').val("");
    $('#cls').val("");
    $('#birthdate').val("");
    $('#address').val("");
    $('#enrolldate').val("");
    $('#rollno').prop("disabled",false);
    $('#save').prop("disabled",true);
    $('#change').prop("disabled",true);
    $('#reset').prop("disabled",true);
    $('#rollno').focus();
}

function validateData(){
    var rollno, fullname, cls, birthdate, address, enrolldate;
    rollno = $("#rollno").val();
    fullname = $("#fullname").val();
    cls = $("#cls").val();
    birthdate = $("#birthdate").val();
    address = $("#address").val();
    enrolldate = $("#enrolldate").val();
    if(rollno === ""){
        alert("RollNo is missing");
        $("#rollno").focus();
        return "";
    }
    if(fullname === ""){
        alert("Full Name is missing");
        $("#fullname").focus();
        return "";
    }
    if(cls === ""){
        alert("Class is missing");
        $("#cls").focus();
        return "";
    }
    if(birthdate === ""){
        alert("Date of Birth is missing");
        $("#birthdate").focus();
        return "";
    }
    if(address === ""){
        alert("Address is missing");
        $("#address").focus();
        return "";
    }
    if(enrolldate === ""){
        alert("Enrollment date is missing");
        $("#enrolldate").focus();
        return "";
    }
    var jsonStrObj = {
        rollno: rollno,
        name: fullname,
        standard: cls,
        birthdate: birthdate,
        address: address,
        enrolldate: enrolldate
    };
    return JSON.stringify(jsonStrObj);
}
function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ""){
        return "";
    }
    var putRequest = createPUTRequest(tokn, jsonStrObj, dbname, relname);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
}

function changeData(){
    $("#change").prop("disabled",true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(tokn, jsonChg, dbname, relname, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}

function getroll(){
    var rollnojsonObj = getrollnoasJsonObj();
    var getRequest = createGET_BY_KEYRequest(tokn, dbname, relname, rollnojsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#rollno").focus();
    }
    else if(resJsonObj.status  === 200){
        $("#rollno").prop("disabled", true);
        fillData(resJsonObj);
         $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#rollno").focus();
    }
}



