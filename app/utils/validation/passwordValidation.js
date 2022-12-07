export const validatePassword = password => {
	// 	1. This code is a regular expression that checks if a string has at least one uppercase letter, one lowercase letter,
	// one number, and one special character.
	// 2. It also checks if the string is at least 6 characters long.
	if (password.length > 0) {
		const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		return re.test(String(password).toLowerCase());
	}
};
