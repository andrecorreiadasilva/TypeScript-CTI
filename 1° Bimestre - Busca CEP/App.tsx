import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [cep, setCep] = useState('');
  const [info, setInfo] = useState({
    logradouro: '', 
    complemento: '',
    unidade: '',
    bairro: '',
    localidade: '',
    uf: '',
    estado: '',
    regiao: '',
    ibge: '',
    gia: '',
    ddd: '',
    siafi: ''
  });

  async function buscarCEP(){
    let r = await fetch("https://viacep.com.br/ws/"+cep+"/json/");
    let dados = await r.json();
    setInfo(dados);
  }

  return (
    <View style={styles.container}>
      <Text>Consulte seu CEP!</Text>
      <TextInput
        style={styles.textinput}
        value={cep}
        onChangeText={setCep}
      />
      <Button
        title='Buscar'
        onPress={buscarCEP}
      />
      <Text>{cep}</Text>
      <Text>Logradouro: {info.logradouro}</Text>
      <Text>Complemento: {info.complemento}</Text>
      <Text>Unidade: {info.unidade}</Text>
      <Text>Bairro: {info.bairro}</Text>
      <Text>Localidade: {info.localidade}</Text>
      <Text>UF: {info.uf}</Text>
      <Text>Estado: {info.estado}</Text>
      <Text>Região: {info.regiao}</Text>
      <Text>IBGE: {info.ibge}</Text>
      <Text>GIA: {info.gia}</Text>
      <Text>DDD: {info.ddd}</Text>
      <Text>SIAFI: {info.siafi} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textinput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: '7px'
  }
});
