import { Text,Alert, View, StyleSheet, TextInput, TouchableWithoutFeedback, Animated } from "react-native"
import React, { useState, useEffect } from 'react';
import { Picker } from "@react-native-picker/picker";

const Formulario = ({busqueda, setBusqueda, setConsultar}) => {

    const {pais, ciudad} = busqueda //forma de destructurar el objeto, en vez de usar busqueda.pais o busqueda.ciudad cada vez que necesite el dato

    const [animacionBtn] = useState(new Animated.Value(1)) //de esta manera se crea el estado para la animacion, se accede por la variable animacionBtn

    const consultarClima = () => {
        if(pais.trim() === '' || ciudad.trim() === ''){
            mostrarAlerta()
            return
        }

        setConsultar(true)

    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y país para la búsqueda',
            [{text: 'Entendido'}]
        )
    }

    const animacionEntrada = () => {
        Animated.spring(animacionBtn, {
            toValue: .85,
            useNativeDriver: true
        }).start() //recordar usar el metodo start() para arrancar la animacion
    }

    const animacionSalida = () => {
        Animated.spring(animacionBtn, {
            toValue: 1,
            useNativeDriver: true,
            friction: 4,
            tension: 30
        }).start()
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionBtn }] //Esto sería como los estilos de la animacion, tipo el css algo asi
    }

    return (
        <View style={styles.formulario}>
            <View>
                <TextInput
                    placeholder="Escribe la ciudad"
                    placeholderTextColor='rgba(0,0,0,0.5)'
                    value={ciudad}
                    onChangeText={ciudad => setBusqueda({...busqueda, ciudad})} //spread operator haciendo su magia
                    style={styles.input}
                />

                <Picker
                    selectedValue={pais}
                    onValueChange={pais => setBusqueda({...busqueda, pais})}
                    style={styles.picker}
                >
                    <Picker.Item label="-- Seleccione un país --" value="" />
                    <Picker.Item label="Estados Unidos" value="US" />
                    <Picker.Item label="México" value="MX" />
                    <Picker.Item label="Argentina" value="AR" />
                    <Picker.Item label="Colombia" value="CO" />
                    <Picker.Item label="Costa Rica" value="CR" />
                    <Picker.Item label="España" value="ES" />
                    <Picker.Item label="Perú" value="PE" />

                </Picker>
            </View>
            <TouchableWithoutFeedback /* esto trabaja con diferentes onpress tambien (onPressIn onPressOut) */

                onPressIn={() => animacionEntrada()}
                onPressOut={() => animacionSalida()}
                onPress={() => consultarClima()}
            >
                <Animated.View /* Hay que cambiar la etiqueta agregandole .Animated al componente que voy a animar */
                    style={[styles.btnBuscar, estiloAnimacion]} /* Tambien se le agregan los estilos de la animacion al estilo del componente con un arreglo como siempre */
                >
                    <Text style={styles.textoBuscar}>Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}


export default Formulario

const styles = StyleSheet.create({
    formulario: {

    },
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',

    },
    btnBuscar: {
        marginTop: 30,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#FFF',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    picker: {
        backgroundColor: '#FFF',
        marginTop: 20,
        color: '#000',
        
    }

})