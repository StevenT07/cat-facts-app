/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Pressable,
  FlatList
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#b1cc74',
    flex: 1
  };
  const [curCatFact, setCurCatFact] = useState<string>("");
  const [catFactList, setCatFactList] = useState<Array<string>>([]);
  const getCatFact = async () => {
    try {
      const response = await fetch("https://meowfacts.herokuapp.com/");
      const json = await response.json();
      if (curCatFact !== "") {
        setCatFactList([...catFactList, curCatFact]);
      }
      setCurCatFact(json.data);
      console.log(catFactList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCatFact();
  }, [])
  
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={styles.headerText}>Current Cat Fact</Text>
        <Text style={styles.curCatFactText}>{curCatFact}</Text>
        <Pressable  onPress={() => getCatFact()}
                style={styles.buttonStyle}>
                  <Text style={styles.buttonText}>More Cat Facts!</Text>
        </Pressable>
        <Pressable  onPress={() => setCatFactList([])}
                style={styles.clearButtonStyle}>
                  <Text style={styles.clearButtonText}>Clear Cat Fact History</Text>
        </Pressable>
          <FlatList data={catFactList} style={styles.listStyle}
            renderItem={({item}) => <Text style={styles.catFactListText}>{item}</Text>}
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  curCatFactText: {
    margin: 12,
    fontSize: 18,
    fontWeight: '400',
    color: 'white', 
  },
  catFactListText: {
    margin: 20, 
    fontSize: 16, 
    fontWeight: '300',
    color: 'white',
  },
  headerText: {
    textAlign: 'center', 
    fontSize: 32, 
    fontWeight: '700',
    color: 'white',
  },
  buttonText: {
    textAlign: 'center', 
    fontSize: 32, 
    fontWeight: '700',
    color: '#CFFA80',
    textShadowColor: 'black',
    textShadowRadius: 5,
  },
  container: {
    alignContent: 'center',
    flex: 1,
  },
  buttonStyle: {
    margin: 10, 
    padding: 10,
    width: "80%",
    backgroundColor: '#e8fcc2',
    borderRadius: 13,
    alignSelf: 'center'
  },
  clearButtonStyle: {
    margin: 10, 
    padding: 10,
    width: "80%",
    backgroundColor: '#d1603d',
    borderRadius: 13,
    alignSelf: 'center'
  },
  listStyle: {
    backgroundColor: '#381d2a',
    borderRadius: 30,
    margin: 10,
  },
  clearButtonText: {
    textAlign: 'center', 
    fontSize: 32, 
    fontWeight: '700',
    color: '#ddb967',
    textShadowColor: 'black',
  }

  
});

export default App;
