import { StatusBar } from 'expo-status-bar'
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import _tarefa from '../types/tarefa';
import Tarefa from '../components/Tarefa';

export default function ToDoScreen({navigation}) {
    const [novaTarefa, setNovaTarefa] = useState<string>('');
  const [tarefas, setTarefas] = useState<_tarefa[]>([]);

  function adicionarTarefa(){
    if(novaTarefa == ''){
      alert("Insira um texto");
      return;
    }
    let tarefa : _tarefa = {
      id : tarefas.length+1,
      texto : novaTarefa
    };
    setTarefas([...tarefas, tarefa]);
  }

  function mostrarTarefas(){
    let saida = tarefas.map(t => <Tarefa key={t.id} dados={t} handleDeletePress={excluir} />);
    return saida;
  }

  function excluir(id :number){
    let f = tarefas.filter(t => t.id != id);
    setTarefas(f);
  }

  return (
    <View style={styles.container}>
      <Button color='black' title="Ir para Busca CEP" onPress={() => navigation.navigate('cep')}/>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput style={styles.input} value={novaTarefa} onChangeText={setNovaTarefa}/>
      <Button color='black' title='Adicionar tarefa' onPress={adicionarTarefa}/>
      <ScrollView style={styles.list}>
        {mostrarTarefas()}
      </ScrollView>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgray',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
      marginTop: 10,
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 30
    },
    input:{
      height: 20,
      marginBottom: 10,
      borderWidth: 1,
      backgroundColor: '#fff'
    },
    list:{
      marginTop:20
    }
  });