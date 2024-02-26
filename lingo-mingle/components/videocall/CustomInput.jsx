// Imports
import { View, StyleSheet, Pressable, Keyboard } from "react-native";
import { AutoCompleteInput, useMessageInputContext } from "stream-chat-expo";

// Styles
import FAIcon from "react-native-vector-icons/FontAwesome";
import { COLOR } from "../../constants";

const CustomInput = () => {
  const { sendMessage, text } = useMessageInputContext();

  return (
    <View style={[styles.container]}>
      <View style={styles.inputContainer}>
        <AutoCompleteInput />
      </View>
      <Pressable onPress={sendMessage} disabled={!text}>
        <FAIcon
          name="send"
          size={24}
          color={text ? COLOR.primary : COLOR.gray}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 120,
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    borderColor: COLOR.gray,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 5,
  },
});
