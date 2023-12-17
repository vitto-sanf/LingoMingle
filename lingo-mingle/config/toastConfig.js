// Imports
import { ErrorToast, SuccessToast } from "react-native-toast-message";

// Styles
import { COLOR } from "../constants/index";

const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      style={{
        backgroundColor: COLOR.green,
        borderLeftColor: COLOR.green,
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: COLOR.red,
        borderLeftColor: COLOR.red,
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
};

export default toastConfig;
