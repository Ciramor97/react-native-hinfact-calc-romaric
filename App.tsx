/* eslint-disable prettier/prettier */
/**
 * My Super great Calculator app
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View,Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

function App(): JSX.Element {

  enum Color {
    RED = 'red',
    GREEN = 'green',
  }
  const [leftOperand, setLeftOperand] = useState('');
  const [rightOperand, setRightOperand] = useState('');
  const [isConnected, setConnected] = useState(true);

  const leftOperandInputColor = leftOperand === '' ? Color.RED : Color.GREEN;
  const rightOperandInputColor = rightOperand === '' ? Color.RED : Color.GREEN;

  const result = parseFloat(leftOperand) + parseFloat(rightOperand);


	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setConnected(!!state.isConnected);
		});

		return () => {
			unsubscribe();
		};
	}, []);

  const commonStyle  = {
    borderWidth: 2,
      fontSize: 30,
      margin: 10,
      padding: 10,
      borderRadius: 4,
      backgroundColor: '#f1f5ed',
  }

  const inputStyle = {
    leftOperand: {
      ...commonStyle,
      borderColor: leftOperandInputColor,
    },
    rightOperand: {
      borderColor: rightOperandInputColor,
      ...commonStyle,
    },
  };


  const changeLeftOperand = (value: any) => {
    setLeftOperand(value);
  };

  const changeRightOperand = (value: any) => {
    setRightOperand(value);
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.iconView}>
         <Image  style={styles.icon} source={!isConnected?require('./assets/offline.png'):require('./assets/online.png')} />
         <Text style={styles.networkStatusMsg}>{!isConnected?"OFFLINE":"ONLINE"}</Text>
      </View>
      
    
      <Text style={styles.header}>
        Hinfact<Text style={styles.bold}>Calc</Text>
      </Text>
      <View style={styles.operation}>
        <TextInput
          value={leftOperand}
          style={inputStyle.leftOperand}
          onChangeText={(value) => changeLeftOperand(value)}
        />
        <Text style={styles.operationText}>+</Text>
        <TextInput
          value={rightOperand}
          style={inputStyle.rightOperand}
          onChangeText={(value) => changeRightOperand(value)}
        />
        <Text style={styles.operationText}>=</Text>
      </View>
      <View>
        <Text style={styles.result}>#result: {result || 0}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    margin: 20,
  },
  header: {
    fontSize: 50,
    marginBottom: 34,
    textAlign: 'center'
  },
  bold: {
    fontWeight: 'bold',
  },
  operation: {
    flexDirection: 'row',
    fontSize: 28,
    alignItems: 'center',
    marginBottom: 36,
    display: 'flex',
    justifyContent: 'center',
  },
  operationText: {
    fontSize: 30,
  },
  result: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconView: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  networkStatusMsg: {
    fontSize:8,
  }
});

export default App;
