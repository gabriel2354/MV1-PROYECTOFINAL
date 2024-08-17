import React, { useCallback, useState } from 'react';
import { FlatList, ImageBackground, StatusBar, Text, View, TouchableOpacity, Alert } from 'react-native';
import { CardProduct } from './components/CardProduct';
import { TitleComponent } from '../../componets/TitleComponent';
import { BodyComponent } from '../../componets/BodyComponent';
import { PRIMARY_COLOR, SECUNDARY_COLOR } from '../../commons/constansColor';
import { styles } from '../../componets/theme/app.Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ModalCar } from './components/ModalCar';



//arreglo productos
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    pathImage: string;
   
}

//arreglo carrito de compras
export interface Car {
    id: number;
    name: string;
    price: number;
    totalQuantity: number;
}
const image = {uri: 'https://st3.depositphotos.com/1020070/16651/v/450/depositphotos_166511886-stock-illustration-green-tree-symbol-of-eco.jpg'};

export const HomeScreen = () => {
    //arreglo con la lista de productos
    const products: Product[] = [
        { id: 1, name: 'Set de palas', price: 45.50, stock: 12, pathImage: 'https://agripac.com.ec/wp-content/uploads/2023/12/001-8.jpg' },
        { id: 2, name: 'Rastrillo', price: 22.40, stock: 4, pathImage: 'https://escuelajardineria.es/wp-content/uploads/2020/06/el-rastrillo-herramientas-de-jardin.jpg' },
        { id: 3, name: 'Tijeras para podar', price: 2.00, stock: 24, pathImage: 'https://herramientasdee.com/wp-content/uploads/2019/01/tijeras-grandes-para-podar.jpg' },
        { id: 4, name: 'Bordeadora', price: 456.60, stock: 12, pathImage: 'https://www.segutecnica.com/thumb/000000000001903422038husqvarna-bordeadora-115il-7098801-segutecnica_400x400.png' },
        { id: 5, name: 'Azada', price: 15.80, stock: 10, pathImage: 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/793cc93f-f22e-4f1d-9fc4-0273b17e47ff.48f1801d55ff7d55ca0c7871478e0cc0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' },
        { id: 6, name: 'Pala de jardin', price: 10.50, stock: 8, pathImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmC8IJoGmsx4njdQCr7iGba_sQ8E8zk4ZqeNQVd4jG2JLkymsbNkhOtCI6rqXPXQTn1eI&usqp=CAU' },
        { id: 7, name: 'Azada estilo gancho', price: 12, stock: 8, pathImage: 'https://i.ebayimg.com/thumbs/images/g/1xcAAOSwzHRmay0B/s-l1200.jpg' },
        { id: 8, name: 'Azada hueca', price: 17, stock: 8, pathImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ynXEYwESychEX6qZNItt7WDWiICuJyiZGg&s' },
    ];

    //hook useState: manipular el arreglo de productos
    const [productsState, setProductsState] = useState(products);

    //hook useState: manipular el arreglo de carrito de compras
    const [car, setCar] = useState<Car[]>([]);
    //hook useState: manipular la visibilidad del modal
    const [ showModal, setShowModal] = useState<boolean>(false);

    //función para actualizar la información del arreglo producto
    const changeStockProduct = (idProduct: number, quantity: number) => {
        //Nuevo arreglo con el stock actualizado
        const updateStock = productsState.map(product => product.id === idProduct
            ? { ...product, stock: product.stock - quantity }
            : product);
        //Actualizar productState
        setProductsState(updateStock);

        //llamar función agregar carrito
        addProduct(idProduct, quantity);
    }

    //función agregar los productos al carrito
    const addProduct = (idProduct: number, quantity: number) => {
        const product = productsState.find(product => product.id === idProduct);

        //Controlar si el producto no ha sido encontrado
        if (!product) {
            return;
        }
     //funcion para verificar si el id  y el id del producto coinciden y si coinciden automaticamte se actualiza la cantidad total
        const existingProduct = car.find(item => item.id === idProduct);
        if (existingProduct) {
            setCar(car.map(item =>
                item.id === idProduct
                    ? { ...item, totalQuantity: item.totalQuantity + quantity }
                    : item
            ));
        } else {
            setCar([...car, {
                id: product.id,
                name: product.name,
                price: product.price,
                totalQuantity: quantity
            }]);
        }
    }
    // para verificar si el carrito esta vacio
    const carritoVacio = car.length === 0;
    
    //  abrir el modal solo si el carrito no está vacío
    const cartIcon = () => {
        if (!carritoVacio) {
            setShowModal(!showModal);
        }
    };
    

    




    return (
        <View>
                <View>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>

                </ImageBackground>
                </View>
                <StatusBar backgroundColor={PRIMARY_COLOR} />
            <View style={styles.contentHeaderHome}>
                <TitleComponent title='Productos' />
                <View style={{
                    ...styles.iconCard,
                    paddingHorizontal: 33
                }}>
                    <Text style={styles.textIconCar}>{car.length}</Text>
                    <TouchableOpacity onPress={ cartIcon}>
                    <Icon
                        name='shopping-cart'
                        size={35}
                        color={carritoVacio ? 'gray' : PRIMARY_COLOR}
                       
                        
                         />
                         </TouchableOpacity>
                </View>
            </View>
            <BodyComponent>
                <FlatList
                    data={productsState}
                    renderItem={({ item }) => <CardProduct product={item} changeStockProduct={changeStockProduct} />}
                    keyExtractor={item => item.id.toString()} />
            </BodyComponent>
            <ModalCar
                isVisible={showModal}
                car={car}
                setShowModal={() => setShowModal(!showModal)} />
        </View>
    )
}
