export const numberValidation = age => {
	if (age.length > 0) {
		let isnum = !/^\d+$/.test(age);
		return isnum;
	}
};
