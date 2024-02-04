export const getConversationId = (user, users) => {
    return users[0]._id===user._id ? users[1]._id : users[0]._id;
}

export const getRelevantPic = (convo, user) => {
    if (convo.isGroup === false) {
        const receiverId = convo.users.find(x => x._id !== user._id);
        return receiverId.picture;
    } else {
        return convo.picture;
    }
}

export const getRelevantName = (user, users) => {
    return users[0]._id===user._id ? users[1].name : users[0].name;
}

export const checkOnlineStatus = (onlineUsers, user,users) => {
    let convoId = getConversationId(user, users);
    let check = onlineUsers.find((u) => u.userId === convoId);
    return check ? 'true' : 'false';
}