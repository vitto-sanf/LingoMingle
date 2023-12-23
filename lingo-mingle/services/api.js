// Imports
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs 
} from "firebase/firestore";
import { database } from "../config/firebase";
import moment from 'moment';
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

      await updateDoc(senderRef, {
        friends_request: arrayRemove(data),
        friends: arrayUnion(myUUID),
      });

      await updateDoc(receiverRef, {
        friends_request: arrayRemove(data),
        friends: arrayUnion(friendRequestUUID),
      });

      return {
        message: "User added to your friend list",
      };
    } catch (error) {
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

  //TODO: differentiate between accepted and pending
  getInvitation: async (myUUID) => {
    const q = query(
      collection(database, "invitation"),
      where("receiver", "==", myUUID)
    );
  
    let Invitations = [];
    const querySnapshot = await getDocs(q);
  
    const senderDocumentIds = querySnapshot.docs.map(doc => doc.data().sender);
  
    const userDocsPromises = senderDocumentIds.map(async (senderId) => {
      const userDocRef = doc(database, `user/${senderId}`);
      const userDocSnapshot = await getDoc(userDocRef);
      return { id: userDocSnapshot.id, data: userDocSnapshot.data() };
    });
  
    const userDocs = await Promise.all(userDocsPromises);
  
    const userMap = {};
  
    userDocs.forEach(userDoc => {
      if (userDoc.data) {
        const username = userDoc.data.username;
        const userId = userDoc.id;
        userMap[userId] = username;
      }
    });
  
    querySnapshot.forEach((doc) => {
      const senderUserId = doc.data().sender;
      let inv = {
        uiid: doc.id,
        timestamp: moment(doc.data().timestamp.toDate()).format("MMM DD YYYY"),
        place: doc.data().place,
        sender: senderUserId,
        username: userMap[senderUserId] 
      };
      Invitations = [...Invitations, inv];
    });
  
    console.log(Invitations);
    return Invitations;
  },
};

export default api;
