package com.revature.ers.services;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.revature.ers.dao.ERSDAOInterface;
import com.revature.ers.dao.impl.ERSDAOImpl;
import com.revature.ers.models.ReimbursmentList;
import com.revature.ers.models.UpdateReimbursment;

public class ManagerService {
	
	private ERSDAOInterface ersDAOInterface = new ERSDAOImpl();
	
	private static final Logger logger = LogManager.getLogger(ManagerService.class); 

	public List<ReimbursmentList> getAllReimbView() {
		
		logger.info("getAllReimbView service is invoked!!...");
		
		return ersDAOInterface.getAllReimbViewForManager();
	}

	
	
	// Update status by Manager
	public int updateStatus(UpdateReimbursment updateReimb) {
		
		logger.info("updateStatus service is invoked!!...");
		
		if(updateReimb.getRoleId() == 5) {
			
		    return ersDAOInterface.updateReimbursment(updateReimb);
		    
		}   
		
		return 0;
	}



	public List<ReimbursmentList> searchByStatus(UpdateReimbursment updateReimb) {
		
		logger.info("searchByStatus service is invokded!!...");
		
		return ersDAOInterface.getAllReimbViewByStatus(updateReimb);
		
	}

}
