package com.revature.ers.dao.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import com.revature.ers.dao.ERSDAOInterface;
import com.revature.ers.dao.dbutil.ERSDBConnection;
import com.revature.ers.dao.dbutil.ERSDbQueries;
import com.revature.ers.exception.BusinessException;
import com.revature.ers.models.EncryptDecryptModel;
import com.revature.ers.models.ReimbursmentList;
import com.revature.ers.models.RequestNewReimbursment;
import com.revature.ers.models.UpdateReimbursment;
import com.revature.ers.models.UserProfile;

public class ERSDAOImpl implements ERSDAOInterface{
	
	private static final Logger logger = LogManager.getLogger(ERSDAOImpl.class);

	@Override
	public UserProfile getUserProfile(String username, String password) throws BusinessException {
	
		logger.info("getUserProfile DAO layer is invoked !!...");
		
		if(username != null && password != null) {
			
			String encryptPassword = EncryptDecryptModel.encrypt(password, ERSDbQueries.SECRETKEY);
			
			try(Connection connection  = ERSDBConnection.getConnection()){
				
				String sql = ERSDbQueries.USER_PROFILE;
				
				PreparedStatement preparedStatement  = connection.prepareStatement(sql);
				preparedStatement.setString(1, username);
				preparedStatement.setString(2, encryptPassword);
				
				
				// execute SQL query
				
				ResultSet resultSet = preparedStatement.executeQuery();
				
				if(resultSet.next()) {
					
					
					UserProfile userProfile  = new UserProfile(resultSet.getInt("ers_users_id"),username,resultSet.getString("ers_first_name")
							,resultSet.getString("ers_last_name"),resultSet.getString("user_email"),resultSet.getInt("user_role_id"));
					
					logger.info("userProfile is uploaded successfully");
					return userProfile ;
					
				}
				
			}catch(ClassNotFoundException|SQLException e) {
				
				e.printStackTrace();
				
			}
			
			
			
			
		}
		
		logger.info("Inside getUser DAO Not found...");
		return null;
	}
    
	
	// Verify true or false By username and password
	@Override
	public boolean islogin(String username, String password) {
		
		logger.info("islogin DAO layer is invoked !!...");
		
		String encryptPassword = EncryptDecryptModel.encrypt(password, ERSDbQueries.SECRETKEY);
		
		System.out.println(encryptPassword);
		
        try(Connection connection = ERSDBConnection.getConnection()){
        	String sql = ERSDbQueries.USER_PROFILE;
        	
        	PreparedStatement preparedStatement = connection.prepareStatement(sql);
        	preparedStatement.setString(1, username);
			preparedStatement.setString(2, encryptPassword);
		
			
			if(preparedStatement.executeQuery().next()) {
				
				
				logger.info("user found...");
				
				return true;
				
			}
        	
			
        	
        	
        }catch(SQLException e) {
        	e.printStackTrace();
        }catch(ClassNotFoundException e) {
        	e.printStackTrace();
        }
		return false;
	}
	
	// Get UserId By username 
	
	@Override
	public int getUserId(String username) {
		
		
		try(Connection connection  = ERSDBConnection.getConnection()){
			
			String sql = ERSDbQueries.GET_USER_ID;
			
			PreparedStatement preparedStatement  = connection.prepareStatement(sql);
			preparedStatement.setString(1, username);
			
			
			
			// execute SQL query
			
			ResultSet resultSet = preparedStatement.executeQuery();
			
			if(resultSet.next()) {
				
//				userProfile = new UserProfile(resultSet.getInt("ers_users_id"),resultSet.getString(username),resultSet.getString("ers_first_name")
//						,resultSet.getString("ers_last_name"),resultSet.getString("user_email"),resultSet.getInt("user_role_id"));
//				
			}
			
		}catch(ClassNotFoundException|SQLException e) {
			
			
		}
		
		
		return 0;
	}

	@Override
	public List<ReimbursmentList> getAllReimbView(RequestNewReimbursment authorObj) {
		
		logger.info("getAllReimbView DAO layer is invoked !!...");
		if(authorObj != null) {
			try(Connection connection = ERSDBConnection.getConnection()){
				
				String sql = ERSDbQueries.GET_ALL_REIMB_VIEW;
				
				PreparedStatement preparedStatement  = connection.prepareStatement(sql);
				preparedStatement.setInt(1, authorObj.getAuthorId());
				
				
				
				// execute SQL query
				
				ResultSet resultSet = preparedStatement.executeQuery();
				
				List<ReimbursmentList> reimbursmentList = new ArrayList<>();
				
				while(resultSet.next()) {
					
					ReimbursmentList reimbObj =  new ReimbursmentList(resultSet.getInt("id"),resultSet.getInt("amount"),resultSet.getString("status")
							,resultSet.getString("type"),resultSet.getDate("submittedDate"),resultSet.getDate("resolvedDate"));
					
					reimbursmentList.add(reimbObj);
					
					logger.info("Data from Reimbursment got successfully");
					
				}
				
				
				return reimbursmentList;
				
				
				
				
			}catch(SQLException|ClassNotFoundException e) {
				e.printStackTrace();
			}
			
		}
		
		
		return null;
	}


	@Override
	public int createReimbTicketRequest(RequestNewReimbursment requestNewReimb) throws FileNotFoundException {
		
		logger.info("createReimbTicketRequest DAO layer is invoked !!...");
		
		if(requestNewReimb != null) {
			     
			       System.out.println("inside of DAO create request ");
		           File file = new File(requestNewReimb.getReceipt());
		           FileInputStream fis = new FileInputStream(file);
		
			        try(Connection connection = ERSDBConnection.getConnection()){
						
						String sql = ERSDbQueries.INSERT_NEW_REIMB_REQUEST;
						
						PreparedStatement preparedStatement  = connection.prepareStatement(sql);
						preparedStatement.setInt(1, requestNewReimb.getReimbId());
						preparedStatement.setDouble(2, requestNewReimb.getReimbAmount());
						preparedStatement.setDate(3, new java.sql.Date(requestNewReimb.getSubmittedDate().getTime()));
						
						preparedStatement.setDate(4, new java.sql.Date(requestNewReimb.getResolvedDate().getTime()));
						
						preparedStatement.setString(5, requestNewReimb.getDescription());
						preparedStatement.setBinaryStream(6, fis,(int)file.length());
						preparedStatement.setInt(7, requestNewReimb.getAuthorId());
						preparedStatement.setInt(8, requestNewReimb.getResolverId());
						preparedStatement.setInt(9, requestNewReimb.getStatusId());
						preparedStatement.setInt(10, requestNewReimb.getTypeId());
						
						
						int successInt = preparedStatement.executeUpdate();
						
						if(successInt == 1) {
							logger.info("Insert Successfully Done...");
							return successInt;
							
						}else {
							logger.info("Insert Failed...");
							return successInt;
						}
		
					}catch(SQLException|ClassNotFoundException e) {
						e.printStackTrace();
					}
					
					
					
					
				}
		
		return 0;
		
	}


	@Override
	public List<ReimbursmentList> getAllReimbViewForManager() {
		
		logger.info("getAllReimbViewForManager DAO layer is invoked !!...");
		
		try(Connection connection = ERSDBConnection.getConnection()){
			
			String sql = ERSDbQueries.GET_ALL_REIMB_VIEW_FOR_MANAGER;
			
			PreparedStatement preparedStatement  = connection.prepareStatement(sql);
			
			
			
			// execute SQL query
			
			ResultSet resultSet = preparedStatement.executeQuery();
			
			List<ReimbursmentList> reimbursmentList = new ArrayList<>();
			
			while(resultSet.next()) {
				
				ReimbursmentList reimbObj =  new ReimbursmentList(resultSet.getInt("id"),resultSet.getInt("amount"),resultSet.getString("status")
						,resultSet.getString("type"),resultSet.getDate("submittedDate"),resultSet.getDate("resolvedDate"));
				
				reimbursmentList.add(reimbObj);
				
				logger.info("Data from Reimbursment got successfully");
				
			}
		
			
			return reimbursmentList;
			
			
			
			
		}catch(SQLException|ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		
		
		return null;
	}


	@Override
	public int updateReimbursment(UpdateReimbursment updateReimb) {
		
		logger.info("updateReimbursment DAO is innoked ... " +updateReimb);
		if(updateReimb != null) {
		     
		       logger.info("inside of DAO update ... ");
	          
	
		        try(Connection connection = ERSDBConnection.getConnection()){
					
					String sql = ERSDbQueries.UPDATE_REIMB;
					
					PreparedStatement preparedStatement  = connection.prepareStatement(sql);
					preparedStatement.setInt(1, updateReimb.getStatusId());
					preparedStatement.setDate(2, new java.sql.Date(updateReimb.getDate().getTime()));
					preparedStatement.setInt(3, updateReimb.getUserId());
					preparedStatement.setInt(4, updateReimb.getReimbId());
					
					
					int successInt = preparedStatement.executeUpdate();
					
					if(successInt == 1) {
						logger.info("Update Successfully Done...");
						return successInt;
						
					}else {
						logger.info("Update Failed...");
					}
	
				}catch(SQLException|ClassNotFoundException e) {
					e.printStackTrace();
				}
				
				
				
				
			}
	
		
		return 0;
	}


	@Override
	public List<ReimbursmentList> getAllReimbViewByStatus(UpdateReimbursment updateReimb) {
		
		logger.info("getAllReimbViewByStatus DAO layer is invoked !!...");
		
		if(updateReimb != null) {
			try(Connection connection = ERSDBConnection.getConnection()){
				
				String sql = ERSDbQueries.GET_ALL_REIMB_VIEW_BYSTATUS;
				
				PreparedStatement preparedStatement  = connection.prepareStatement(sql);
				preparedStatement.setInt(1, updateReimb.getStatusId());
				
				
				
				// execute SQL query
				
				ResultSet resultSet = preparedStatement.executeQuery();
				
				List<ReimbursmentList> reimbursmentList = new ArrayList<>();
				
				while(resultSet.next()) {
					
					ReimbursmentList reimbObj =  new ReimbursmentList(resultSet.getInt("id"),resultSet.getInt("amount"),resultSet.getString("status")
							,resultSet.getString("type"),resultSet.getDate("submittedDate"),resultSet.getDate("resolvedDate"));
					
					reimbursmentList.add(reimbObj);
					
					logger.info("Data from Reimbursment got successfully");
					
				}
				
				
				return reimbursmentList;
				
				
				
				
			}catch(SQLException|ClassNotFoundException e) {
				e.printStackTrace();
			}
			
		}
		
		
		return null;
		
		
	}


	@Override
	public ReimbursmentList getMaxTicketNo() {
		
		logger.info("getMaxTicketNo DAO layer is invoked !!...");
		
        try(Connection connection = ERSDBConnection.getConnection()){
			
			String sql = ERSDbQueries.GET_MAX_REIMB_TICKETNO;
			
			PreparedStatement preparedStatement  = connection.prepareStatement(sql);
			
			
			ResultSet resultSet = preparedStatement.executeQuery();
			
			if(resultSet.next()) {
				
				return new ReimbursmentList(resultSet.getInt("maxId"));
				
				
				
			}
			
		}catch(SQLException|ClassNotFoundException e) {
			e.printStackTrace();
		}
		

		return null;
	}



	

}
