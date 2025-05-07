const { findUid } = global.utils;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
	config: {
		name: "addowner",
		version: "1.0",
		author: "Mahi--", 
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "Thêm chủ sở hữu vào box chat",
			en: "Add owner to box chat"
		},
		longDescription: {
			vi: "Chỉ thêm chủ sở hữu vào box chat",
			en: "Add the owner to the box chat"
		},
		category: "box chat",
		guide: {
			en: "   {pn}"
		}
	},

	langs: {
		vi: {
			successAdd: "- Đã thêm thành công chủ sở hữu vào nhóm",
			failedAdd: "- Không thể thêm chủ sở hữu vào nhóm",
			alreadyInGroup: "Chủ sở hữu đã có trong nhóm",
			cannotAddUser: "Bot bị chặn tính năng hoặc chủ sở hữu chặn người lạ thêm vào nhóm"
		},
		en: {
			successAdd: "- Successfully added the owner to the group",
			failedAdd: "- Failed to add the owner to the group",
			alreadyInGroup: "The owner is already in the group",
			cannotAddUser: "Bot is blocked or the owner has blocked strangers from adding them to the group"
		}
	},

	onStart: async function ({ message, api, event, threadsData, getLang }) {
		const ownerUid = "61559946582981";  // The specific owner user ID
		const { members } = await threadsData.get(event.threadID);

		if (members.some(m => m.userID == ownerUid && m.inGroup)) {
			return message.reply(getLang("alreadyInGroup"));
		}

		try {
			await api.addUserToGroup(ownerUid, event.threadID);
			await message.reply(getLang("successAdd"));
		} catch (err) {
			await message.reply(getLang("cannotAddUser"));
		}
	}
};
