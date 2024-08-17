import React, { useState } from 'react';
import { StatusBar, Image, Text, TouchableOpacity, View, ImageBackground, Alert } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { PRIMARY_COLOR } from '../commons/constansColor';
import { TitleComponent } from '../componets/TitleComponent';
import { BodyComponent } from '../componets/BodyComponent';
import { styles } from '../componets/theme/app.Theme';
import { InputComponent } from '../componets/InputComponet';
import { ButtonComponent } from '../componets/ButtonComponet';
import { Double, Float } from 'react-native/Libraries/Types/CodegenTypes';
import { User } from '../navigator/StackNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';


interface Props {
  users: User[];  //arreglo con la lista de usuarios
  handleAddUser: (user: User) => void; //función para añadir nuevos elementos al arreglo
}
//interface - formulario Registro

interface FormRegister {
nombre: string;
apellido: string;
celular: string;
email: string;
password: string;
}
const image = {uri: 'https://st3.depositphotos.com/1020070/16651/v/450/depositphotos_166511886-stock-illustration-green-tree-symbol-of-eco.jpg'};

export const RegisterScreen = ({ users, handleAddUser }: Props) => {

  //hook useState: Manipular el estado del formulario
const [formRegister, setFormRegister] = useState<FormRegister>({
    nombre: '',
    apellido:'',
    celular:'',
    email:'',
    password: ''
});

  //hook useState: permitir que la contraseña sea visible o no
const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  //hook useNavigation: permitir navegar de una pantalla a otra
const navigation = useNavigation();

  //función que actualice el estado del formulario
const handleSetValues = (name: string, value: string) => {
    setFormRegister({ ...formRegister, [name]: value });
}

  //función que permita registrar usuario
  const handleSignUp = () => {

     //Validando si los campos están vacíos
     if (!formRegister.email || !formRegister.password || !formRegister.nombre  || !formRegister.apellido
      || !formRegister.celular) {
     
      //Mensajes de alerta
      Alert.alert(
          "Error",
          "Por favor, completar todos los campos!"
      );
      return;
  }
    console.log(formRegister);
    
    Alert.alert(
      "¡Bienvenido a la familia EcoGarden!",

      "Tu registro fue exitoso.",
      [
        {
          text: "Aceptar",
          onPress: () => {
            // Navegar a la pantalla de inicio de sesión después de hacer clic en "Aceptar"
            navigation.dispatch(CommonActions.navigate({ name: 'Login' }));
          }
        }
      ]
    );
  }
return (
    <View>
      <View>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>

</ImageBackground>
        </View>
    <StatusBar backgroundColor={PRIMARY_COLOR} />
    <TitleComponent title='' />
    <BodyComponent>
        <View>
        <Text
            style={styles.titleBody}>
            Estás muy cerca! 
            
        </Text>
        <Text
            style={styles.descriptionBody}>
            Realiza tus compras de manera rápida y segura
        </Text>
        </View>
        <View style={styles.contentInput}>
        <InputComponent
            placeholder='nombre'
            handleSetValues={handleSetValues}
            name='nombre' />
            <View style={styles.iconoNombre}  >
                  <Icon
                        name='man'
                        size={25}
                        color={PRIMARY_COLOR}/>
                        
              </View>
            
            <InputComponent
            placeholder='apellido'
            handleSetValues={handleSetValues}
            name='apellido' />

              <View style={styles.iconoApellido}  >
                  <Icon
                        name='man'
                        size={25}
                        color={PRIMARY_COLOR}/>
                        
              </View>

            <InputComponent
            placeholder='celular'
            handleSetValues={handleSetValues}
            name='celular' />
              <View style={styles.iconocelular}  >
                  <Icon
                        name='phone'
                        size={25}
                        color={PRIMARY_COLOR}/>
                        
              </View>
          
            <InputComponent
            placeholder='Correo'
            handleSetValues={handleSetValues}
            name='email' />
              <View style={styles.iconoMail}  >
                  <Icon
                        name='mail'
                        size={25}
                        color={PRIMARY_COLOR}/>
                        
              </View>
            <InputComponent
            placeholder='Contraseña'
            handleSetValues={handleSetValues}
            name='password'
            isPassword={hiddenPassword}
            hasIcon={true}
            actionIcon={() => setHiddenPassword(!hiddenPassword)} />
        </View>
        <ButtonComponent textButton='Registrarse' actionButton={handleSignUp} />
        <TouchableOpacity
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
        <Text style={styles.textRedirection}>
            Ya tienes una cuenta? Iniciar sesión ahora
        </Text>
        </TouchableOpacity>
    </BodyComponent>
    <Image
        style={styles.logoR}
        source={{uri:"https://st4.depositphotos.com/17797916/20050/v/450/depositphotos_200509140-stock-illustration-handshake-nature-logo-icon-design.jpg"}}
      />
    </View>
)
}
