import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, SafeAreaView, StatusBar } from 'react-native';
import React, {useState}  from 'react';

const App = () => {

  const [cep, setCep] = useState('');
  const [texto_resultado, set_texto_resultado] = useState('');

  const onChangeCep = (text) => {
    setCep(text);
  };

  async function buscarCep(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  
      if (!response.ok) {
        throw new Error('CEP não encontrado');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  const cliqueAction = async () => {

    let resultado = await buscarCep(cep);

    if (resultado.error) {
      set_texto_resultado(resultado.error);
      return;
    }

    var complemento = 'Não informado';

    if (resultado.complemento) {
      complemento = resultado.complemento;
    }

    set_texto_resultado(`
      Estado: ${resultado.uf}
      Cidade: ${resultado.localidade}
      Bairro: ${resultado.bairro}
      Rua: ${resultado.logradouro}
      Complemento: ${complemento}
      CEP: ${resultado.cep}
    `);

  } 
  
  return (

    <ScrollView style={styles.bodyBackground}>
      <View>
        <SafeAreaView>
          <StatusBar backgroundColor={'#000'}/>
        </SafeAreaView>
      </View>

      <View style={styles.header}>
        <View style={styles.colunaTextoHeader}>
          <Text style={styles.textCabecalho}>Buscador de CEP!</Text>
          <Text style={styles.textCabecalho}>Consulte aqui um CEP</Text>
        </View>
        <View style={styles.colunaTextoHeader}>
          <Image style={{ width: 50, height: 50 }} source={require('./assets/image-check.png')} />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.textBody}>
          O Buscador de CEP é uma ferramenta gratuita e sem fins lucrativos, criada para facilitar a consulta de códigos postais (CEP) em todo o Brasil. Com uma interface simples, permite que qualquer pessoa encontre rapidamente informações sobre o endereço, como rua, bairro, cidade e estado, a partir do código postal.
          A plataforma oferece dados atualizados e precisos, sendo ideal para uso pessoal ou profissional, como em sites de e-commerce, sistemas logísticos ou plataformas de atendimento ao cliente. O buscador foi desenvolvido com o objetivo de melhorar a precisão das informações de CEP no Brasil e usando a ferramenta gratuita (viacep.com.br), sem nenhum objetivo lucrativo, e contribui para otimizar processos de entrega e logística, tudo de forma gratuita.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.input}
          placeholder='Digite o CEP'
          value={cep}
          onChangeText={onChangeCep}
        />
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={cliqueAction}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.textBodyAddress}>
          {texto_resultado}
        </Text>
      </View>
    
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#cc0f0f',
    borderRadius: 10,       
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 23,
    padding: 10,
    gap: 100,
  },
  colunaTextoHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCabecalho: {
    fontSize: 16,             
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Roboto', 
  },  
  bodyBackground: {
    backgroundColor: '#efefef',
    flex: 1,
  },
  body: {
    padding: 10,
  },
  textBody: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    padding: 20,
  },
  textBodyAddress: {
    fontSize: 14,
    color: '#000',
    padding: 0,
  },
  button: {
    backgroundColor: '#cc0f0f',
    color: '#fff',
    borderRadius: 10,
    marginTop: 10,
    width: 100,
    height: 50,
    color: '#fff',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    top: 13
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 65,
    fontSize: 19,
    color: 'black',
    borderWidth: 0.9,
    width: 300,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
  }
});