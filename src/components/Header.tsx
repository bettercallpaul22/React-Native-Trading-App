import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color } from "../../assets/misc/colors";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../services/features/userSlice";
import { User } from "../../model";
import { useState } from "react";
import Drawer from "./Drawer";

const { width } = Dimensions.get('window');

interface HeaderProps {
    title: string;
}
export const Header: React.FC<HeaderProps> = ({ title }) => {
    const [openDrawer, setopenDrawer] = useState(false)

    const user: any = useSelector(selectCurrentUser)

    return (
        <View style={styles.header}>
            <View style={{height:50, width:50}}></View>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity onPress={()=> {
                Drawer()
            }}>
            {/* <TouchableOpacity onPress={()=>setopenDrawer(!openDrawer)}> */}
                <Image
                    resizeMode="contain"
                    style={{ height: 40, width: 40, borderRadius:50 }}
                    source={require('../../assets/images/profile.png')}
                />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
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
