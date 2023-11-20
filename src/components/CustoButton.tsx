import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

interface ButtonProps {
    title: string;
    color: string;
    disabled?: boolean;
    onPress:()=>void;
}

const CustoButton: React.FC<ButtonProps> = ({ title, color, onPress, disabled }) => {
    return (
        <View style={{ width: '100%', justifyContent: 'center' }}>
            <Button
                title={title}
                color={color}
                onPress={onPress}
                disabled={disabled}
                
            />
        </View>
    )
}

export default CustoButton

const styles = StyleSheet.create({})