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
import com.revature.ers.models.UpdateReimbursment;
import com.revature.ers.services.ManagerService;

public class ManagerController {
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
	private ManagerService managerService = new ManagerService();
	
    private static final Logger logger = LogManager.getLogger(ManagerController.class); 
	
	
	
	// Fetch all view list by Manager

	public void getAllReimbView(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
	   
		if(request.getMethod().equals("POST")) {
			List<ReimbursmentList> reimbursmentListForManager = managerService.getAllReimbView();
			
			String json = objectMapper.writeValueAsString(reimbursmentListForManager);
			
			response.getWriter().print(json);
			
			logger.info("getAllReimbView controller is invoked...");
			
			response.setStatus(200);
		}
		
		
	}
	
	/* update Reimbursment status by mangar level*/

	public void updateStatus(HttpServletRequest request,HttpServletResponse response) throws IOException {
		
		
		if(request.getMethod().equals("POST")) {
            BufferedReader bufferReader = request.getReader();
			
			StringBuilder stringBuilder = new StringBuilder();
			
			String line = bufferReader.readLine();
			
			while(line != null) {
				System.out.println("Line " + line);
				stringBuilder.append(line);
				line = bufferReader.readLine();
			}
			
			String body = new String(stringBuilder);
			
			System.out.println( "String Body "+body);
			
			UpdateReimbursment updateReimb = objectMapper.readValue(body, UpdateReimbursment.class);
				
		
		     int status = managerService.updateStatus(updateReimb);
		     
		     System.out.println(status);
		     
		     if(status == 1) {
		    	 response.setStatus(200);
		    	 
		    	 logger.info("updateStatus controller is invoked...");
	
		     }
		
		}
		
	}

	public void searchByStatus(HttpServletRequest request, HttpServletResponse response) throws IOException {
	  

		if(request.getMethod().equals("POST")) {
			
            BufferedReader bufferReader = request.getReader();
			
			StringBuilder stringBuilder = new StringBuilder();
			
			String line = bufferReader.readLine();
			
			while(line != null) {
				stringBuilder.append(line);
				line = bufferReader.readLine();
			}
			
			String body = new String(stringBuilder);
			
			logger.info( "String Body "+body);
			
			UpdateReimbursment updateReimb = objectMapper.readValue(body, UpdateReimbursment.class);
				
		     
		     List<ReimbursmentList> reimbursmentListForManager = managerService.searchByStatus(updateReimb);
				
				String json = objectMapper.writeValueAsString(reimbursmentListForManager);
				
				response.getWriter().print(json);
				
				logger.info("updateStatus controller is invoked...");
				
				response.setStatus(200);
	
		}

	}

}
