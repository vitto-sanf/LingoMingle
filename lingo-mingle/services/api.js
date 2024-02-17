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
  onSnapshot,
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
    if (!lastUserContacted || lastUserContacted.length === 0) {
      return []; 
    }
    console.log(lastUserContacted)
    const promises = lastUserContacted.sort((a,b)=>{
      return b.contactedAt.seconds - a.contactedAt.seconds
    }).map((doc) =>
      api.getUser(doc.id).then((data) => {
        data.uuid = doc.id;
        return data;
      })
    );

    const lastUserContactedArray = await Promise.all(promises);

    const res = lastUserContactedArray.length > 0 ? lastUserContactedArray : [];
    return res;
  },

  getLastFriendsContacted: async (lastFriendsContacted) => {
    if (!lastFriendsContacted || lastFriendsContacted.length === 0) {
      return []; 
    }
    console.log("Friends Contacted",lastFriendsContacted)
    const promises = lastFriendsContacted.sort((a,b)=>{
      return b.contactedAt.seconds - a.contactedAt.seconds
    }).map((doc) =>
      api.getUser(doc.id).then((data) => {
        data.uuid = doc.id;
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

  acceptFriendRequest: async (user, friendRequestUUID) => {
    console.log("USER",user)
    try {
      const data = {
        sender: friendRequestUUID,
        receiver: user.uuid,
        status: "pending",
      };

      const senderRef = doc(database, "user", friendRequestUUID);
      const receiverRef = doc(database, "user", user.uuid);

      const chatRef = await addDoc(collection(database, "chats"), {
        participant1: user.uuid,
        participant2: friendRequestUUID,
      });

      const chatId = chatRef.id;

      const SenderData = {
        id: user.uuid,
        chatId: chatId,
      };
      const SenderContactedList = {
        id :user.uuid,
        contactedAt: new Date()
      };

      const ReceiverData = {
        id: friendRequestUUID,
        chatId: chatId,
      };

      const ReceiverContactedList = {
        id :friendRequestUUID,
        contactedAt: new Date()
      };
      const ReceiverToRemove = user.last_user_contacted.find(friend => friend.id === friendRequestUUID);
      let SenderToRemove;
      const docSnap = await getDoc(senderRef);
      if (docSnap.exists()) {
         SenderToRemove= docSnap.data().last_user_contacted.find(friend => friend.id === user.uuid);;
      } else {
        console.log("User Not Found!");
      }
    
      console.log(SenderToRemove)
      await updateDoc(senderRef, {
        friends_request: arrayRemove(data),
        friends: arrayUnion(SenderData),
        last_friends_contacted: arrayUnion(SenderContactedList), 
        last_user_contacted: arrayRemove(SenderToRemove)
      });

      await updateDoc(receiverRef, {
        friends_request: arrayRemove(data),
        friends: arrayUnion(ReceiverData),
        last_friends_contacted: arrayUnion(ReceiverContactedList),
        last_user_contacted: arrayRemove( ReceiverToRemove)
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
      const querySnapshot = await getDocs(
        collection(database, `/chats/${chatId}/messages`)
      );
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
      console.log(error);
      return {
        message: "Error while Cancelling friend from the list",
      };
    }
  },

  editFriendContacted: async(user,friendId) =>{
    let add = true;
    user.last_friends_contacted.map((friend)=>{
      if (friend.id== friendId){ return  add = false} 
    })

    console.log(add)
    const docRef =  doc(database, "user", user.uuid)
    if (!add){
      const fieldPath = `last_friends_contacted.${friendId}`;
      await updateDoc(docRef,{
        [fieldPath] :{
          id : friendId,
          contactedAt : new Date(),
        }
      })
    }else{
      await updateDoc(docRef, {
        last_friends_contacted: arrayUnion({
          id : friendId,
          contactedAt : new Date(),
        })
      })
    }

  },

  sendMessage: async (chatId, msg, senderId) => {
    try {
      const messageRef = collection(
        database,
        `/chats/${chatId.replace(",", "")}/messages`
      );

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

  directCall: async (callerId, receiverId, roomId) => {
    try {
      const docRef = await addDoc(collection(database, "directCall"), {
        callerId: callerId,
        receiverId: receiverId,
        roomId: roomId,
        status: "pending",
      });
      return docRef;
    } catch (error) {
      console.log(error);
      return {
        message: "Error Calling friend",
      };
    }
  },
  rejectCall: async (callId) => {
    try {
      const docRef = doc(database, "directCall", callId);
      await updateDoc(docRef, {
        status: "Rejected",
      });
    } catch (error) {
      console.log(error);
      return {
        message: "Cannot reject the call",
      };
    }
  },
  acceptCall: async (callId) => {
    try {
      const docRef = doc(database, "directCall", callId);
      await updateDoc(docRef, {
        status: "Accepted",
      });
    } catch (error) {
      console.log(error);
      return {
        message: "Cannot accept the call",
      };
    }
  },

  getChatParticipant: async (chatId, userId) => {
    console.log("API", chatId);
    const chatRef = doc(database, "chats", chatId);
    const chatSnap = await getDoc(chatRef);
    console.log(chatId);
    console.log("SNAP", chatSnap);

    if (chatSnap.exists()) {
      for (const key in chatSnap.data()) {
        if (chatSnap.data()[key] !== userId) {
          try {
            let data = await api.getUser(chatSnap.data()[key]);
            data.uuid = chatSnap.data()[key];
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
      edited: true,
    };
    console.log("EDIT",chatId)
    try {
      const messageRef = doc(
        database,
        `/chats/${chatId.replace(",", "")}/messages`,
        messageId
      );
      await updateDoc(messageRef, data);
    } catch (error) {
      console.log(error)
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

  setGamesData: async (formData) => {
    try {
      const id = "uEG3p396G7MhQnE8eaKs";
      console.log("server Set", formData);
      const docRef = await setDoc(doc(database, "games", id), {
        ModalAdivinaVisible: formData.ModalAdivinaVisible,
        ModalCantenJuntosVisible: formData.ModalCantenJuntosVisible,
        ModalGameVisible: formData.ModalGameVisible,
        ModalNuevoTemaVisible: formData.ModalNuevoTemaVisible,
        playGame: formData.playGame,
        player1Answer: formData.player1Answer,
        answer: formData.answer,
      });
      return docRef;
    } catch (err) {
      console.log(err);
      return { message: "Error During edit Games Data!" };
    }
  },
};

export default api;
