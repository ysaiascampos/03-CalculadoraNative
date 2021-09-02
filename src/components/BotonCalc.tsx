import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/appTheme'

interface Props {
    texto: string;
    color?: string;
    ancho?: boolean;
    accion: ( numeroTexto: string ) => void;
}

export const BotonCalc = ({  texto, color, ancho = false, accion }:Props) => {

    return (
        <TouchableOpacity
            onPress={ () => accion( texto ) }
        >
            <View style={{
                    ...styles.boton,
                    backgroundColor:color??styles.boton.backgroundColor,
                    width: ( ancho ) ? 180 : 80
                }}>
                <Text style={styles.botonText}>{texto}</Text>
            </View>
        </TouchableOpacity>        
    )
}
