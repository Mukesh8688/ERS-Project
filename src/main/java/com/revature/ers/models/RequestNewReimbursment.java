package com.revature.ers.models;

import java.util.Date;

public class RequestNewReimbursment {
	
	private int reimbId;
	private double reimbAmount;
	private Date submittedDate;
	private Date resolvedDate;
	private String description;
	private String receipt;
	private int authorId;
	private int resolverId;
	private int statusId;
	private int typeId;
	
	// Constructor
	
	
	public RequestNewReimbursment() {
		super();
		
	}
	
	public RequestNewReimbursment(int authorId) {
		super();
		this.authorId = authorId;
	}

	public RequestNewReimbursment(int reimbId, double reimbAmount, Date submittedDate, Date resolvedDate,
			String description, String receipt, int authorId, int resolverId, int statusId, int typeId) {
		super();
		this.reimbId = reimbId;
		this.reimbAmount = reimbAmount;
		this.submittedDate = submittedDate;
		this.resolvedDate = resolvedDate;
		this.description = description;
		this.receipt = receipt;
		this.authorId = authorId;
		this.resolverId = resolverId;
		this.statusId = statusId;
		this.typeId = typeId;
	}

	public RequestNewReimbursment(double reimbAmount, Date submittedDate, Date resolvedDate, String description,
			String receipt, int authorId, int resolverId, int statusId, int typeId) {
		super();
		this.reimbAmount = reimbAmount;
		this.submittedDate = submittedDate;
		this.resolvedDate = resolvedDate;
		this.description = description;
		this.receipt = receipt;
		this.authorId = authorId;
		this.resolverId = resolverId;
		this.statusId = statusId;
		this.typeId = typeId;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getReceipt() {
		return receipt;
	}

	public void setReceipt(String receipt) {
		this.receipt = receipt;
	}

	public int getAuthorId() {
		return authorId;
	}

	public void setAuthorId(int authorId) {
		this.authorId = authorId;
	}

	public int getResolverId() {
		return resolverId;
	}

	public void setResolverId(int resolverId) {
		this.resolverId = resolverId;
	}

	public int getStatusId() {
		return statusId;
	}

	public void setStatusId(int statusId) {
		this.statusId = statusId;
	}

	public int getTypeId() {
		return typeId;
	}

	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}

	
	@Override
	public String toString() {
		return "RequestNewReimbursment [reimbId=" + reimbId + ", reimbAmount=" + reimbAmount + ", submittedDate="
				+ submittedDate + ", resolvedDate=" + resolvedDate + ", description=" + description + ", receipt="
				+ receipt + ", authorId=" + authorId + ", resolverId=" + resolverId + ", statusId=" + statusId
				+ ", typeId=" + typeId + "]";
	}
	
	
	
	
	
	
	
	

}
