const url = "http://localhost:8080/project-1/";

// For login 

document.getElementById("loginbtn").addEventListener('click',loginFunc);

// For view all Reimbursment 

//document.getElementById("viewAllTicket").addEventListener('click',viewReimbFunc);

// for create ticket
//document.getElementById("createNewTicket").addEventListener('click',createTicket);



async function loginFunc(){

    let usern = document.getElementById("username").value;
    let userp =  document.getElementById("password").value;
 
    let user = { 
        username:usern,
        password:userp
    };
     
     console.log(user);
 
     let resp = await fetch(url + 'login', { method:"POST",body:JSON.stringify(user),credentials:"include"});

         console.log(resp);

    if(resp.status == 200){
       let data = await resp.json();

       console.log(data)
       if(data.userRoleid == 4){
            let welcomediv =  document.getElementById("login-row");
            welcomediv.innerText = "Welcome! " + data.firstName ;
            welcomediv.setAttribute("color","red");
                
             /* Display buttom for login success */
             addButtonForEmployee()

        }else if (data.userRoleid == 5){
            let welcomediv =  document.getElementById("login-row");
            welcomediv.innerText = "Welcome! " + data.firstName ;
            welcomediv.setAttribute("color","red");
                
             /* Display buttom for login success */
             addButtonForManager()
        }
     
    }else{
        document.getElementById("login-row").innerText = "Login Failed !! Please Reload Page !!";
    }
}


async function viewReimbFunc(){

    let response = await fetch(url + 'viewreimblist',{credentials:"include"});

    if(response.status == 200){
      
        console.log(response);

        let data = await response.json();

        // clear all previous elements before append

       document.getElementById("reimbhead").innerHTML = "";
       //clearBodyForViewTable();

        // add table head
        tableHeadForViewList()


        for(let reimb of data){
             
            console.log(reimb);

            document.getElementById("reimbody").innerHTML ="";

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
            cell4.innerHTML = reimb.reimbAmount;
            row.appendChild(cell4);

           
            let cell5 = document.createElement("td");
            cell5.innerHTML = reimb.submittedDate;
            row.appendChild(cell5);

            let cell6 = document.createElement("td");
            cell6.innerHTML = reimb.resolvedDate;
            row.appendChild(cell6);


            document.getElementById("reimbody").appendChild(row);
            
            response = null;

        }

    }

}



async function viewReimbFuncVersion2(){

    let response = await fetch(url + 'viewreimblist',{credentials:"include"});

    if(response.status == 200){
      
        console.log(response);

        let data = await response.json();


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


        for(let reimb of data){
             
            console.log(reimb);


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
            cell4.innerHTML = reimb.reimbAmount;
            row.appendChild(cell4);

           
            let cell5 = document.createElement("td");
            cell5.innerHTML = reimb.submittedDate;
            row.appendChild(cell5);

            let cell6 = document.createElement("td");
            cell6.innerHTML = reimb.resolvedDate;
            row.appendChild(cell6);


            tbody.appendChild(row);
            
            response = null;

        }

        table.appendChild(thead);
        table.appendChild(tbody);

        body.appendChild(table);

        

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

function tableHeadForCreateRequest(){

    document.getElementById("reimbhead").innerHTML="";

    let headrow = document.createElement("tr");

    let headercell1 = document.createElement("th")
    headrow.style.backgroundColor = "lightblue";
     headercell1.innerHTML = "New Reimbersment Ticket Request";
     headrow.appendChild(headercell1);

     document.getElementById("reimbhead").appendChild(headrow);

}



function tableBodyForCreateRequest(){

}


function createRequestForm2(){

    let requestbody = document.getElementById("table-row");

    requestbody.innerHTML = "";

   // let body = document.getElementById("reimbody");

   // let bodytr = document.getElementById("tr");

   // let requestbody = document.getElementById("td");


    let requestForm = document.createElement("form");
    requestForm.style.backgroundColor="white";
    requestForm.setAttribute("id","requestForm");
    requestForm.style.padding = "50px 100px";
    requestForm.setAttribute("class","col-sm-12")

    let divhead = document.createElement("div");
    divhead.innerHTML = "New Reimbursment  Request Form";
    divhead.style.backgroundColor= "lightblue";
    //divhead.setAttribute("class","col-sm-12");
    requestForm.appendChild(divhead);
    
    let div1 = document.createElement("div");
    div1.setAttribute("class","col-sm-4");
    

    let label1 = document.createElement("label");
    label1.innerHTML = "Reimbursment Ticket No:";
    div1.appendChild(label1)

    let label2 = document.createElement("label");
    label2.innerHTML = "1001";
    div1.appendChild(label2);

    let label3 = document.createElement("label");
    label3.innerHTML = "Create Date :";
    div1.appendChild(label3);

    let label4 = document.createElement("label");
    label4.innerHTML = new Date().toISOString().slice(0,10);
    div1.appendChild(label4);

    requestForm.appendChild(div1);
    
    // second div for second row

    let div2 = document.createElement("div");

    let label5 = document.createElement("label");
    label5.innerHTML = "Type :";
    div2.appendChild(label5)

    let label6 = document.createElement("label");
    label6.innerHTML = "Travel";
    div2.appendChild(label6);

    let label7 = document.createElement("label");
    label7.innerHTML = "Submitted Date :";
    div2.appendChild(label7);

    let label8 = document.createElement("label");
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
      label10.innerHTML = "Pending";
      div3.appendChild(label10);
  
      let label11 = document.createElement("label");
      label11.innerHTML = "Resolved Date :";
      div3.appendChild(label11);
  
      let label12 = document.createElement("label");
      label12.innerHTML = new Date().toISOString().slice(0,10);
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

       // seven row 
      

       let div7 = document.createElement("div");

       let inputSubmit = document.createElement("input");
       inputSubmit.setAttribute("type","submit");
       inputSubmit.setAttribute("id","submitButton");
       inputSubmit.innerHTML = "Submit";
       div7.appendChild(inputSubmit);
       

       /*
       let inputCancel= document.createElement("input");
       inputCancel.setAttribute("type","submit");
       inputCancel.setAttribute("id","inputCancel");
       inputCancel.innerHTML = "Cancel";
       div7.appendChild(inputCancel);
       */
 
       requestForm.appendChild(div7);



    requestbody.appendChild(requestForm);

}






function createRequestForm(){

    tableHeadForCreateRequest();

    let tablebody = document.getElementById("reimbody");

    tablebody.innerHTML = "";

    //let formForNewRequest = document.createElement("form");
    //formForNewRequest.setAttribute("id","formRequestform");
    //formForNewRequest.style.height = "300px";
    
    let row1 = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.innerHTML = "Reimbursement Ticket No :";
    row1.appendChild(cell1);

    let cell2 = document.createElement("td");
    cell2.innerHTML = "10001";
    row1.appendChild(cell2);

    let cell3 = document.createElement("td");
    cell3.innerHTML = "Create Date :";
    row1.appendChild(cell3);

    let cell4 = document.createElement("td");
    cell4.innerHTML = new Date().toISOString().slice(0,10);
    row1.appendChild(cell4);


    tablebody.appendChild(row1);

    //let labelticketno = document.createElement("p");
    //labelticketno.innerHTML = "Reimbursement Ticket No:"
   

    // Second row of table of create request

    let row2 = document.createElement("tr");

    let cell5 = document.createElement("td");
    cell5.innerHTML = "Type :";
    row2.appendChild(cell5);

    let cell6 = document.createElement("td");
    cell6.innerHTML = "Travel";
    row2.appendChild(cell6);

    let cell7 = document.createElement("td");
    cell7.innerHTML = "Submitted Date :";
    row2.appendChild(cell7);

    let cell8 = document.createElement("td");
    cell8.innerHTML = new Date().toISOString().slice(0,10);
    row2.appendChild(cell8);
   
    tablebody.appendChild(row2);

     
   // third row of table is created for request 


   let row3 = document.createElement("tr");

   let cell9 = document.createElement("td");
   cell9.innerHTML = "Status :";
   row3.appendChild(cell9);

   let cell10 = document.createElement("td");
   cell10.innerHTML = "Pending";
   row3.appendChild(cell10);

   let cell11 = document.createElement("td");
   cell11.innerHTML = "Resolved Date :";
   row3.appendChild(cell11);

   let cell12 = document.createElement("td");
   cell12.innerHTML = new Date().toISOString().slice(0,10);
   row3.appendChild(cell12);
  
   tablebody.appendChild(row3);


   // Fourth row 

   let row4 = document.createElement("tr");
   
   let labelAmountInput = document.createElement("label");
   labelAmountInput.innerHTML = " Total Amount";
   row4.appendChild(labelAmountInput);

   let inputAmount = document.createElement("input")
   inputAmount.setAttribute("type","text");
   inputAmount.setAttribute("id","reimbAmount");

   row4.appendChild(inputAmount);

   /*

   let cell13 = document.createElement("td");
   cell13.innerHTML = "Amount :";
   row4.appendChild(cell13);

   let cell14 = document.createElement("td");
   let inputAmount = document.createElement("input")
   inputAmount.setAttribute("type","text");
   inputAmount.setAttribute("id","reimbAmount");
   cell14.innerHTML = inputAmount;
   row4.appendChild(cell14);

   */ 
  
   tablebody.appendChild(row4);

     // Fivth row 

      /*
   let row5 = document.createElement("tr");
   
   let labelAmountInput = document.createElement("label");
   labelAmountInput.innerHTML = " Description : ";
   row4.appendChild(labelAmountInput);

   let inputAmount = document.createElement("input")
   inputAmount.setAttribute("type","text");
   inputAmount.setAttribute("id","reimbAmount");

   row4.appendChild(inputAmount);

  

   let cell15 = document.createElement("td");
   cell15.innerHTML = "Description :";
   row5.appendChild(cell15);

   let cell16 = document.createElement("td");
   cell16.innerHTML = "For Traveling";
   row5.appendChild(cell16);
  
   tablebody.appendChild(row5);

      // sixth row 

   let row6 = document.createElement("tr");

   let cell17 = document.createElement("td");
   cell17.innerHTML = "Attacked File :";
   row6.appendChild(cell17);

   let cell18 = document.createElement("td");
   cell18.innerHTML = "For Traveling";
   row6.appendChild(cell18);

   */
  
   tablebody.appendChild(row6);


      // Seventh row 

   let row7 = document.createElement("tr");

   let cell19 = document.createElement("td");
   cell19.innerHTML = "Submit";
   row7.appendChild(cell19);

   let cell20 = document.createElement("td");
   cell20.innerHTML = "Cancel";
   row7.appendChild(cell20);
  
   tablebody.appendChild(row7);
   
    
 }



/* This is the display button for employee users */
 function addButtonForEmployee(){
    let viewbtn1 = document.createElement("button");
    viewbtn1.setAttribute("class","btn btn-success");
    viewbtn1.setAttribute("id","viewAllTicketForEmployee");
   // viewbtn1.setAttribute("onclick","viewReimbFunc()")
    viewbtn1.setAttribute("onclick","viewReimbFuncVersion2()");
    viewbtn1.innerHTML = "View All Reimbursment Tickets";
    document.getElementById("btngroup").appendChild(viewbtn1);

    let viewbtn2 = document.createElement("button");
    viewbtn2.setAttribute("class","btn btn-success");
    viewbtn2.setAttribute("id","createNewTicket");
    viewbtn2.setAttribute("onclick","createRequestForm2()");

    viewbtn2.innerHTML = "Create New Request";
    document.getElementById("btngroup").appendChild(viewbtn2);

 }




 /* to display Manager level Button when Manage logged in */
 function addButtonForManager(){
    let btngroup =  document.getElementById("btngroup");

    let viewbtn1 = document.createElement("button");
    viewbtn1.setAttribute("class","btn btn-success");
    viewbtn1.setAttribute("id","viewAllTicketForManager");
    //viewbtn1.setAttribute("onclick","viewReimbFunc()");
    viewbtn1.setAttribute("onclick","viewReimbFuncVersion2()");
    viewbtn1.innerHTML = "View All Reimbursment Tickets";
    btngroup.appendChild(viewbtn1);
    
    let viewbtn2 = document.createElement("label");
   //viewbtn2.setAttribute("class","btn btn-success");
   // viewbtn2.setAttribute("id","SearchByStatus");
    viewbtn2.style.backgroundColor = "lightgreen";
    //viewbtn3.style.height = "1px";
    viewbtn2.innerHTML = "SearchByStatus";
    btngroup.appendChild(viewbtn2);

    let viewbtn3 = document.createElement("input");
    viewbtn3.setAttribute("list","searchByStatus");

    let datalist = document.createElement("datalist");
    datalist.setAttribute("id","searchByStatus");

    let option1 = document.createElement("option");
    option1.setAttribute("value","Pending");
    datalist.appendChild(option1);
    let option2 = document.createElement("option");
    option2.setAttribute("value","Approved");
    datalist.appendChild(option2);
    let option3 = document.createElement("option");
    option3.setAttribute("value","Deny");
    datalist.appendChild(option3);

    viewbtn3.appendChild(datalist);


    //viewbtn3.innerHTML = "SearchByStatus";
    btngroup.appendChild(viewbtn3);

 }


 // For display today date 

 function todayDate(){
    let today = new Date();
    let dd = String(today.getDate());
 }





 

