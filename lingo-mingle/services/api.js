// Imports
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  setDoc,
  onSnapshot
} from "firebase/firestore";
import { database } from "../config/firebase";
import moment from "moment";
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
  getAllUsers: async () => {
    const querySnapshot = await getDocs(collection(database, "user"));
    let users = [];
    console.log(querySnapshot.docs.map((doc) => doc.data()));
    querySnapshot.forEach((doc) => {
      let user = {
        uuid: doc.id,
        username: doc.data().username,
      };
      users.push(user);
      console.log(doc.id, " => ", doc.data().username);
    });
    return users; //snapshot.docs.map(doc => doc.data());
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
    let friendsId = friends.map((e) => e.id);
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

     

      const querySnapshot = await getDocs( collection(database, `/chats/${chatId}/messages`));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      
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
      console.log(error)
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

  getChatParticipant: async (chatId, userId) => {
 
    const chatRef = doc(database, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    if (chatSnap.exists()) {
      
      for (const key in chatSnap.data()) {
        if (chatSnap.data()[key] !== userId) {
          try {
            const data = await api.getUser(chatSnap.data()[key]);
            return data; // Restituisce direttamente l'oggetto ottenuto dall'API
          } catch (error) {
            return { message: "Participant Information not Found " };
          }
        }
      }
    } else {
      console.log("Chat Not Found!");
      return null; // o un valore di default in base alle tue esigenze
    }
  },
  editMessage: async (message, chatId) => {
    const messageId = message.id;

    const data = {
      createdAt: message.createdAt,
      message: message.message,
      sender: message.sender,
      edited:true, 
    };
    try {
      const messageRef = doc(database, `/chats/${chatId}/messages`, messageId);
      await updateDoc(messageRef, data);
    } catch (error) {
      return {
        message: "Error editing the message",
      };
    }
  },
  getInvitation: async (myUUID, type) => {
    let q;

    if (type === "pending") {
      q = query(
        collection(database, "invitation"),
        where("receiver", "==", myUUID),
        where("status", "==", "pending")
      );
    } else {
      q = query(
        collection(database, "invitation"),
        where("receiver", "==", myUUID),
        where("status", "==", "accepted")
      );
    }

    let Invitations = [];
    const querySnapshot = await getDocs(q);

    const senderDocumentIds = querySnapshot.docs.map(
      (doc) => doc.data().sender
    );

    const userDocsPromises = senderDocumentIds.map(async (senderId) => {
      const userDocRef = doc(database, `user/${senderId}`);
      const userDocSnapshot = await getDoc(userDocRef);
      return { id: userDocSnapshot.id, data: userDocSnapshot.data() };
    });

    const userDocs = await Promise.all(userDocsPromises);

    const userMap = {};

    userDocs.forEach((userDoc) => {
      if (userDoc.data) {
        const username = userDoc.data.username;
        const userId = userDoc.id;
        userMap[userId] = username;
      }
    });

    querySnapshot.forEach((doc) => {
      const senderUserId = doc.data().sender;
      let inv = {
        uuid: doc.id,
        timestamp: moment(doc.data().timestamp.toDate()).format(
          "MMM DD YYYY hh:mm a"
        ),
        nonFormattedTimestamp: doc.data().timestamp.toDate(),
        place: doc.data().place,
        sender: senderUserId,
        username: userMap[senderUserId],
      };
      Invitations = [...Invitations, inv];
    });

    return Invitations;
  },
  acceptInvitation: async (inviationUUID) => {
    try {
      const invitationRef = doc(database, "invitation", inviationUUID);

      await updateDoc(invitationRef, {
        status: "accepted",
      });

      return {
        message: "Invitation accepted",
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Error accept invitation",
      };
    }
  },
  cancelInvitation: async (invitationUUID) => {
    try {
      await deleteDoc(doc(database, "invitation", invitationUUID));
    } catch (error) {
      console.log(error);
    }
  },
  addInvitation: async (formData) => {
    try {
      const docRef = addDoc(collection(database, "invitation"), formData);
      return docRef;
    } catch (err) {
      console.log(err);
      return { message: "Error During invitation sent!" };
    }
  },
  editInvitation: async (formData) => {
    try {
      const docRef = await setDoc(doc(database, "invitation", formData.uuid), {
        receiver: formData.receiver,
        sender: formData.sender,
        place: formData.place,
        timestamp: formData.timestamp,
        status: formData.status,
      });
      return docRef;
    } catch (err) {
      console.log(err);
      return { message: "Error During edit invitation!" };
    }
  },

  /*getGamesData: async()=>{
    const ref = collection(database,'games')
    try{
      onSnapshot(ref,(snapshot)=>{
        let data = []
        snapshot.docs.forEach((doc)=>{
          data.push({...doc.data(), id: doc.id})
        })

        console.log("server",data);
        return data;
      })

    }
    catch(err)
    {
      console.log(err);
      return { message: "Error During retriving games data!" };
    }
  },*/

  setGamesData : async (formData) => {
    try {
      console.log("server Set",formData[0]);
      const docRef = await setDoc(doc(database, "games", formData[0].id), {
        ModalAdivinaVisible: formData[0].ModalAdivinaVisible,
        ModalCantenJuntosVisible: formData[0].ModalCantenJuntosVisible,
        ModalGameVisible: formData[0].ModalGameVisible,
        player1Answer: formData[0].player1Answer,
        player2Answer: formData[0].player2Answer,
      });
      return docRef;
    } catch (err) {
      console.log(err);
      return { message: "Error During edit Games Data!" };
    }
  }
};

export default api;
