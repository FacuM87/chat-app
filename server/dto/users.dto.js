export default class UserDTO {
	constructor(user) {
		this.userId = user?._id ?? "";
		this.name = user?.name ?? "";
		this.surname = user?.surname ?? "";
		this.nickname = user?.nickname ?? "";
		this.gender = user?.gender ?? "";
        this.email = user?.email ?? "";
        this.profilePic = user?.profilePic ?? "";
	}
}

