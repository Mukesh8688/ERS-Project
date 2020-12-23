package com.revature.ers.models;

import java.util.Date;

public class UpdateReimbursment {
	
	private int userId;
	private int roleId;
	private int statusId;
	private int reimbId;
	private Date date;
	
	// constructor
	public UpdateReimbursment() {
		super();
	
	}
	
	public UpdateReimbursment(int userId, int roleId, int statusId,int reimbId) {
		super();
		this.userId = userId;
		this.roleId = roleId;
		this.statusId = statusId;
		this.reimbId = reimbId;
	}
	
	public UpdateReimbursment(int roleId, int statusId,int reimbId, Date date) {
		super();
		this.roleId = roleId;
		this.statusId = statusId;
		this.reimbId = reimbId;
		this.date = date;
	}
    
	
	// sette and getter
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}


	
	public int getStatusId() {
		return statusId;
	}

	public void setStatusId(int statusId) {
		this.statusId = statusId;
	}
	
	
	public int getReimbId() {
		return reimbId;
	}

	public void setReimbId(int reimbId) {
		this.reimbId = reimbId;
	}
	
	public Date getDate() {
		return date;
	}
	
	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "UpdateReimbursment [userId=" + userId + ", roleId=" + roleId + ", statusId=" + statusId + ",reimbId " + reimbId  + ", Date" + date +  "]";
	}
	
	
	
	
	

}
