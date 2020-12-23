package com.revature.ers.controllers;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.ers.exception.BusinessException;
import com.revature.ers.models.UserProfile;
import com.revature.ers.services.ERSServices;
import com.revature.ers.services.LoginService;
import com.revature.ers.services.ManagerService;
import com.revature.ers.services.impl.ERSServicesImpl;

public class LoginController {
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
	private ERSServices ersServices = new ERSServicesImpl();
	
	private LoginService loginService = new LoginService();
	
	private static final Logger logger = LogManager.getLogger(LoginController.class); 

	public void login(HttpServletRequest request, HttpServletResponse response) throws IOException, BusinessException {
		
		logger.info("login controller is invoked !!...");
		
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
			
			UserProfile userProfile = objectMapper.readValue(body, UserProfile.class);
			
			String tempUser = userProfile.getUsername();
			String tempPass = userProfile.getPassword();
			
			if(loginService.isLogin(tempUser, tempPass)) {
				
				
				UserProfile userProfileForJSON =  loginService.getUserProfile(tempUser, tempPass);
				
				String json = objectMapper.writeValueAsString(userProfileForJSON);
				
				response.getWriter().print(json);
				
				HttpSession httpSession = request.getSession();
				//httpSession.setAttribute("user", userProfile);
				//httpSession.setAttribute("loggedin",true);
				
				response.setStatus(200);
				//response.getWriter().print("Login Successfully");
				
				logger.info("login is  done Successfull!!");
				
				
			}else {
				
				HttpSession httpSession = request.getSession(false);
				if(httpSession != null) {
					httpSession.invalidate();
				}
			}
			
			
		}
		
		/*
		else if(request.getMethod().equals("GET")){
			
			if(request.getParameterMap().containsKey("username") && request.getParameterMap().containsKey("password")) {
				
				
				if(ersServices.isLogin(request.getParameter("username"), request.getParameter("password"))) {
					HttpSession httpSession = request.getSession();
					//httpSession.setAttribute("user", userProfile);
					
					response.setStatus(200);
					response.getWriter().print("Login Successfully");	
		
				}else {
					
					HttpSession httpSession = request.getSession(false);
					if(httpSession != null) {
						httpSession.invalidate();
					}
				}
			}
		} 
		*/
		
		
		
	}
	
	

}
