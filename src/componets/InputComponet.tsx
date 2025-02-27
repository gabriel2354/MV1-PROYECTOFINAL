import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from '../commons/constansColor';
import { styles } from './theme/app.Theme';


//interface - props
interface Props {
    placeholder: string;
    handleSetValues: (name: string, value: string) => void;   //prop función
    name: string;
    isPassword?: boolean;  //prop opcional
    hasIcon?: boolean;
    actionIcon?: () => void;  //prop función
}

export const InputComponent = ({ placeholder, handleSetValues, name, isPassword = false, hasIcon = false, actionIcon }: Props) => {
    return (
        <View>
            {
                (hasIcon)
                    ? <Icon
                        name='visibility'
                        size={25}
                        onPress={actionIcon}
                        color={PRIMARY_COLOR}
                        style={styles.iconPassword} />
                    : null
            }

            <TextInput
                placeholder={placeholder}
                keyboardType='default'
                onChangeText={(value) => handleSetValues(name, value)}
                secureTextEntry={isPassword}
                style={styles.inputText}
            />
        </View>
    )
}
