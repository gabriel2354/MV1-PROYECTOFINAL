import React, { useState } from 'react';
import { Alert, Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { User } from '../navigator/StackNavigator';
import { TitleComponent } from '../componets/TitleComponent';
import { BodyComponent } from '../componets/BodyComponent';
import { PRIMARY_COLOR } from '../commons/constansColor';
import { styles } from '../componets/theme/app.Theme';
import { InputComponent } from '../componets/InputComponet';
import { ButtonComponent } from '../componets/ButtonComponet';
import Icon from 'react-native-vector-icons/MaterialIcons';


//interface - props
interface Props {
    users: User[];  //arreglo con la lista de usuarios
}

//interface - objeto
interface FormLogin {
    email: string;
    password: string;
}
const image = {uri: 'https://st3.depositphotos.com/1020070/16651/v/450/depositphotos_166511886-stock-illustration-green-tree-symbol-of-eco.jpg'};


export const LoginScreen = ({ users }: Props) => {
    //hook useState: manipular el estado del formulario
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: ''
    });

    //hook useState: permitir que la contraseña sea visible o no
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    //hook useNavigation: permitir navegar de una pantalla a otra
    const navigation = useNavigation();

    //función que permita actualizar el estado del formulario
    const handleSetValues = (name: string, value: string) => {
        //Cambiar le estado del formLogin
        //...operador de propagación | spread: sacar una copia de las propiedades del objeto
        setFormLogin({ ...formLogin, [name]: value });
    }

    //función que permita iniciar sesión
    const handleSignIn = () => {
        //Validando si los campos están vacíos
        if (!formLogin.email || !formLogin.password) {
            //Mensajes de alerta
            Alert.alert(
                "Error",
                "Por favor, completar todos los campos!"
            );
            return;
        }
        //Validar si el correo y contraseña existe
        if (!verifyUser()) {  //valor null 
            Alert.alert(
                "Error",
                "Correo y/o contraseña incorrecta!"
            );
            return;
        }

        //Si uso un usuario registrado, navego al HomeScreen
        navigation.dispatch(CommonActions.navigate({ name: 'Home' }))
        //console.log(formLogin);
    }

    //función verificar si existe el correo y contraseña
    const verifyUser = (): User => {
        const existUser = users.filter(user => user.email === formLogin.email && user.password === formLogin.password)[0];
        return existUser;
    }

    return (
        <View>
             <View>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>

</ImageBackground>
        </View>
            


            <StatusBar  />
            
            <TitleComponent title='' />
            <BodyComponent >

                
                
                <View>
                    <Text
                        style={styles.titleBody}>
                        EcoGarden Te Da La Bienvenida!
                    </Text>
                    <Text
                        style={styles.descriptionBody}>
                      "Compra de forma rápida y segura. Disfruta de pagos protegidos y una entrega confiable."
                    </Text>

                    
                    </View>
            
                
                <View style={styles.contentInput}>
                    
                    <InputComponent
                        placeholder='Correo'
                        handleSetValues={handleSetValues}
                        name='email' />
                        <View style={styles.iconoCorreoInicio}  >
                        <Icon
                        name='email'
                        size={25}
                        color={PRIMARY_COLOR}
                         />
                        </View>
                    <InputComponent
                        placeholder='Contraseña'
                        handleSetValues={handleSetValues}
                        name='password'
                        isPassword={hiddenPassword}
                        hasIcon={true}
                        actionIcon={() => setHiddenPassword(!hiddenPassword)} />
                </View>
                <ButtonComponent textButton='Iniciar' actionButton={handleSignIn} />
                <TouchableOpacity
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}>
                    <Text style={styles.textRedirection}>
                        Regístrate ahora
                    </Text>
                    
    
     
                </TouchableOpacity>
            </BodyComponent>
            <Image
        style={styles.tinyLogo}
        source={{uri:"https://st4.depositphotos.com/17797916/20050/v/450/depositphotos_200509140-stock-illustration-handshake-nature-logo-icon-design.jpg"}}
      />
      
        
        
        

        </View>
        
       
    )
}
