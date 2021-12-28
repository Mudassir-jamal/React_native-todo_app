import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Styling from './Styling';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const style = StyleSheet.create(Styling);

  const [text, setText] = useState('');
  const [date, setDate] = useState({});
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [page, setPage] = useState(false);

  const Add = () => {
    if (editMode) {
      list[index] = text;
      setEditMode(false);
      setIndex(null);

      let d = new Date().toLocaleDateString();
      let t = new Date().toLocaleTimeString();

      let obj = {
        d,
        t,
      };

      setDate(obj);
    } else if (text == '') {
      alert('Enter T0 DO ---!');
    } else {
      let tempList = [...list];
      tempList.push(text);
      setList(tempList);
      let d = new Date().toLocaleDateString();
      let t = new Date().toLocaleTimeString();

      let obj = {
        d,
        t,
      };

      setDate(obj);
    }

    setText('');
  };

  const dele = i => {
    const tempList = [...list];
    tempList.splice(i, 1);
    setList(tempList);
  };

  const edit = i => {
    setEditMode(true);
    setIndex(i);
    setText(list[i]);

    console.log(date);
  };

  const [name, setName] = useState('');
  const [getValue, setGetValue] = useState('');

  const nameFn = () => {
    if (name) {
      AsyncStorage.setItem('USER_NAME', name);
      alert('!---WelDone---!');
      setName('');

      setPage(true);
    } else {
      alert('fill the data');
    }

    const gett = () => {
      AsyncStorage.getItem('USER_NAME').then(v => {
        console.log(v);
        setGetValue(v);
      });
    };

    gett();
  };

  return (
    <View style={{height: '100%'}}>
      {/* ======================================= Second section ================================================== */}

      {page ? (
        <>
          <View style={style.header}>
            <TouchableOpacity onPress={() => setPage(false)}>
              <Icon name="arrow-left" size={30} color={'#F3B73B'} />
            </TouchableOpacity>

            <Text style={style.sec_header_text}>Welcome : {getValue}</Text>
            <Text></Text>
          </View>

          <View style={style.mainBody}>
            <ScrollView>
              {list.map((e, i) => {
                return (
                  <View key={i} style={[style.li]}>
                    <View style={style.firstSide}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: 220,
                        }}>
                        <Text style={{color: 'darkgray'}}>
                          <Icon name="calendar" color={'#F3B73B'} size={15} />
                          : {date.d}
                        </Text>
                        <Text style={{color: 'darkgray'}}>
                          <Icon name="clock" color={'#F3B73B'} size={15} /> :
                          {date.t}
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          style={style.del}
                          onPress={i => dele(i)}>
                          <Icon name="trash-2" color={'white'} size={18} />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={style.edit}
                          onPress={() => edit(i)}>
                          <Icon name="edit" color={'white'} size={18} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{width: '100%'}}>
                      <Text style={style.mainText}>{e}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={style.bottom}>
            <TextInput
              placeholder="Enter Here.... "
              style={style.input}
              onChangeText={e => setText(e)}
              value={text}
              placeholderTextColor="#F3B73B"
            />

            <TouchableOpacity onPress={() => Add()} style={style.btnView}>
              <Icon
                style={style.addbtn}
                name="plus"
                size={30}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {/*  ===============================  name section =================================== */}

          <View style={style.firstpage}>
            <View style={{backgroundColor: '#FEB037', height: 100}}>
              <Text style={style.firstHeaderText}>TODO APP</Text>
            </View>

            <View style={[style.center, style.firstPageSec]}>
              <TextInput
                style={style.firstpageInput}
                placeholder="Enter Your Name"
                onChangeText={e => setName(e)}
              />

              <TouchableOpacity style={style.firstpageBtn} onPress={nameFn}>
                <Icon name="arrow-right" color={'black'} size={40} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default App;
