import React, { useState } from 'react';
import { Alert, FlatList, Modal, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Car } from '../HomeScreen';
import { styles } from '../../../componets/theme/app.Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from '../../../commons/constansColor';


//interface - props
interface Props {
    isVisible: boolean;
    setShowModal: () => void; //función para cerrar el modal
    car: Car[];  //arreglo con la lista de productos en el carrito
    clearCart: () => void;
}
   

export const ModalCar = ({ isVisible, setShowModal, car ,clearCart  }: Props) => {
    
    

    const { width } = useWindowDimensions();
    
   

        
    //función para calcular el total a pagar
    const totalPay = (): number => {
        //acumulador
        let total: number = 0;
        car.forEach(product => {
            total += product.price * product.totalQuantity
        });
        return total;
    }
    
    //función enviar la compra
    const handleSendInfo = () => {

        
    


        // Mostrar mensaje de agradecimiento
        Alert.alert(
            "Gracias por tu compra!",
            "Tu pedido ha sido procesado.",
            [{ text: "OK", onPress: () => {
                // Vaciar el carrito
                
            
                // Cerrar el modal
                setShowModal();
            }}]
        );
    }
    
 


return (
    <Modal visible={isVisible} transparent={true} animationType='fade'>
        <View style={styles.contentPrincipal}>
            <View style={{
                ...styles.contentModal,
                width: width * 0.80
            }}>
                <View style={styles.headerModal}>
                    <Text style={styles.titleModal}>Mis Productos</Text>
                    <View style={styles.iconCard}>
                        <Icon
                            name='cancel'
                            size={27}
                            color={PRIMARY_COLOR}
                            onPress={setShowModal} />
                                      
                    </View>
                </View>
                <View style={styles.headerTable}>
                    <Text style={styles.textHeaderInf}>Producto</Text>
                    <View style={styles.headerTableInf}>
                        <Text style={{
                            ...styles.textHeaderInf,
                            marginHorizontal: 10
                        }}>Prec.</Text>
                        <Text style={{
                            ...styles.textHeaderInf,
                            marginHorizontal: 10
                        }}>Cant.</Text>
                        <Text style={{
                            ...styles.textHeaderInf,
                            marginHorizontal: 10
                        }}>Total</Text>
                    </View>
                </View>
                <FlatList
                    data={car}
                    renderItem={({ item }) =>
                        <View style={styles.headerTable}>
                            <Text>{item.name}</Text>
                            <View style={styles.headerTableInf}>
                                <Text style={{ marginHorizontal: 10 }}>
                                    {item.price.toFixed(2)}
                                </Text>
                                <Text style={{ paddingHorizontal: 27 }}>
                                    {item.totalQuantity}
                                </Text>
                                <Text style={{ marginHorizontal: 10 }}>
                                    {(item.price * item.totalQuantity).toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.id.toString()} />
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.textTotalPay}>
                        Total pagar: ${totalPay().toFixed(2)}
                    </Text>
                </View>
                <TouchableOpacity 
                
                    onPress={handleSendInfo}
                    style={styles.buttonAddCard}>
                    <Text style={styles.textButtonAddCard}>comprar</Text>
                    
                    
                </TouchableOpacity>
                
                
                
            </View>
           
        </View>
       
        
    </Modal>
)
}
 

 
   
        
        


      
   
