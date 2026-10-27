
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { PaperProvider, Button, Text } from 'react-native-paper';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [primeiroNumero, setPrimeiroNumero] = useState(null);
  const [operacao, setOperacao] = useState(null);
  const [novoNumero, setNovoNumero] = useState(false);

  function digitarNumero(numero) {
    if (novoNumero || display === 'Erro') {
      setDisplay(numero);
      setNovoNumero(false);
    } else {
      setDisplay(display === '0' ? numero : display + numero);
    }
  }

  function escolherOperacao(op) {
    if (display === 'Erro') return;

    setPrimeiroNumero(Number(display));
    setOperacao(op);
    setNovoNumero(true);
  }

  function calcular() {
    if (primeiroNumero === null || operacao === null) return;

    const segundoNumero = Number(display);
    let resultado;

    switch (operacao) {
      case '+':
        resultado = primeiroNumero + segundoNumero;
        break;
      case '-':
        resultado = primeiroNumero - segundoNumero;
        break;
      case '*':
        resultado = primeiroNumero * segundoNumero;
        break;
      case '/':
        resultado = segundoNumero === 0
          ? 'Erro'
          : primeiroNumero / segundoNumero;
        break;
    }

    setDisplay(String(resultado));
    setPrimeiroNumero(null);
    setOperacao(null);
    setNovoNumero(true);
  }

  function limpar() {
    setDisplay('0');
    setPrimeiroNumero(null);
    setOperacao(null);
    setNovoNumero(false);
  }

  function pressionarBotao(valor) {
    if (valor === 'C') {
      limpar();
    } else if (valor === '=') {
      calcular();
    } else if (['+', '-', '*', '/'].includes(valor)) {
      escolherOperacao(valor);
    } else {
      digitarNumero(valor);
    }
  }

  const botoes = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['C', '0', '=', '+'],
  ];

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Text variant="headlineMedium" style={styles.titulo}>
          Calculadora
        </Text>

        <View style={styles.display}>
          <Text variant="displayMedium" style={styles.resultado}>
            {display}
          </Text>
        </View>

        {botoes.map((linha, indice) => (
          <View key={indice} style={styles.linha}>
            {linha.map((valor) => (
              <Button
                key={valor}
                mode="contained"
                onPress={() => pressionarBotao(valor)}
                style={[
                  styles.botao,
                  ['+', '-', '*', '/', '='].includes(valor)
                    ? styles.operador
                    : valor === 'C'
                    ? styles.limpar
                    : styles.numero,
                ]}
                labelStyle={styles.textoBotao}
              >
                {valor}
              </Button>
            ))}
          </View>
        ))}
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171C2B',
    justifyContent: 'center',
    padding: 16,
  },
  titulo: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  display: {
    backgroundColor: '#293145',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    minHeight: 100,
    justifyContent: 'center',
  },
  resultado: {
    color: '#FFFFFF',
    textAlign: 'right',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  botao: {
    flex: 1,
    marginHorizontal: 3,
    borderRadius: 10,
    justifyContent: 'center',
    minHeight: 65,
  },
  numero: {
    backgroundColor: '#343E52',
  },
  operador: {
    backgroundColor: '#475C9A',
  },
  limpar: {
    backgroundColor: '#B54B57',
  },
  textoBotao: {
    fontSize: 22,
    color: '#FFFFFF',
    marginVertical: 12,
  },
});
