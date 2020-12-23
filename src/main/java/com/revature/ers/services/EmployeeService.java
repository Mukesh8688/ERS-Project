package com.revature.ers.services;

import java.io.FileNotFoundException;
import java.util.List;

import com.revature.ers.dao.ERSDAOInterface;
import com.revature.ers.dao.impl.ERSDAOImpl;
import com.revature.ers.models.Employee;
import com.revature.ers.models.ReimbursmentList;
import com.revature.ers.models.RequestNewReimbursment;


public class EmployeeService {
	
	private ERSDAOInterface ersDAOInterface = new ERSDAOImpl();

	public List<ReimbursmentList> getAllReimbView(RequestNewReimbursment requestNewReimb) {
	
		return ersDAOInterface.getAllReimbView(requestNewReimb);
	}

	public int createReimbTicketRequest(RequestNewReimbursment requestNewReimb) throws FileNotFoundException {
		
		return ersDAOInterface.createReimbTicketRequest(requestNewReimb);
		
	}

	public ReimbursmentList getMaxTicketNo() {
		
		return ersDAOInterface.getMaxTicketNo();
	}

}
