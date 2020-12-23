package com.revature.ers.services;

import javax.crypto.Cipher;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.ers.controllers.LoginController;
import com.revature.ers.dao.ERSDAOInterface;
import com.revature.ers.dao.impl.ERSDAOImpl;
import com.revature.ers.exception.BusinessException;
import com.revature.ers.models.UserProfile;

public class LoginService {
	
	private ERSDAOInterface ersdao = new ERSDAOImpl();
	
	private ObjectMapper objectMapper = new  ObjectMapper();
	
	
	
	private static final Logger logger = LogManager.getLogger(LoginController.class);
	
	public boolean isLogin(String username, String password) {
		
		logger.info("isLogin service is invokes !!...");
		
		if(username != null && password !=null) {
			
			return ersdao.islogin(username, password);
		}
		
		
		return false;
	}
	
	
	
	public  UserProfile getUserProfile(String username, String password) throws BusinessException {
		
		logger.info("getUserProfile service is invokes !!...");
		
		if(username != null && password != null) {
			logger.info(" You are inside getUserProfile...");
			UserProfile userProfile = ersdao.getUserProfile(username, password);
			
			return userProfile;
		}

		return null;
		
	}
	

}
