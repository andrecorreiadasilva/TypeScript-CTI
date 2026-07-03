import { SQLiteDatabase } from "expo-sqlite"
import _tarefa from "../types/tarefa"
import { Button, Text, View, StyleSheet } from "react-native"

type _propsTarefa = {
    dados: _tarefa,
    db: SQLiteDatabase,
    recarregar: any
}

export default function Tarefa(props: _propsTarefa) {

    const concluir = async()=>{
        await props.db.runAsync("UPDATE tarefas SET concluido=1 WHERE id=?", props.dados.id);
        await props.recarregar();
    }

    const excluir = async()=>{
        await props.db.runAsync("DELETE FROM tarefas WHERE id=?", props.dados.id);
        await props.recarregar();
    }

    const renderStatus = () => {
        if (props.dados.concluido)
            return <Text style={styles.concluido}>Concluído</Text>;
        return <Button title="Concluir" onPress={concluir} />;
    }

    return <View style={styles.view}>
        <Text>{props.dados.texto}</Text>
        {renderStatus()}
        <Button color="red" title="Excluir"  onPress={excluir} />
    </View>;
}

const styles = StyleSheet.create({
    view:{
        borderWidth:1,
        marginLeft:10,
        marginRight:10,
        backgroundColor: '#fff',
        marginTop: 10
    },
    concluido:{
        backgroundColor: '#000',
        color: 'white',
        textAlign: 'center'
    },
    excluir:{
        backgroundColor: 'red'
    }
});
