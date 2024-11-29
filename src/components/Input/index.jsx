import React, { forwardRef } from "react";
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { themas } from "../../global/themes";
import { style } from "./style";

export const Input = forwardRef((props, ref) => {
    const { 
        IconLeft, 
        IconRigth, 
        iconLeftName,  
        iconRightName, 
        title, 
        onIconLeftPress, 
        onIconRigthPress, 
        labelStyle, 
        ...rest 
    } = props;

    return (
        <>
            {title && <Text style={[style.titleInput, labelStyle]}>{title}</Text>}
            <View style={style.inputArea}>

                {IconLeft && iconLeftName && (
                    <TouchableOpacity onPress={onIconLeftPress} style={style.Button}>
                        <IconLeft name={iconLeftName} size={20} color={themas.Colors.gray} style={style.Icon} />
                    </TouchableOpacity>
                )}
                <TextInput 
                    style={style.input}
                    ref={ref}
                    {...rest} 
                />
                {IconRigth && iconRightName && (
                    <TouchableOpacity onPress={onIconRigthPress} style={style.Button}>
                        <IconRigth name={iconRightName} size={20} color={themas.Colors.gray} style={style.Icon} />
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
});
