import { Dimensions, StyleSheet, Text, View } from "react-native";
import { color } from "../../assets/misc/colors";

const { width } = Dimensions.get('window');

interface HeaderProps{
    title:string;
}
export const Header:React.FC<HeaderProps> = ({title}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
   
    header: {
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        elevation: 10,
        backgroundColor: color.NEW_BACKGROUND_COLOR,
        shadowColor:"#000",
        shadowOffset:{height:10, width:0 },
        height: 50,
        marginBottom: 20,
        borderRadius: 5,
        shadowOpacity:1,
        shadowRadius:20
    },
    headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16 },
   
 
});
