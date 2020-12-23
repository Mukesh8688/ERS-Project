package com.revature.ers.dao;

import java.io.FileNotFoundException;
import java.util.List;

import com.revature.ers.exception.BusinessException;
import com.revature.ers.models.Employee;
import com.revature.ers.models.ReimbursmentList;
import com.revature.ers.models.RequestNewReimbursment;
import com.revature.ers.models.UpdateReimbursment;
import com.revature.ers.models.UserProfile;

public interface ERSDAOInterface {
	
	
	public UserProfile getUserProfile(String username, String password) throws BusinessException;

	public boolean islogin(String username, String password);
	
	public int getUserId(String Username);

	public List<ReimbursmentList> getAllReimbView(RequestNewReimbursment requestNewReimb);

	public int createReimbTicketRequest(RequestNewReimbursment requestNewReimb) throws FileNotFoundException;

	public List<ReimbursmentList> getAllReimbViewForManager();

	public int updateReimbursment(UpdateReimbursment updateReimb);

	public List<ReimbursmentList> getAllReimbViewByStatus(UpdateReimbursment updateReimb);

	public ReimbursmentList getMaxTicketNo();
	

}
