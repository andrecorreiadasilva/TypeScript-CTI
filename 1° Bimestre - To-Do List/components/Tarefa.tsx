import { Text, StyleSheet, View, Button } from "react-native";
import _tarefa from "../types/tarefa";

export default function Tarefa(props:{
    dados:_tarefa, 
    handleDeletePress: any
}){
    return <View style={styles.view}>
                <Text>{props.dados.texto}</Text>
                <Button color='red' title="Excluir" onPress={()=>{ props.handleDeletePress(props.dados.id) }}/>
            </View>;
}

const styles = StyleSheet.create({
    view:{
        borderWidth:1,
        marginLeft:10,
        marginRight:10,
        backgroundColor: '#fff',
        marginTop: 10
    }
})