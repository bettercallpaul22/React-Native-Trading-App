import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color } from "../../assets/misc/colors";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../services/features/userSlice";
import { User } from "../../model";
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from "@react-navigation/native";


interface HeaderProps {
    title: string;
}
export const ProfileHeader: React.FC<HeaderProps> = ({ title }) => {
    const navigator = useNavigation<any>()


    const user: User = useSelector(selectCurrentUser)

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigator.goBack()}>
            <Ionicons name="arrow-back-sharp" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={{height:50, width:50}}></View>

        </View>
    );
};

const styles = StyleSheet.create({

    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        elevation: 10,
        backgroundColor: color.NEW_BACKGROUND_COLOR,
        shadowColor: "#000",
        shadowOffset: { height: 10, width: 0 },
        height: 50,
        marginBottom: 20,
        borderRadius: 5,
        shadowOpacity: 1,
        shadowRadius: 20
    },
    headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16,  },


});
