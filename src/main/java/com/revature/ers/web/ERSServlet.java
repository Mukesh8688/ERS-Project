package com.revature.ers.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.revature.ers.controllers.EmployeeController;
import com.revature.ers.controllers.LoginController;
import com.revature.ers.controllers.ManagerController;
import com.revature.ers.exception.BusinessException;
import com.revature.ers.services.ERSServices;
import com.revature.ers.services.impl.ERSServicesImpl;

public class ERSServlet extends HttpServlet{
	
//	private ERSServices ersServices = new ERSServicesImpl();

	
	private LoginController loginController = new LoginController();
	
	private EmployeeController employeeController = new EmployeeController();
	
	private ManagerController managerController = new ManagerController();
	
	private static final Logger logger = LogManager.getLogger(ERSServlet.class); 
	
	private static final long serialVersionUID = 1L;
	
	
	// doGet method
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException,IOException{
		
		logger.info("Program is start..");
		
		response.setContentType("application.json");
		
		//response.addCookie(cookie);

		
		// ByDefault tomcat send back successfully statuc 
		// So set first set 404 status i.e Not Found
		
		response.setStatus(404);
		
		final String URI = request.getRequestURI().replace("/project-1/", "");
		
		//System.out.println(request.getRequestURI());
		//System.out.println(URI);
		
		switch(URI) {
		
		case "login" :
			
			try {
				logger.info("login URI request are  arrived succesfully !!...");
				loginController.login(request,response);
			} catch (IOException e) {
				
				e.printStackTrace();
			} catch (BusinessException e) {
				
				e.printStackTrace();
			}
			
			break;
			
			
		case "employee":
			
			if(request.getSession(false) != null) {
				
				logger.info("employee URI request are  arrived succesfully !!...");
				employeeController.getAllReimbView(request,response);
				
			}else {
				response.setStatus(403);
			}
			
			break;
			
		case "requestReimbTicket":
			
			if(request.getSession(false) != null) {
				
				logger.info("requestReimbTicket URI request are  arrived succesfully !!...");
			
			   employeeController.createNewReimbTicket(request,response);
			
			}else {
				response.setStatus(403);
			}
			break;
			
			
	    case "getMaxTicketNo":
			
			if(request.getSession(false) != null) {
				
				logger.info("getMaxTicketNo URI request are  arrived succesfully !!...");
			
			    employeeController.getMaxTicketNo(response);
			
			}else {
				response.setStatus(403);
			}
			break;	
		
		
		case "manager":
			
           if(request.getSession(false) != null) {
				
        	   logger.info("manager URI request are  arrived succesfully !!...");
				managerController.getAllReimbView(request,response);
				
			}else {
				response.setStatus(403);
			}
			
			break;
			
			
		case "updatestatus":
			
			   if(request.getSession(false) != null) {
					
				   logger.info("updatestatus URI request are  arrived succesfully !!...");
					managerController.updateStatus(request,response);
					
				}else {
					response.setStatus(403);
				}
				
				break;
				
		case "searchByStatus":
			
			   if(request.getSession(false) != null) {
					
				   logger.info("updatestatus URI request are  arrived succesfully !!...");
					managerController.searchByStatus(request,response);
					
				}else {
					response.setStatus(403);
				}
				
				break;			
			

	    }
	}	
	
	// doPost method
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{
		
		logger.info("This is doPost method");
		
		doGet(request,response);
	}

}
