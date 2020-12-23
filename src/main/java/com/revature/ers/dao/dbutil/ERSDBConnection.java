package com.revature.ers.dao.dbutil;


import java.lang.ClassNotFoundException;
import java.sql.SQLException;

import java.sql.Connection;
import java.sql.DriverManager;


public class ERSDBConnection {
	
	private static Connection connection;
	
	// private empty construction 
	// not allow to intialize object to outside
	
	
	private ERSDBConnection() {
		
	}
	
	
	public static Connection getConnection() throws ClassNotFoundException,SQLException{
		
		// Register Driver
		
		Class.forName(ERSDbUtilProperties.DRIVER);
		
		// Using getConnection static method of DriverManager Class
		
		connection = DriverManager.getConnection(ERSDbUtilProperties.URL, ERSDbUtilProperties.USERNAME, ERSDbUtilProperties.PASSWORD);
		
		System.out.println("Connection is Successfull!!");
		
		return connection;
		
		
	}
	

}
