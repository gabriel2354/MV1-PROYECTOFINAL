import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { Product } from '../HomeScreen';
import { ModalProduct } from './ModalProduct';
import { styles } from '../../../componets/theme/app.Theme';
import { PRIMARY_COLOR } from '../../../commons/constansColor';
import Icon from 'react-native-vector-icons/MaterialIcons';


//interface - Props
interface Props {
    product: Product;
    changeStockProduct: (idProduct: number, quantity: number) => void;
    
}

export const CardProduct = ({ product, changeStockProduct,  }: Props) => {
    //hook useState: manipular el estado del modal
    const [showModal, setShowModal] = useState<boolean>(false);

 

    return (
        <View>
            <View style={styles.contentCard}>
                <Image
                    source={{
                        uri: product.pathImage
                    }}
                    style={styles.imageCard} />
                <View>
                    <Text style={styles.titleCard}>{product.name}</Text>
                    <Text>Precio: ${product.price.toFixed(2)}</Text>
                </View>
                <View style={styles.iconCard}>
                    <Icon  
                        
                       
                        name='add-shopping-cart'
                        size={50}
                        color={PRIMARY_COLOR}
                        onPress={() => setShowModal(!showModal )} />
                </View>
            </View>
            <ModalProduct
                isVisible={showModal}
                setShowModal={() => setShowModal(!showModal)}
                product={product}
                changeStockProduct={changeStockProduct} />
        </View>

    )
}
