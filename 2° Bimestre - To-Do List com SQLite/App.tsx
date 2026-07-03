import { StatusBar } from 'expo-status-bar';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import _tarefa from './types/tarefa';
import Tarefa from './components/Tarefa';

const db = SQLite.openDatabaseSync("to-do.sqlite");

export default function App() {

  const [novaTarefa, setNovaTarefa] = useState<string>('');
  const [tarefas, setTarefas] = useState<_tarefa[]>([]);

  useEffect(
    () => {
      db.execSync(`CREATE TABLE IF NOT EXISTS tarefas (
              id INTEGER PRIMARY KEY NOT NULL,
              texto VARCHAR(100),
              concluido INTEGER DEFAULT 0
        )`);
        recarregar();
    }
  , []);


  const recarregar = async () => {
    let temp : _tarefa[] = await db.getAllAsync("SELECT * FROM tarefas");
    setTarefas(temp);
  }

  const adicionar = async() => {
    if(novaTarefa == ""){
      Alert.alert("Insira um texto!");
      return;
    }

    await db.runAsync(`INSERT INTO tarefas 
      (texto) VALUES (?)`, novaTarefa);

    setNovaTarefa('');
    await recarregar();
  }

  const renderLista = () =>{
    let t = tarefas.map(t => 
            <Tarefa 
                dados={t} 
                db={db} 
                recarregar={recarregar} 
                key={t.id}/>
          );
    return t;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput style={styles.input} value={novaTarefa} onChangeText={setNovaTarefa} />
      <Button color='black' onPress={adicionar} title='Adicionar'/>
      <ScrollView style={styles.list}>
        {renderLista()}
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
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input:{
    height: 20,
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    color: '#000',
    minWidth: 100
  },
  list:{
    marginTop:20
  }
});
