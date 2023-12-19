// Imports
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
      api.getUser(doc._key.path.segments[6]).then((data) => {
        data.uuid = doc._key.path.segments[6];
        return data;
      })
    );

    const lastUserContactedArray = await Promise.all(promises);

    const res = lastUserContactedArray.length > 0 ? lastUserContactedArray : [];
    return res;
  },

  getLastFriendsContacted: async (lastFriendsContacted) => {
    const promises = lastFriendsContacted.map((doc) =>
      api.getUser(doc._key.path.segments[6]).then((data) => {
        data.uuid = doc._key.path.segments[6];
        return data;
      })
    );

    const lastFriendsContactedArray = await Promise.all(promises);

    const res =
      lastFriendsContactedArray.length > 0 ? lastFriendsContactedArray : [];
    return res;
  },

  getFriendsRequest: async (friendsRequest) => {
    const promises = friendsRequest.map((doc) =>
      api.getUser(doc._key.path.segments[6]).then((data) => {
        data.uuid = doc._key.path.segments[6];
        return data;
      })
    );

    const lastFriendsRequestdArray = await Promise.all(promises);

    const res =
      lastFriendsRequestdArray.length > 0 ? lastFriendsRequestdArray : [];
    return res;
  },

  addFriend: async (myUUID, newFriendUUID) => {
    try {
      const userRef = doc(database, "user", myUUID);
      const newFriendUUIDReferences = doc(database, `/user/` + newFriendUUID);

      await updateDoc(userRef, {
        friends: arrayUnion(newFriendUUIDReferences),
      });
      await updateDoc(userRef, {
        friends_request: arrayRemove(newFriendUUIDReferences),
      });

      return {
        message: "User added to your friend list",
      };
    } catch (error) {
      return {
        message: "Error while adding friend",
      };
    }
  },
};

export default api;
