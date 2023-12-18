// Imports
import {StyleSheet} from "react-native";

// Constants
import {FONT} from "../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    text: {
        fontFamily: FONT.bold,
        fontSize: 26,
        marginLeft: 15,
    },
});

export default styles;
