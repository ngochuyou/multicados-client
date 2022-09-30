// const USERNAME_REG = new RegExp("^[0-9A-Za-z\u00c0-\u00FF\u0100-\u0280.\\-_@#$'!*&']{8,}$");
// const PHONE_REG = RegExp("^[\\w\\d\\._\\(\\)\\+\\s\\-:]{4,}$");

export default class Account {
	constructor({
		username = "",
		password = "",
		rePassword = "",
		email = "",
		phone = "",
		firstName = "",
		lastName = "",
		photo = "",
		role = Account.Role.ANONYMOUS,
		gender = Account.Gender.UNKNOWN,
		birthDate = null,
		active = false,
		deactivatedDate = null,
		createdDate = null,
		updatedDate = null
	} = {}) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.phone = phone;
		this.firstName = firstName;
		this.lastName = lastName;
		this.fullname = `${firstName} ${lastName}`
		this.photo = photo;
		this.role = role;
		this.gender = gender;
		this.birthDate = birthDate;
		this.active = active;
		this.deactivatedDate = deactivatedDate;
		this.createdDate = createdDate;
		this.updatedDate = updatedDate;
	}

	static Role = {
		HEAD: 'HEAD',
		PERSONNEL: 'PERSONNEL',
		MANAGER: 'MANAGER',
		EMPLOYEE: 'EMPLOYEE',
		CUSTOMER: 'CUSTOMER',
		ANONYMOUS: 'ANONYMOUS'
	}

	static Gender = {
		FEMALE: 'FEMALE',
		MALE: 'MALE',
		UNKNOWN: 'UNKNOWN'
	}
}

export class Personnel extends Account {
	constructor(props) {
		super(props);

		const { createdBy = "" } = props;

		this.createdBy = createdBy;
	}
}