import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    backgroundColor: '#f8ead6',
    fontFamily: 'LatoRegular',

  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#db9833',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#db9833',
    flexDirection: 'row'
  },
  title: {
    color: '#fefbf7',
    fontFamily: 'LatoRegular',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fefbf7',
    fontWeight: 'bold',
    fontFamily: 'LatoRegular',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fefbf7',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  gameinfo: {
    fontFamily: 'LatoRegular',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  total:{
    fontFamily: 'LatoRegular',
    fontSize: 28,
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row",
    alignItems: 'center'
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: '#db9833',
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fefbf7',
    fontFamily: 'LatoRegular',
    fontSize: 20
  },
  selected: {
    backgroundColor: '#f2d6b0',
    borderRadius: 30,
  },
});