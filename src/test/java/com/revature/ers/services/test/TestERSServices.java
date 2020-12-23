package com.revature.ers.services.test;

import java.io.FileNotFoundException;
import java.util.Date;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import com.revature.ers.exception.BusinessException;
import com.revature.ers.models.RequestNewReimbursment;
import com.revature.ers.models.UpdateReimbursment;
import com.revature.ers.services.EmployeeService;
import com.revature.ers.services.LoginService;
import com.revature.ers.services.ManagerService;

public class TestERSServices {
	
	private static EmployeeService employeeServices;
	private static ManagerService managerServices;
	private static LoginService loginService;
	
	@BeforeAll
	public static void setupERSServices() {
		
		employeeServices = new EmployeeService();
		managerServices = new ManagerService();
		loginService = new LoginService();
	}
	
	
	// testing Employee Services
	
	@Test
	void testGetAllReimbView() {
		
		RequestNewReimbursment authorId = new RequestNewReimbursment(1);
		
		employeeServices.getAllReimbView(authorId);
	}
	
	@Test
	void testGetMaxTicketNo() {
		
		employeeServices.getMaxTicketNo();
	}
	
//	@Test
//	void testCreateReimbTicketRequest() throws FileNotFoundException {
//		
//		int reimbId = 1014;
//		String receipt = "/Users/mukeshchaudhary/Desktop/preet.jpg";
//		
//		RequestNewReimbursment requestNewReimb = new RequestNewReimbursment(reimbId, 130, new Date(), new Date(), "test", receipt, 1, 1, 1, 1);
//		
//		employeeServices.createReimbTicketRequest(requestNewReimb);
//		
//	}
	
	@Test
	void testGetUserProfilePositive() throws BusinessException {
		
		String username = "mukesh";
		String password = "chicago";
		
		
		loginService.getUserProfile(username, password);
		
	}
	
	@Test
	void testGetUserProfileNegative() throws BusinessException {
		
		String username = "";
		String password = "chicago";
		
		
		loginService.getUserProfile(username, password);
		
	}
	
	
	@Test
	void testIsLogin() {
		
		String username = "mukesh";
		String password = "chicago";
		
		
		loginService.isLogin(username, password);
		
	}
	
	@Test
	void testIsLoginNegative() {
		
		String username = "mukesh";
		String password = "1";
		
		
		loginService.isLogin(username, password);
		
	}
	
	// testing Manager Services
	@Test
	void testGetAllReimbViewManager() {
		
		managerServices.getAllReimbView();
		
	}
	
	@Test
	void testSearchByStatusManager() {
		
		int statusId = 1;
		
		UpdateReimbursment updateReimb = new UpdateReimbursment(0, 0, statusId, 0);
		
		managerServices.searchByStatus(updateReimb);
		
	}
	
	@Test
	void testUpdateStatusPositive() {
		int reimbId = 1005;
		UpdateReimbursment updateReimb = new UpdateReimbursment(2, 2, reimbId, new Date());
		
		managerServices.updateStatus(updateReimb);
	}
	
	
	@Test
	void testUpdateStatusNegative() {
		int reimbId = -1005;
		UpdateReimbursment updateReimb = new UpdateReimbursment(2, 2, reimbId, new Date());
		
		managerServices.updateStatus(updateReimb);
	}
	
	
	
	

}
