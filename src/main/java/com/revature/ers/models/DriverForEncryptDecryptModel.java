package com.revature.ers.models;

public class DriverForEncryptDecryptModel {

	public static void main(String[] args) {
		
		final String secretKey = "chaudhary@";
		
		String originalString = "password";
		String encryptedString = EncryptDecryptModel.encrypt(originalString, secretKey);
		String decryptString = EncryptDecryptModel.decrypt(encryptedString, secretKey);
		
		System.out.println(originalString);
		System.out.println(encryptedString);
		System.out.println(decryptString);
		
	}

}
