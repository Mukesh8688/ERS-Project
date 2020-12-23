package com.revature.ers.services.impl;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.revature.ers.dao.ERSDAOInterface;
import com.revature.ers.dao.impl.ERSDAOImpl;
import com.revature.ers.exception.BusinessException;
import com.revature.ers.models.UserProfile;
import com.revature.ers.services.ERSServices;

public class ERSServicesImpl implements ERSServices {
	
	private ERSDAOInterface ersdao = new ERSDAOImpl();
	
	
	private ObjectMapper objectMapper = new  ObjectMapper();
	

	
	

	@Override
	public  void getUserProfile(HttpServletResponse response, String username, String password) throws BusinessException {
		int userid = 0;
		if(username == null && password == null) {
			throw new BusinessException("Username and Password are empty !!... \n"
					+ "Please try again ...");
		}
		
		
		UserProfile userProfile = ersdao.getUserProfile(username, password);
		
		
		try {
			String json = objectMapper.writeValueAsString(userProfile);
			response.getWriter().print(json);
			
		} catch (JsonProcessingException e) {
			
			e.printStackTrace();
			
		}catch(IOException e) {
			
			e.getMessage();
		}
		
		
		
	}





	@Override
	public boolean isLogin(String username, String password) throws BusinessException {
	    
		if(username != null && password != null) {
			
			return ersdao.islogin(username,password);
			
		}
		
		return false;
		
		
	}

}
