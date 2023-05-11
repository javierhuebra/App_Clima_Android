
import React, { useState, useEffect } from 'react';

import {
  Image,
  StatusBar,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Alert
} from 'react-native';
import Formulario from './src/components/Formulario';
import Clima from './src/components/Clima';



const App = () => {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState({})
  const [seHizoConsulta, setSeHizoConsulta] = useState(false)
  const [animacionLogo] = useState(new Animated.Value(0))

  const [bgColor, setBgColor] = useState('rgb(0,60,73)')
  const animacionEntrada = () => {
    Animated.spring(animacionLogo, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 30
    }).start() //recordar usar el metodo start() para arrancar la animacion
  }

  const estiloAnimacion = {
    transform: [{ scale: animacionLogo }] //Esto sería como los estilos de la animacion, tipo el css algo asi
  }


  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

  const { ciudad, pais } = busqueda //destructuring 

  useEffect(() => {
    animacionEntrada()
  }, [])

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appId = 'b20e208ba8636d01a28e4e5d8b574429'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
        try {
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()

          resultado.cod === '404' ? mostrarAlerta() : setResultado(resultado) //a esto hay que hacerle un refactor porque esa condicion === "404" ta fea

          setConsultar(false)
          setSeHizoConsulta(true)

          //Modifica los colores de fondo en fc de la temperatura
          const kelvin = 273.15
          const { main } = resultado //destructuro main de resultado
          const actual = main.temp - kelvin

          if(actual < 10){
            setBgColor('rgb(105,108,149)')
          }else if(actual>=10 && actual < 25){
            setBgColor('rgb(71,149,212)')
          }else{
            setBgColor('rgb(178,28,61)')
          }

        } catch (error) {
          mostrarAlerta()
        }
      }
    }
    consultarClima()


  }, [consultar])

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No hay resultados, intenta con otra ciudad o país',
      [{ text: 'Ok' }]
    )
  }

  const bgColorApp = {
    backgroundColor: bgColor
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contImg}>
           {!seHizoConsulta && <Animated.Image
              style={[styles.logo, estiloAnimacion]}
              source={require('./src/assets/images/logo.png')}
            />} 
          </View>

          <View style={styles.contenido}>
            <Clima resultado={resultado}/>
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

    </>
  );
}

const styles = StyleSheet.create({
  app: {
    
    flex: 1,
    justifyContent: 'center',

  },
  contenido: {
    marginHorizontal: '2.5%'
  },
  contImg: {

    alignItems: 'center',
    marginBottom: 40
  },
  logo: {
    width: 250,
    height: 250,
    borderRadius: 16

  }
});

export default App;
