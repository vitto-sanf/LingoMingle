// Imports
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { database } from "../config/firebase";

const api = {
  getUser: async (userId) => {
    const docRef = doc(database, "user", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("User Not Found!");
    }
  },

  getLastUserContacted: async (lastUserContacted) => {
    const promises = lastUserContacted.map((doc) =>
      api.getUser(doc).then((data) => {
        data.uuid = doc;
        return data;
      })
    );

    const lastUserContactedArray = await Promise.all(promises);

    const res = lastUserContactedArray.length > 0 ? lastUserContactedArray : [];
    return res;
  },

  getLastFriendsContacted: async (lastFriendsContacted) => {
    const promises = lastFriendsContacted.map((doc) =>
      api.getUser(doc).then((data) => {
        data.uuid = doc;
        return data;
      })
    );

    const lastFriendsContactedArray = await Promise.all(promises);
    const res =
      lastFriendsContactedArray.length > 0 ? lastFriendsContactedArray : [];
    return res;
  },

  getFriends: async (friends) => {
    friendsId = friends.map((e) => e.id);
    const promises = friendsId.map((doc) =>
      api.getUser(doc).then((data) => {
        data.uuid = doc;
        return data;
      })
    );

    const friendsArray = await Promise.all(promises);

    const res = friendsArray.length > 0 ? friendsArray : [];
    return res;
  },

  getFriendsRequest: async (friendsRequest, myUUID) => {
    const filteredFriendRequests = friendsRequest.filter(
      (request) => request.receiver === myUUID
    );

    const promises = filteredFriendRequests.map((doc) =>
      api.getUser(doc.sender).then((data) => {
        data.uuid = doc.sender;
        data.status = doc.status;
        return data;
      })
    );

    const lastFriendsRequestedArray = await Promise.all(promises);

    const res =
      lastFriendsRequestedArray.length > 0 ? lastFriendsRequestedArray : [];
    return res;
  },

  sendFriendRequest: async (myUUID, friendRequestUUID) => {
    try {
      const data = {
        sender: myUUID,
        receiver: friendRequestUUID,
        status: "pending",
      };

      const senderRef = doc(database, "user", myUUID);
      const receiverRef = doc(database, "user", friendRequestUUID);

      await updateDoc(senderRef, {
        friends_request: arrayUnion(data),
      });

      await updateDoc(receiverRef, {
        friends_request: arrayUnion(data),
      });

      return {
        message: "Successfully submitted friend request",
      };
    } catch (error) {
      return {
        message: "Error while sending friend request",
      };
    }
  },

  cancelFriendRequest: async (myUUID, friendRequestUUID) => {
    try {
      const data = {
        sender: myUUID,
        receiver: friendRequestUUID,
        status: "pending",
      };

      const senderRef = doc(database, "user", myUUID);
      const receiverRef = doc(database, "user", friendRequestUUID);

      await updateDoc(senderRef, {
        friends_request: arrayRemove(data),
      });

      await updateDoc(receiverRef, {
        friends_request: arrayRemove(data),
      });

      return {
        message: "Successfully removed friend request",
      };
    } catch (error) {
      return {
        message: "Error while sending friend request",
      };
    }
  },

  acceptFriendRequest: async (myUUID, friendRequestUUID) => {
    try {
      const data = {
        sender: friendRequestUUID,
        receiver: myUUID,
        status: "pending",
      };

      const senderRef = doc(database, "user", friendRequestUUID);
      const receiverRef = doc(database, "user", myUUID);

      const chatRef = await addDoc(collection(database, "chats"), {
        participant1: myUUID,
        participant2: friendRequestUUID,
      });

      const chatId = chatRef.id;

      const SenderData = {
        id: myUUID,
        chatId: chatId,
      };

      const ReceiverData = {
        id: friendRequestUUID,
        chatId: chatId,
      };

      await updateDoc(senderRef, {
        friends_request: arrayRemove(data),
        friends: arrayUnion(SenderData),
      });

      await updateDoc(receiverRef, {
        friends_request: arrayRemove(data),
        friends: arrayUnion(ReceiverData),
      });

      return {
        message: "User added to your friend list",
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Error while adding friend request",
      };
    }
  },

  rejectFriendRequest: async (myUUID, friendRequestUUID) => {
    try {
      const data = {
        sender: friendRequestUUID,
        receiver: myUUID,
        status: "pending",
      };

      const senderRef = doc(database, "user", friendRequestUUID);
      const receiverRef = doc(database, "user", myUUID);

      await updateDoc(senderRef, {
        friends_request: arrayRemove(data),
      });

      await updateDoc(receiverRef, {
        friends_request: arrayRemove(data),
      });

      return {
        message: "Friend request rejected correctly",
      };
    } catch (error) {
      return {
        message: "Error while rejecting friend request",
      };
    }
  },

  cancelFriend: async (myUUID, friendUUID, chatId) => {
    try {
      const firstData = {
        chatId: chatId,
        id: friendUUID,
      };

      const secondData = {
        chatId: chatId,
        id: myUUID,
      };
      const firstUserRef = doc(database, "user", myUUID);
      const secondUserRef = doc(database, "user", friendUUID);

      await deleteDoc(doc(database, "chats", chatId));

      await updateDoc(firstUserRef, {
        friends: arrayRemove(firstData),
      });

      await updateDoc(secondUserRef, {
        friends: arrayRemove(secondData),
      });

      return {
        message: "Friend cancelled from the list correctly",
      };
    } catch (error) {
      return {
        message: "Error while Cancelling friend from the list",
      };
    }
  },

  sendMessage: async (chatId, msg, senderId) => {
    try {
      const messageRef = collection(database, `/chats/${chatId}/messages`);

      data = {
        sender: senderId,
        message: msg,
        createdAt: serverTimestamp(),
      };

      await addDoc(messageRef, data);

    } catch (error) {
      return {
        message: "Error sending the message",
      };
    }
  },
};

export default api;
