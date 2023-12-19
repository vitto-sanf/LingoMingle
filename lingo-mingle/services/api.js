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

    const lastFriendsRequestedArray = await Promise.all(promises);

    const res =
      lastFriendsRequestedArray.length > 0 ? lastFriendsRequestedArray : [];
    return res;
  },

  // TODO: Fix
  sendFriendRequest: async (myUUID, friendRequestUUID) => {
    try {
      const userRef = doc(database, "user", myUUID);
      const friendRequestUUIDReferences = doc(
        database,
        `/user/` + friendRequestUUID
      );

      await updateDoc(userRef, {
        friends_request: arrayUnion(friendRequestUUIDReferences),
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

  // TODO: Fix
  cancelFriendRequest: async (myUUID, friendRequestUUID) => {
    try {
      const userRef = doc(database, "user", myUUID);
      const friendRequestUUIDReferences = doc(
        database,
        `/user/` + friendRequestUUID
      );

      await updateDoc(userRef, {
        friends_request: arrayRemove(friendRequestUUIDReferences),
      });

      return {
        message: "Friend request successfully cancelled",
      };
    } catch (error) {
      return {
        message: "Error while deletion friend request",
      };
    }
  },

  acceptFriendRequest: async (myUUID, friendRequestUUID) => {
    try {
      const userRef = doc(database, "user", myUUID);
      const friendRequestUUIDReferences = doc(
        database,
        `/user/` + friendRequestUUID
      );

      await updateDoc(userRef, {
        friends: arrayUnion(friendRequestUUIDReferences),
      });
      await updateDoc(userRef, {
        friends_request: arrayRemove(friendRequestUUIDReferences),
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
      const userRef = doc(database, "user", myUUID);
      const friendRequestUUIDReferences = doc(
        database,
        `/user/` + friendRequestUUID
      );

      await updateDoc(userRef, {
        friends_request: arrayRemove(friendRequestUUIDReferences),
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
};

export default api;
