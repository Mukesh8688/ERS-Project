package com.revature.ers.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.ers.models.ReimbursmentList;
import com.revature.ers.models.RequestNewReimbursment;
import com.revature.ers.services.EmployeeService;

public class EmployeeController {
	
	private EmployeeService employeeService = new EmployeeService();
 
    private ObjectMapper objectMapper = new ObjectMapper();
    
    private static final Logger logger = LogManager.getLogger(EmployeeController.class); 

	public void getAllReimbView(HttpServletRequest request , HttpServletResponse response) throws IOException {
		
		if(request.getMethod().equals("POST")) {
		
			BufferedReader bufferReader = request.getReader();
			
			StringBuilder stringBuilder = new StringBuilder();
			
			String line = bufferReader.readLine();
			
			while(line != null) {
				stringBuilder.append(line);
				line = bufferReader.readLine();
			}
			
			String data = new String(stringBuilder);
			
			RequestNewReimbursment requestNewReimb = objectMapper.readValue(data, RequestNewReimbursment.class);
		   
			
			List<ReimbursmentList> reimbursmentList = employeeService.getAllReimbView(requestNewReimb);
			
			System.out.println(reimbursmentList);
			
			String json = objectMapper.writeValueAsString(reimbursmentList);
			
			response.getWriter().print(json);
			
			response.setStatus(200);
		}
		
	}

	public void createNewReimbTicket(HttpServletRequest request,HttpServletResponse response) throws IOException {
		
		if(request.getMethod().equals("POST")){
			
			logger.info("Inside create new ticket of employee Controller Block");
			
			
			BufferedReader bufferReader = request.getReader();
			StringBuilder stringBuilder = new StringBuilder();
			
			String line = bufferReader.readLine();
			
			while(line != null) {
				stringBuilder.append(line);
				line = bufferReader.readLine();
			}
			
			String data = new String(stringBuilder);
			
			
		    RequestNewReimbursment  requestNewReimb = objectMapper.readValue(data, RequestNewReimbursment.class);
		    
		    int status = employeeService.createReimbTicketRequest(requestNewReimb);
		    
		    if(status == 1) {
		    	
		    	response.setStatus(200);
		    	
		    }
		  
		}
	
		
		
	}

	public void getMaxTicketNo(HttpServletResponse response) throws IOException {
	
       
		ReimbursmentList reimbursment = employeeService.getMaxTicketNo();
		
		String json = objectMapper.writeValueAsString(reimbursment);
		
		response.getWriter().print(json);
		
		response.setStatus(200);
		
	}


}
