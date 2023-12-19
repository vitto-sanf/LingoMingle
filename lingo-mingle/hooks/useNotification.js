// Imports
import Toast from "react-native-toast-message";

const useNotification = () => {
    const showToast = (message, type = "success", duration = 2000) => {
        Toast.show({
            type,
            text1: message,
            visibilityTime: duration,
        });
    };

    const notify = {
        success: (message, duration) => showToast(message, "success", duration),
        error: (message, duration) => showToast(message, "error", duration),
    };

    return notify;
};

export default useNotification;
