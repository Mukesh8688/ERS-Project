package com.revature.ers.dao.dbutil;

public class ERSDbQueries {
	
	public static final String GET_ALL_REIMB_VIEW = "SELECT er.reimb_id as id, er.reimb_amount as amount, er.reimb_submitted as submittedDate, \n"
			+ "er.reimb_resolved as resolvedDate, ers.reimb_status as status, ert.reimb_type as type\n"
			+ "FROM ers_reimbursement er , ers_reimbursement_status ers ,ers_reimbursement_type ert \n"
			+ "WHERE er.reimb_status_id  = ers.reimb_status_id\n"
			+ "and er.reimb_type_id = ert.reimb_type_id \n"
			+ "and er.reimb_author = ? ; ";


	public static final String GET_USER_ID = "SELECT ers_users_id as id FROM ers_users  WHERE ers_username = ? ; ";


	public static final String INSERT_NEW_REIMB_REQUEST = "INSERT INTO ers_reimbursement\n"
			+ "(reimb_id, reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_receipt, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id)\n"
			+ " VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";


	public static final String GET_ALL_REIMB_VIEW_FOR_MANAGER = "SELECT er.reimb_id as id, er.reimb_amount as amount, er.reimb_submitted as submittedDate, \n"
			+ "er.reimb_resolved as resolvedDate, ers.reimb_status as status, ert.reimb_type as type\n"
			+ "FROM ers_reimbursement er , ers_reimbursement_status ers ,ers_reimbursement_type ert \n"
			+ "WHERE er.reimb_status_id  = ers.reimb_status_id\n"
			+ "and er.reimb_type_id = ert.reimb_type_id order by status desc ; ";


	public static final String UPDATE_REIMB = " UPDATE ers_reimbursement SET reimb_status_id= ?, reimb_resolved = ?, reimb_resolver = ?  WHERE reimb_id= ?; ";


	public static final String GET_ALL_REIMB_VIEW_BYSTATUS = "SELECT er.reimb_id as id, er.reimb_amount as amount, er.reimb_submitted as submittedDate, \n"
			+ "er.reimb_resolved as resolvedDate, ers.reimb_status as status, ert.reimb_type as type\n"
			+ "FROM ers_reimbursement er , ers_reimbursement_status ers ,ers_reimbursement_type ert \n"
			+ "WHERE er.reimb_status_id  = ers.reimb_status_id\n"
			+ "and er.reimb_type_id = ert.reimb_type_id \n"
			+ "and er.reimb_status_id = ? ; ";


	public static final String GET_MAX_REIMB_TICKETNO = "select max(reimb_id) as maxId from ers_reimbursement;";


	public static final String SECRETKEY = "chaudhary@";

	
	
	public static String  USER_PROFILE = "SELECT ers_users_id, ers_first_name, ers_last_name, user_email, user_role_id FROM ers_users "
			     + " WHERE ers_username = ? and ers_password = ? ; ";

}
