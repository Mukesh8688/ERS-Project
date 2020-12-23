const url = "http://localhost:8080/project-1/";

// For login 

document.getElementById("loginbtn").addEventListener('click',loginFunc);

// creat variable to add form body of request new reimbursment ticket
let requestbody = document.getElementById("table-row");
/* for request new reimbursmen ticket form */
let requestForm = document.createElement("form");

let requestFormData ;

let reibmViewData ;

let userData ;




/* This is the display button for employee users */
function addButtonForEmployee(){
    //clear before add elements

    document.getElementById("btngroup").innerHTML = "";

    let viewbtn1 = document.createElement("button");
    viewbtn1.setAttribute("class","btn btn-success");
    viewbtn1.setAttribute("id","viewAllTicketForEmployee");
    viewbtn1.setAttribute("onclick","viewReimbFuncEmployee()");
    viewbtn1.innerHTML = "View All Reimbursment Tickets";
    document.getElementById("btngroup").appendChild(viewbtn1);

    let viewbtn2 = document.createElement("button");
    viewbtn2.setAttribute("class","btn btn-success");
    viewbtn2.setAttribute("id","createNewTicket");
   // viewbtn2.setAttribute("onclick","createRequestForm2NewVersion()")
     viewbtn2.setAttribute("onclick","createRequestForm2()");

    viewbtn2.innerHTML = "Create New Request";
    document.getElementById("btngroup").appendChild(viewbtn2);


 }




 /* to display Manager level Button when Manage logged in */
 function addButtonForManager(){
    let btngroup =  document.getElementById("btngroup");

    // clear before add elements 
    btngroup.innerHTML = "";


    let viewbtn1 = document.createElement("button");
    viewbtn1.setAttribute("class","btn btn-success");
    viewbtn1.setAttribute("id","viewAllTicketForManager");
    //viewbtn1.setAttribute("onclick","viewReimbFunc()");
    viewbtn1.setAttribute("onclick","viewReimbFuncManager()");
    viewbtn1.innerHTML = "View All Reimbursment Tickets";
    btngroup.appendChild(viewbtn1);
    
  

    let viewbtn3 = document.createElement("input");
    viewbtn3.setAttribute("id","searchId");
    viewbtn3.setAttribute("list","searchByStatus");
    viewbtn3.style.borderStyle  = "solid";
    viewbtn3.style.borderWidth  = "5px";
    viewbtn3.style.borderColor  = "green";


    let datalist = document.createElement("datalist");
    datalist.setAttribute("id","searchByStatus");

    let option1 = document.createElement("option");
    //option1.setAttribute("label","Pending");
    option1.setAttribute("value","Pending");
    option1.setAttribute("id","pending");
    datalist.appendChild(option1);
    let option2 = document.createElement("option");
   // option2.setAttribute("label","Approved");
    option2.setAttribute("value","Approved");
    option2.setAttribute("id","approved");
    datalist.appendChild(option2);
    let option3 = document.createElement("option");
    //option3.setAttribute("label","Denied");
    option3.setAttribute("value","Denied");
    option3.setAttribute("id","denied");
    datalist.appendChild(option3);

    viewbtn3.appendChild(datalist);


    //viewbtn3.innerHTML = "SearchByStatus";

   
    btngroup.appendChild(viewbtn3);

    let viewbtn4 = document.createElement("button");
    viewbtn4.setAttribute("class","btn btn-success");
    viewbtn4.setAttribute("id","btnSearchByStatus");
    viewbtn4.setAttribute("onclick","searchByStatusId()");
    viewbtn4.innerHTML = "Search List By Status";
    btngroup.appendChild(viewbtn4);

    let viewbtn5 = document.createElement("input");
    viewbtn5.setAttribute("type","text");
    viewbtn5.setAttribute("placeholder","Reimbursment Id");
    viewbtn5.setAttribute("id","inputForApproved");
    viewbtn5.style.borderWidth = "3px";
    btngroup.appendChild(viewbtn5);


    let viewbtn6 = document.createElement("button");
    viewbtn6.setAttribute("class","btn btn-success btn-sm");
    viewbtn6.setAttribute("id","btnApprove");
    viewbtn6.setAttribute("onclick","approvefunc()");
    viewbtn6.innerHTML = "Approve";
    btngroup.appendChild(viewbtn6);

    let viewbtn7 = document.createElement("button");
    viewbtn7.setAttribute("class","btn btn-danger btn-sm");
    viewbtn7.setAttribute("id","btnDeny");
    viewbtn7.setAttribute("onclick","denyFunc()");
    viewbtn7.innerHTML = "Deny";
    btngroup.appendChild(viewbtn7);

  

 }

function approveFunc(){

}

function denyFunc(){

}

 function logoutFunc(){

    location.reload();

 }


/* ligin Function */
async function loginFunc(){

    let usern = document.getElementById("username").value;
    let userp =  document.getElementById("password").value;
 
    let user = { 
        username:usern,
        password:userp
    };
     
     console.log(user);
 
     let resp = await fetch(url + 'login', { method:"POST",body:JSON.stringify(user),credentials:"include"});

         //console.log(resp);

    if(resp.status == 200){
       userData = await resp.json();

       //console.log(userData)
       if(userData.userRoleid == 4){
            let welcomediv =  document.getElementById("login-row");
            welcomediv.innerText = "Welcome! " + userData.firstName ;
            welcomediv.setAttribute("color","red");


            /* add logout button */
            let viewbtn3 = document.createElement("button");
            viewbtn3.setAttribute("class","btn btn-danger btn-sm");
            viewbtn3.setAttribute("id","logoutId");
            viewbtn3.setAttribute("onclick","logoutFunc()");
             viewbtn3.style.margin = "0px 20px";
            viewbtn3.innerHTML = "logout!";
            welcomediv.appendChild(viewbtn3);
                
             /* Display buttom for login success */
             addButtonForEmployee()


        }else if (userData.userRoleid == 5){
            let welcomediv =  document.getElementById("login-row");
            welcomediv.innerText = "Welcome! " + userData.firstName ;
            welcomediv.setAttribute("color","red");

             /* add logout button */
             let viewbtn3 = document.createElement("button");
             viewbtn3.setAttribute("class","btn btn-danger btn-sm");
             viewbtn3.setAttribute("id","logoutId");
             viewbtn3.setAttribute("onclick","logoutFunc()");
              viewbtn3.style.margin = "0px 20px";
             viewbtn3.innerHTML = "logout!";
             welcomediv.appendChild(viewbtn3);
                
             /* Display buttom for login success */
             addButtonForManager()
        }
     
    }else{
        document.getElementById("login-row").innerText = "Login Failed !! Please Reload Page !!";
    }
}


/*  Search By status on Manager Page */

function searchByStatusId(){

    let value = document.getElementById("searchId").value;

    //console.log(value);

    let statusId ;
    let statusObj = {};

    if(value == "Pending"){
        statusId = 1;
        statusObj.statusId = statusId;
        
        viewReimbFuncManagerByStatus(statusObj);

    }else if(value == "Approved"){
        statusId =2;

        statusObj.statusId = statusId;
        
        viewReimbFuncManagerByStatus(statusObj);

 
    }else if(value == "Denied"){
        statusId =3;
        statusObj.statusId = statusId;
        
        viewReimbFuncManagerByStatus(statusObj);

    }else {
      
         alert("Sorry ... No Data ...");
    }


   // console.log("You are searchByStatusId function");

   addButtonForManager();

}



/* Search all View list in Reimbursment table By Employee*/

async function viewReimbFuncEmployee(){

    let requestDataView = {authorId:userData.userid};

    console.log(requestDataView);

    //if(userData.userRoleid == 4)
       
    let response = await fetch(url + 'employee',{method:"POST",body:JSON.stringify(requestDataView),credentials:"include"});

    //}     

    if(response.status == 200){
      
        console.log(response);

        let reibmViewData = await response.json();


        let body = document.getElementById("table-row");
        body.innerHTML = "";

    
        let table = document.createElement("table");
        table.setAttribute("class","table table-hover table-bordered");
        table.setAttribute("id","listemb");

        let thead = document.createElement("thead");
        thead.setAttribute("id","reimbhead");

        let tbody = document.createElement("tbody");
        tbody.setAttribute("id","reimbody");



        // add table head
        tableHeadForViewListVersion2(thead);
        

        console.log(reibmViewData)

        for(let reimb of reibmViewData){
             
            //console.log(reimb);


            let row = document.createElement("tr");

            let cell1 = document.createElement("td");
            cell1.innerHTML = reimb.reimbId;
            row.appendChild(cell1);

            let cell2 = document.createElement("td");
            cell2.innerHTML = reimb.reimbType;
            row.appendChild(cell2);

            let cell3 = document.createElement("td");
            cell3.innerHTML = reimb.reimbStatus;
            row.appendChild(cell3);

            let cell4 = document.createElement("td");
            cell4.innerHTML = "$" + reimb.reimbAmount;
            row.appendChild(cell4);

           
            let cell5 = document.createElement("td");
            cell5.innerHTML = new Date(reimb.submittedDate);
            row.appendChild(cell5);

            let cell6 = document.createElement("td");
            cell6.innerHTML = new Date(reimb.resolvedDate);
            row.appendChild(cell6);


            tbody.appendChild(row);
            
            response = null;

        }

        table.appendChild(thead);
        table.appendChild(tbody);

        body.appendChild(table);

        

    }

}


/* Search By Manager Page */

async function viewReimbFuncManager(){

    
       
    let response = await fetch(url + 'manager',{method:"POST",credentials:"include"});

      

    if(response.status == 200){
      
        console.log(response);

        let reibmViewData = await response.json();


        let body = document.getElementById("table-row");
        body.innerHTML = "";

    
        let table = document.createElement("table");
        table.setAttribute("class","table table-hover table-bordered");
        table.setAttribute("id","listemb");

        let thead = document.createElement("thead");
        thead.setAttribute("id","reimbhead");

        let tbody = document.createElement("tbody");
        tbody.setAttribute("id","reimbody");



        // add table head
        tableHeadForViewListVersion2(thead);
        

        console.log(reibmViewData)

        for(let reimb of reibmViewData){
             
            //console.log(reimb);


            let row = document.createElement("tr");
           
            let cell1 = document.createElement("td");
            cell1.setAttribute("id","reimbCell");
           // cell1.setAttribute("onclick","updatefunction()")

            //let hyperlink = document.createElement("a");
            //hyperlink.setAttribute("id","reimbCell")
            //hyperlink.setAttribute("href","#")
           // hyperlink.innerHTML = reimb.reimbId;
            //cell1.appendChild(hyperlink);
            cell1.innerHTML = reimb.reimbId;
            row.appendChild(cell1);
            
            // second cell of row of table
            let cell2 = document.createElement("td");
            cell2.innerHTML = reimb.reimbType;
            row.appendChild(cell2);
            

            //// third cell of row of table
            let cell3 = document.createElement("td");
            let hyperlink1 = document.createElement("a");
            hyperlink1.setAttribute("id","statusCell");
            hyperlink1.setAttribute("href","#");
            hyperlink1.setAttribute("onclick","updatefunction()");
            hyperlink1.innerHTML = reimb.reimbStatus;
            cell3.appendChild(hyperlink1);
            //cell3.innerHTML = reimb.reimbStatus;
            row.appendChild(cell3);
            

            // fourth cell f row of table
            let cell4 = document.createElement("td");
            cell4.innerHTML = "$" + reimb.reimbAmount;
            row.appendChild(cell4);

            

            // fifth cell of row of table
            let cell5 = document.createElement("td");
            cell5.innerHTML = new Date(reimb.submittedDate);
            row.appendChild(cell5);
            
            // six cell of row of table
            let cell6 = document.createElement("td");
            cell6.innerHTML = new Date(reimb.resolvedDate);
            row.appendChild(cell6);


            tbody.appendChild(row);
            
            response = null;

        }

        table.appendChild(thead);
        table.appendChild(tbody);

        body.appendChild(table);

        

    }




}

/* Search By Status of Reimbursment List By Manager  */

async function viewReimbFuncManagerByStatus(statusObj){


       
    let response = await fetch(url + 'searchByStatus',{method:"POST",body:JSON.stringify(statusObj),credentials:"include"});

     

    if(response.status == 200){
      
        console.log(response);

        let reibmViewData = await response.json();


        let body = document.getElementById("table-row");
        body.innerHTML = "";

    
        let table = document.createElement("table");
        table.setAttribute("class","table table-hover table-bordered");
        table.setAttribute("id","listemb");

        let thead = document.createElement("thead");
        thead.setAttribute("id","reimbhead");

        let tbody = document.createElement("tbody");
        tbody.setAttribute("id","reimbody");



        // add table head
        tableHeadForViewListVersion2(thead);
        

        console.log(reibmViewData)

        for(let reimb of reibmViewData){
             
            //console.log(reimb);


            let row = document.createElement("tr");
           
            let cell1 = document.createElement("td");
            cell1.setAttribute("id","reimbCell");
          
            cell1.innerHTML = reimb.reimbId;
            row.appendChild(cell1);
            
            // second cell of row of table
            let cell2 = document.createElement("td");
            cell2.innerHTML = reimb.reimbType;
            row.appendChild(cell2);
            

            //// third cell of row of table
            let cell3 = document.createElement("td");
            let hyperlink1 = document.createElement("a");
            hyperlink1.setAttribute("id","statusCell");
            hyperlink1.setAttribute("href","#");
            hyperlink1.setAttribute("onclick","updatefunction()");
            hyperlink1.innerHTML = reimb.reimbStatus;
            cell3.appendChild(hyperlink1);
            //cell3.innerHTML = reimb.reimbStatus;
            row.appendChild(cell3);
            

            // fourth cell f row of table
            let cell4 = document.createElement("td");
            cell4.innerHTML = "$" + reimb.reimbAmount;
            row.appendChild(cell4);

            

            // fifth cell of row of table
            let cell5 = document.createElement("td");
            cell5.innerHTML = new Date(reimb.submittedDate);
            row.appendChild(cell5);
            
            // six cell of row of table
            let cell6 = document.createElement("td");
            cell6.innerHTML = new Date(reimb.resolvedDate);
            row.appendChild(cell6);


            tbody.appendChild(row);
            
            response = null;

        }

        table.appendChild(thead);
        table.appendChild(tbody);

        body.appendChild(table);

        

    }




}


/* Deny button used to this function*/

async function denyFunc(){


    let reimbId;
    let ticketno = document.getElementById("inputForApproved").value;
    
    console.log(ticketno);

    if(ticketno != ""){
        reimbId = parseInt(ticketno);
    }else{
        alert("Input Reimb Id is missing!!... Please Try again");
        return;
    }
    
    let updateDate = {reimbId:reimbId,roleId:5,statusId:3,date:new Date(),userId:userData.userid};

     console.log(updateDate);

    let response = await fetch(url + 'updatestatus',{method:"POST",body:JSON.stringify(updateDate),credentials:"include"});

    if(response.status == 200){
        alert("Reimbursment Ticket No " + reimbId +" has been denied!!");

        document.getElementById("inputForApproved").value = ""
        viewReimbFuncManager();
    }


}


/* Approve or Deny function via button */

async function approvefunc(){


     let reimbId;

    let ticketno = document.getElementById("inputForApproved").value;
 
    console.log(ticketno);

    if(ticketno != ""){
        reimbId = parseInt(ticketno);
    }else{
        alert("Input Reimb Id is missing!!... Please Try again");
        return;
    }
       
         /** status id is determined in database 
          * 1-> Pending
          * 2-> Approved
          * 3-> Denied
          */
    let updateDate = {reimbId:reimbId,roleId:5,statusId:2,date:new Date(),userId:userData.userid};
 
          //console.log(updateDate);
 
    let response = await fetch(url + 'updatestatus',{method:"POST",body:JSON.stringify(updateDate),credentials:"include"});
 
    if(response.status == 200){
             alert("Reimbursment Ticket No " + reimbId +" has been approved !!");
             document.getElementById("inputForApproved").value = ""
             viewReimbFuncManager();
    }
     
     
 }




/* Update Status of Reimbursement Request by Approved or Denied or Pending */
/* Approve or Deny function via Window input */

async function updatefunction(){


   let reimbId;

    let flag = prompt(" Would you like to approve ticket ? Please type Approved or Denied ");

    //let ticketno = prompt("Please enter Reimbursment Id :");

    // if(ticketno.length == 4){
    //     reimbId = parseInt(ticketno);
    // }else {
    //     alert("Reimbursment Id looks like Not Match !!...  Please try again...");
    //     return;
    // }

    if(flag == "Approved"){
        //console.log("You are approved inside");

        let ticketno = prompt("Please enter Reimbursment Id :");

        if(ticketno.length == 4){
            reimbId = parseInt(ticketno);
        }else {
            alert("Reimbursment Id looks like Not Match !!...  Please try again...");
            return;
        }
        /** status id is determined in database 
         * 1-> Pending
         * 2-> Approved
         * 3-> Denied
         */
        let updateDate = {reimbId:reimbId,roleId:5,statusId:2,date:new Date(),userId:userData.userid};

         //console.log(updateDate);

        let response = await fetch(url + 'updatestatus',{method:"POST",body:JSON.stringify(updateDate),credentials:"include"});

        if(response.status == 200){
            alert("Reimbursment Ticket No " + reimbId +" has been updated successfully !!");
            viewReimbFuncManager();
        }
    
    } else if(flag == "Denied"){

        //console.log("You are denied  inside");
        
        let ticketno = prompt("Please enter Reimbursment Id :");

        if(ticketno.length == 4){
            reimbId = parseInt(ticketno);
        }else {
            alert("Reimbursment Id looks like Not Match !!...  Please try again...");
            return;
        }
        
        let updateDate = {reimbId:reimbId,roleId:5,statusId:3,date:new Date(),userId:userData.userid};

         console.log(updateDate);

        let response = await fetch(url + 'updatestatus',{method:"POST",body:JSON.stringify(updateDate),credentials:"include"});

        if(response.status == 200){
            alert("Reimbursment Ticket No " + reimbId +" has been updated successfully !!");
            viewReimbFuncManager();
           }

    }else{
            alert("Update is failed !!... Please try aganin");
            return;
            //console.log(cellvalue)
    }
    
 
}


function tableHeadForViewList(){
       let headrow = document.createElement("tr");

       headrow.style.backgroundColor = "lightblue";

       let headercell1 = document.createElement("th")
        headercell1.innerHTML = "Rimbursment ID";
        headrow.appendChild(headercell1);

        let headercell2 = document.createElement("th")
        headercell2.innerHTML = "Type";
        headrow.appendChild(headercell2);

        let headercell3 = document.createElement("th")
        headercell3.innerHTML = "Status";
        headrow.appendChild(headercell3);

        let headercell4 = document.createElement("th")
        headercell4.innerHTML = "Amount";
        headrow.appendChild(headercell4);

        let headercell5 = document.createElement("th")
        headercell5.innerHTML = "Submitted Date";
        headrow.appendChild(headercell5);

        let headercell6 = document.createElement("th")
        headercell6.innerHTML = "Resolved Date";
        headrow.appendChild(headercell6);

        document.getElementById("reimbhead").appendChild(headrow);


}




function tableHeadForViewListVersion2(tableHead){
    let headrow = document.createElement("tr");

    headrow.style.backgroundColor = "lightblue";

    let headercell1 = document.createElement("th")
     headercell1.innerHTML = "Rimbursment ID";
     headrow.appendChild(headercell1);

     let headercell2 = document.createElement("th")
     headercell2.innerHTML = "Type";
     headrow.appendChild(headercell2);

     let headercell3 = document.createElement("th")
     headercell3.innerHTML = "Status";
     headrow.appendChild(headercell3);

     let headercell4 = document.createElement("th")
     headercell4.innerHTML = "Amount";
     headrow.appendChild(headercell4);

     let headercell5 = document.createElement("th")
     headercell5.innerHTML = "Submitted Date";
     headrow.appendChild(headercell5);

     let headercell6 = document.createElement("th")
     headercell6.innerHTML = "Resolved Date";
     headrow.appendChild(headercell6);

     tableHead.appendChild(headrow);


}


/** Dayamin create header for table  */
function tableHeadForCreateRequest(){

    document.getElementById("reimbhead").innerHTML="";

    let headrow = document.createElement("tr");

    let headercell1 = document.createElement("th")
    headrow.style.backgroundColor = "lightblue";
     headercell1.innerHTML = "New Reimbersment Ticket Request";
     headrow.appendChild(headercell1);

     document.getElementById("reimbhead").appendChild(headrow);

}





async function createRequestForm2(){

  

    requestbody.innerHTML = "";
    requestForm.innerHTML = "";


    let resp = await fetch(url + 'getMaxTicketNo', { method:"POST",credentials:"include"});

    console.log(resp);

   if(resp.status == 200){
        ticketNoData = await resp.json();
   }

   let newRequestTicketNo = ticketNoData.reimbId + 1;
   //console.log(newRequestTicketNo);
   let createdDate = new Date().toISOString().slice(0,10);
   let submittedDate = new Date().toISOString().slice(0,10);
   let resolvedDate = null;
   let statusid = 1;
   

    requestForm.style.backgroundColor="white";
    requestForm.setAttribute("id","requestForm");
    requestForm.style.padding = "10px 100px";
    requestForm.setAttribute("class","col-sm-12")

    let divhead = document.createElement("div");
    divhead.innerHTML = "New Reimbursment  Request Form";
    divhead.style.backgroundColor= "lightblue";
    divhead.style.textAlign = "center";
    divhead.style.height = "30px";
    //divhead.setAttribute("class","col-sm-12");
    requestForm.appendChild(divhead);

    // First Row
    
    let div1 = document.createElement("div");
   // div1.setAttribute("class","col-sm-4");
    

    let label1 = document.createElement("label");
    label1.innerHTML = "Reimbursment Ticket No:";
    div1.appendChild(label1)
    
    let label2 = document.createElement("label");
    label2.setAttribute("id","reimbTicketNo");
    label2.innerHTML = newRequestTicketNo;
    div1.appendChild(label2);
   

    let space = document.createElement("label");
    space.setAttribute("backgroundcolor","white");
    space.style.color = "white";
    space.innerHTML = "spacespace";
    div1.appendChild(space)

    
    let label3 = document.createElement("label");
    label3.innerHTML = "Created Date :";
    div1.appendChild(label3);

    let label4 = document.createElement("label");
    label4.setAttribute("id","createdDate")
    label4.innerHTML = createdDate;
    div1.appendChild(label4);

    requestForm.appendChild(div1);
    
    // second div for second row

    let div2 = document.createElement("div");

    let label5 = document.createElement("label");
    label5.innerHTML = "Type :";
    div2.appendChild(label5)

    // let label6 = document.createElement("label");
    // label6.setAttribute("id","typeId");
    // label6.innerHTML =  "Type";
    // div2.appendChild(label6);

    /* added option of type */

    let inputType = document.createElement("input");
    inputType.setAttribute("id","inputReimbTypeId");
    inputType.setAttribute("list","type");

    //let datalistFotType = document.createElement("");

    let datalist = document.createElement("datalist");
    datalist.setAttribute("id","type");

    let option1 = document.createElement("option");
    option1.setAttribute("value","LODGING");
    option1.setAttribute("id","lodgingId");
    datalist.appendChild(option1);

    let option2 = document.createElement("option");
    option2.setAttribute("value","TRAVEL");
    option2.setAttribute("id","travelId");
    datalist.appendChild(option2);

    let option3 = document.createElement("option");
    option3.setAttribute("value","FOOD");
    option3.setAttribute("id","foodId");
    datalist.appendChild(option3);

    let option4 = document.createElement("option");
    option4.setAttribute("value","OTHER");
    option4.setAttribute("id","otherId");
    datalist.appendChild(option4);

    inputType.appendChild(datalist);

    div2.appendChild(inputType);


    let space1 = document.createElement("label");
    space1.setAttribute("backgroundcolor","white");
    space1.style.color = "white";
    space1.innerHTML = "spacespace";
    div2.appendChild(space1)

    let label7 = document.createElement("label");
    label7.innerHTML = "Submitted Date :";
    div2.appendChild(label7);

    let label8 = document.createElement("label");
    label8.setAttribute("id","submittedDate");
    label8.innerHTML = new Date().toISOString().slice(0,10);
    div2.appendChild(label8);

    requestForm.appendChild(div2);

    // Third row 

      // second div for second row

      let div3 = document.createElement("div");

      let label9 = document.createElement("label");
      label9.innerHTML = "Status :";
      div3.appendChild(label9)
  
      let label10 = document.createElement("label");
      label10.setAttribute("id","statusId");
      label10.innerHTML = "Pending";
      div3.appendChild(label10);


      let space3 = document.createElement("label");
      space3.setAttribute("backgroundcolor","white");
      space3.style.color = "white";
      space3.innerHTML = "spacespacespacespacess";
      div3.appendChild(space3)
  
      let label11 = document.createElement("label");
      label11.innerHTML = "Resolved Date :";
      div3.appendChild(label11);
  
      let label12 = document.createElement("label");
      label12.setAttribute("id","resolvedDate");
      label12.innerHTML = "1900-01-01";
      div3.appendChild(label12);
  
      requestForm.appendChild(div3);

      // Four Row

      let div4 = document.createElement("div");

      let label13 = document.createElement("label");
      label13.innerHTML = "Total Amount :";
      div4.appendChild(label13);
  
      let inputAmount = document.createElement("input");
      inputAmount.setAttribute("type","text");
      inputAmount.setAttribute("id","inputAmount");
      div4.appendChild(inputAmount);

      requestForm.appendChild(div4);

      // fivth row 
      

      let div5 = document.createElement("div");

      let label14 = document.createElement("label");
      label14.innerHTML = "Description :";
      div5.appendChild(label14);
  
      let inputDescription = document.createElement("input");
      inputDescription.setAttribute("type","text");
      inputDescription.setAttribute("id","inputDescription");
      div5.appendChild(inputDescription);

      requestForm.appendChild(div5);

       // six row 
      

       let div6 = document.createElement("div");

       let label15 = document.createElement("label");
       label15.innerHTML = "Attached file :";
       div6.appendChild(label15);
   
       let inputAttachedFile = document.createElement("input");
       inputAttachedFile.setAttribute("type","file");
       inputAttachedFile.setAttribute("id","inputAttachedFile");
       div6.appendChild(inputAttachedFile);
 
       requestForm.appendChild(div6);
       
       requestbody.appendChild(requestForm);

     
        let div7 = document.createElement("div");
        //div7.setAttribute("float","left");
        div7.style.float = "left";

        let btnSubmit = document.createElement("button");
        btnSubmit.setAttribute("class","btn btn-success");
        btnSubmit.setAttribute("id","submitButton");
        btnSubmit.setAttribute("onclick","addRequestReimb()")
        btnSubmit.innerHTML = "Submit";
        div7.appendChild(btnSubmit);

        let btnCancel= document.createElement("button");
        btnCancel.setAttribute("class","btn btn-success");
        btnCancel.setAttribute("id","clearbtnId");
        btnCancel.setAttribute("onclick","clearAllField()");
        btnCancel.innerHTML = "Cancel";
        div7.appendChild(btnCancel);

        requestbody.appendChild(div7);

}


/* clear fuunction cancel button of create request form */

function clearAllField(){
    requestbody.innerHTML = ""

}


// For load type of Reimbursment 

function reimbType(){

    let inputType = document.createElement("input");
    inputType.setAttribute("id","reimbTypeId");
    inputType.setAttribute("list","type");

    //let datalistFotType = document.createElement("");

    let datalist = document.createElement("datalist");
    datalist.setAttribute("id","searchByStatus");

    let option1 = document.createElement("option");
    option1.setAttribute("value","LODGING");
    option1.setAttribute("id","lodgingId");
    datalist.appendChild(option1);

    let option2 = document.createElement("option");
    option2.setAttribute("value","TRAVEL");
    option2.setAttribute("id","travelId");
    datalist.appendChild(option2);

    let option3 = document.createElement("option");
    option3.setAttribute("value","FOOD");
    option3.setAttribute("id","foodId");
    datalist.appendChild(option3);

    let option4 = document.createElement("option");
    option4.setAttribute("value","OTHER");
    option4.setAttribute("id","otherId");
    datalist.appendChild(option4);

    inputType.appendChild(datalist);

}




async function addRequestReimb(){
   
    //alert("Request has beed added !!");

    //let reibmAmount = requestForm.getE.value;

    let reimbRequestData = {};

    let reimbTicketNo = document.getElementById("reimbTicketNo").innerHTML;

    reimbRequestData["reimbId"] = reimbTicketNo 
    //console.log(reimbTicketNo);
    //console.log(reimbRequestData);

    let amountReimb= document.getElementById("inputAmount").value;
    reimbRequestData["reimbAmount"] = amountReimb 

    // submittedDate 

    let submittedDate  = document.getElementById("submittedDate").innerHTML;
    reimbRequestData["submittedDate"] = submittedDate; 

    //Resolved Date
    // Later updated by Manager
    let ResolvedDate  = '1900-01-01'
    reimbRequestData["resolvedDate"] = ResolvedDate; 

    //description
    let description= document.getElementById("inputDescription").value;
    reimbRequestData["description"] = description; 
 
    // Receipt  byte data 
    // converted in DAO layer 
    // here passing path of file as string
    let receipt = '/Users/mukeshchaudhary/Desktop/201130Java_Project/project1-Mukesh8688/ERS.sql'
    reimbRequestData["receipt"] = receipt; 

    // author id 

    console.log(userData.userid);
    reimbRequestData["authorId"] = userData.userid; 

    // Resolved Id 

    reimbRequestData["resolverId"] = 1; 

    // Status
    // 1 - Pending , 2 -Approved , 3 - Deny
    reimbRequestData["statusId"] = 1; 

    //Type
    let typeId = document.getElementById("inputReimbTypeId").value;
    console.log(typeId);
    if(typeId == "LODGING"){
        reimbRequestData["typeId"] = 1; 
    } else if(typeId == "TRAVEL"){
        reimbRequestData["typeId"] = 2; 
    }else if(typeId == "FOOD"){
        reimbRequestData["typeId"] = 3; 
    }else if(typeId == "OTHER"){
        reimbRequestData["typeId"] = 4; 
    }else if(typeId == ""){
        reimbRequestData["typeId"] = 4; 
    }

    
    console.log(reimbRequestData);


    let response = await fetch(url + 'requestReimbTicket',{method:"POST",body:JSON.stringify(reimbRequestData),credentials:"include"});

    if(response.status == 200){
        alert("Request has been added Successfully");
    }else{
        alert("Failed ...");
    }

    requestbody.innerHTML = "";



}



 // For display today date 

 function todayDate(){
    let today = new Date();
    let dd = String(today.getDate());
 }




 async function testFunction(){

    let value = document.getElementById("inputAmount").value;

    console.log(value);

     console.log("Mukesh test ...");
 }


 

