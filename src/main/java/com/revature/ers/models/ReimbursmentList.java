package com.revature.ers.models;

import java.util.Date;

public class ReimbursmentList {
	
	private int reimbId;
	private double reimbAmount;
	private String reimbStatus;
	private String reimbType;
	private Date submittedDate;
	private Date resolvedDate;
	
	// Constructor
	public ReimbursmentList() {
		super();
		
	}
	
	public ReimbursmentList(int reimbId) {
		super();
		
		this.reimbId = reimbId;
		
	}

	public ReimbursmentList(int reimbId, double reimbAmount, String reimbStatus, String reimbType, Date submittedDate,
			Date resolvedDate) {
		super();
		this.reimbId = reimbId;
		this.reimbAmount = reimbAmount;
		this.reimbStatus = reimbStatus;
		this.reimbType = reimbType;
		this.submittedDate = submittedDate;
		this.resolvedDate = resolvedDate;
	}

	public int getReimbId() {
		return reimbId;
	}

	public void setReimbId(int reimbId) {
		this.reimbId = reimbId;
	}

	public double getReimbAmount() {
		return reimbAmount;
	}

	public void setReimbAmount(double reimbAmount) {
		this.reimbAmount = reimbAmount;
	}

	public String getReimbStatus() {
		return reimbStatus;
	}

	public void setReimbStatus(String reimbStatus) {
		this.reimbStatus = reimbStatus;
	}

	public String getReimbType() {
		return reimbType;
	}

	public void setReimbType(String reimbType) {
		this.reimbType = reimbType;
	}

	public Date getSubmittedDate() {
		return submittedDate;
	}

	public void setSubmittedDate(Date submittedDate) {
		this.submittedDate = submittedDate;
	}

	public Date getResolvedDate() {
		return resolvedDate;
	}

	public void setResolvedDate(Date resolvedDate) {
		this.resolvedDate = resolvedDate;
	}

	@Override
	public String toString() {
		return "ReimbursmentList [reimbId=" + reimbId + ", reimbAmount=" + reimbAmount + ", reimbStatus=" + reimbStatus
				+ ", reimbType=" + reimbType + ", submittedDate=" + submittedDate + ", resolvedDate=" + resolvedDate
				+ "]";
	}
	
	
	
	

}
