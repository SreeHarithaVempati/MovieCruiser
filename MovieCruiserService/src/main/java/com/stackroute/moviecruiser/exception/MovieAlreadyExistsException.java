package com.stackroute.moviecruiser.exception;

@SuppressWarnings("serial")
public class MovieAlreadyExistsException extends Exception{
	
	String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public MovieAlreadyExistsException(final String message) {
		super(message);
		this.message = message;
	}

	@Override
	public String toString() {
		return "MovieAlreadyExistsException [message=" + message + "]";
	}
	
	

}
