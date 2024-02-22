# LINGOMIGLE

Project developed for the course "Human Computer Interaction" during the academic year 2023/24 at Politecnico di Torino.

1. [Getting Started](#getting-started)
2. [Database structure](#database-structure)
   - [`user`](#user)
   - [`invitation`](#invitation)
   - [`games`](#games)
   - [`directCall`](#directcall)
   - [`chats`](#chats)
   - [`messages`](#messages)
3. [Technologies](#technologies)
4. [Team members](#team-members)

## Getting Started

To run the application locally, follow these steps:

1. Install dependencies:

   ```bash
   cd LingoMingle\lingo-mingle
   npm install
   ```

2. Start the application:

   ```bash
   npm start
   ```

   This will launch the development server, and you can access the application through Expo by scanning the QR code with the Expo Go app on your mobile device. Alternatively, you can run the app on an emulator.

## Database structure

#### `user`

| Field                        | Type   | Array Elements                                      | Description                                |
| ---------------------------- | ------ | --------------------------------------------------- | ------------------------------------------ |
| friends                      | Array  | chatId (String), id (String)                        | List of user's friends                     |
| friends_request              | Array  | receiver (String), sender (String), status (String) | Sent or received friendship requests       |
| gender                       | String | -                                                   | User's gender                              |
| last_friends_contacted       | Array  | contactedAt (Timestamp), id (String)                | Recently contacted friends                 |
| last_user_contacted          | Array  | contactedAt (Timestamp), id (String)                | Recently contacted users                   |
| level                        | String | -                                                   | User's level                               |
| native_language              | String | -                                                   | User's native language                     |
| native_language_country_code | String | -                                                   | Country code of user's native language     |
| new_language                 | String | -                                                   | Language newly learned by the user         |
| new_language_country_code    | String | -                                                   | Country code of the newly learned language |
| username                     | String | -                                                   | User's username                            |

#### `invitation`

| Field     | Type      | Description                                          |
| --------- | --------- | ---------------------------------------------------- |
| place     | String    | Location of the invitation                           |
| receiver  | String    | Identifier of the receiving user                     |
| sender    | String    | Identifier of the sending user                       |
| status    | String    | Current status of the invitation (accepted, pending) |
| timestamp | Timestamp | Date and time when the invitation was created        |

#### `games`

| Field                    | Type    | Default Value | Description                           |
| ------------------------ | ------- | ------------- | ------------------------------------- |
| ModalAdivinaVisible      | Boolean | False         | Visibility of the Adivina modal       |
| ModalCantenJuntosVisible | Boolean | False         | Visibility of the Canten Juntos modal |
| ModalGameVisible         | Boolean | False         | Visibility of the Game modal          |
| ModalNuevoTemaVisible    | Boolean | False         | Visibility of the Nuevo Tema modal    |
| answer                   | String  | -             | Answer associated with the game       |
| playGame                 | Boolean | False         | Game state                            |
| player1Answer            | Boolean | False         | Player 1's answer                     |

#### `directCall`

| Field      | Type   | Description                                               |
| ---------- | ------ | --------------------------------------------------------- |
| callerId   | String | Unique identifier of the caller                           |
| receiverId | String | Unique identifier of the receiver                         |
| roomId     | Number | Numeric identifier of the room                            |
| status     | String | Current status of the call (e.g., "Accepted", "Rejected") |

#### `chats`

| Field        | Type       | Description                                        |
| ------------ | ---------- | -------------------------------------------------- |
| participant1 | String     | Identifier of the first participant in the chat    |
| participant2 | String     | Identifier of the second participant in the chat   |
| messages     | Collection | Collection of messages within the `chats` document |

Within the `chats` document, there is a collection of messages (`messages`) with the following structure:

#### `messages`

| Field          | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| createdAt      | Timestamp | Date and time of message creation |
| message        | String    | Content of the message            |
| sender         | String    | Identifier of the message sender  |
| senderUsername | String    | Username of the message sender    |

## Technologies

```json
"dependencies": {
    "@config-plugins/react-native-webrtc": "^7.0.0",
    "@gorhom/bottom-sheet": "^4.5.1",
    "@hookform/resolvers": "^3.3.3",
    "@notifee/react-native": "^7.8.2",
    "@react-native-community/datetimepicker": "7.2.0",
    "@react-native-community/netinfo": "9.3.10",
    "@react-native-picker/picker": "2.4.10",
    "@stream-io/react-native-webrtc": "^118.0.1",
    "@stream-io/video-react-native-sdk": "^0.3.18",
    "axios": "^1.6.2",
    "dotenv": "^16.3.1",
    "expo": "~49.0.15",
    "expo-av": "~13.4.1",
    "expo-clipboard": "~4.3.1",
    "expo-constants": "~14.4.2",
    "expo-dev-client": "~2.4.13",
    "expo-document-picker": "~11.5.4",
    "expo-file-system": "~15.4.5",
    "expo-font": "~11.4.0",
    "expo-haptics": "~12.4.0",
    "expo-image-manipulator": "~11.3.0",
    "expo-image-picker": "~14.3.2",
    "expo-linking": "~5.0.2",
    "expo-media-library": "~15.4.1",
    "expo-router": "^2.0.0",
    "expo-secure-store": "~12.3.1",
    "expo-sharing": "~11.5.0",
    "expo-splash-screen": "~0.20.5",
    "expo-status-bar": "~1.6.0",
    "firebase": "^10.7.1",
    "install": "^0.13.0",
    "moment": "^2.29.4",
    "npm": "^10.2.5",
    "react": "18.2.0",
    "react-hook-form": "^7.49.2",
    "react-native": "0.72.6",
    "react-native-country-flag": "^2.0.2",
    "react-native-gesture-handler": "~2.12.0",
    "react-native-incall-manager": "^4.1.0",
    "react-native-loading-spinner-overlay": "^3.0.1",
    "react-native-reanimated": "~3.3.0",
    "react-native-safe-area-context": "4.6.3",
    "react-native-screens": "~3.22.0",
    "react-native-svg": "13.9.0",
    "react-native-swiper": "^1.6.0-rc.3",
    "react-native-toast-message": "^2.2.0",
    "react-native-vector-icons": "^10.0.3",
    "stream-chat-expo": "^5.24.0",
    "stream-chat-react-native": "^5.24.0",
    "yup": "^1.3.3"
  }
```

## Team members

- Vittorio Sanfilippo s317408
- Marianna Francesca Amalfi s317407
- Salvatore Cavallaro s317842
- Luca Tamburo s303907
