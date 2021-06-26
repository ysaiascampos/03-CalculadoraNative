import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../theme/appTheme'

interface Props {
    texto: string;
    color?: string;
}

export const BotonCalc = ({  texto, color }:Props) => {

    return (
        <View style={{
                ...styles.boton,
                backgroundColor:color??styles.boton.backgroundColor,
            }}>
            <Text style={styles.botonText}>{texto}</Text>
        </View>
    )
}
