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

export const getRelevantName = (convo ,user) => {
    if (convo.isGroup === false) {
        const receiverId = convo.users.find(x => x._id !== user._id);
        return receiverId.name;
     } else {
        return convo.name;
     }
}