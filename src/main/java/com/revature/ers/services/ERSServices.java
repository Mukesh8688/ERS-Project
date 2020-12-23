package com.revature.ers.services;

import javax.servlet.http.HttpServletResponse;

import com.revature.ers.exception.BusinessException;

public interface ERSServices {
	
	public void getUserProfile(HttpServletResponse response, String username,String password) throws BusinessException;
	
	public boolean isLogin(String username, String password) throws BusinessException ;

}
