// Imports
import axios from "axios";
import Constants from "expo-constants";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { database } from "../config/firebase";
let newusers= [];
const api = {
  getUser: async (userId) => {
    const docRef = doc(database, "user", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  },
  getLastUserContacted: async (lastUserContacted) => {
    lastUserContacted.forEach((doc) => {
      api.getUser(doc._key.path.segments[6])
      .then(
        (data)=>{
          data.uuid=doc._key.path.segments[6];
          newusers=[...newusers,data];
        }) 
    });
    if (newusers.length>0)
    {
      //console.log(newusers);
      return newusers;  
    }
  },
};


/*
const BASE_URL = "https://firestore.googleapis.com/v1/";
const PROJECT_ID = Constants.expoConfig.extra.projectId;

const SERVER_URL =
  BASE_URL + "projects/" + PROJECT_ID + "/databases/(default)/documents/";

const api = {
  getUser: (userId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + `user/${userId}`)
        .then((res) => resolve(res.data))
        .catch((err) =>
          reject({
            data: err.response.data.error.message,
            status: err.response.status,
          })
        );
    });
  },

  getUserField: (userId) => {
    return new Promise((resolve, reject) => {
      api
        .getUser(userId)
        .then((res) => {
          const userData = res.fields;

          const friendsRequestInfos = userData.friends_request
            ? userData.friends_request.arrayValue.values.map(
                (value) => value.referenceValue
              )
            : [];

          const lastFriendsContactedInfos = userData.last_friends_contacted
            ? userData.last_friends_contacted.arrayValue.values.map(
                (value) => value.referenceValue
              )
            : [];

          const lastUserContactedInfos = userData.last_user_contacted
            ? userData.last_user_contacted.arrayValue.values.map(
                (value) => value.referenceValue
              )
            : [];

          const friendsRequestPromises = friendsRequestInfos.map(
            (friendsRequestInfo) => {
              return axios.get(BASE_URL + `${friendsRequestInfo}`);
            }
          );

          const lastFriendsContactedPromises = lastFriendsContactedInfos.map(
            (lastFriendsContactedInfo) => {
              return axios.get(BASE_URL + `${lastFriendsContactedInfo}`);
            }
          );

          const lastUserContactedPromises = lastUserContactedInfos.map(
            (lastUserContactedInfo) => {
              return axios.get(BASE_URL + `${lastUserContactedInfo}`);
            }
          );

          Promise.all(friendsRequestPromises)
            .then((friendsRequestResponses) => {
              const friendsRequestData = friendsRequestResponses.map(
                (response) => response.data.fields
              );

              Promise.all(lastFriendsContactedPromises)
                .then((lastFriendsContactedResponses) => {
                  const lastFriendsContactedData =
                    lastFriendsContactedResponses.map(
                      (response) => response.data.fields
                    );

                  Promise.all(lastUserContactedPromises)
                    .then((lastUserContactedResponses) => {
                      const lastUserContactedData =
                        lastUserContactedResponses.map(
                          (response) => response.data.fields
                        );

                      resolve({
                        friendsRequestInfos: friendsRequestData,
                        lastFriendsContactedInfos: lastFriendsContactedData,
                        lastUserContactedInfos: lastUserContactedData,
                      });
                    })
                    .catch((error) => reject(error));
                })
                .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
        })
        .catch((err) => {
          reject({
            data: err.response.data.error.message,
            status: err.response.status,
          });
        });
    });
  },
};*/

export default api;
