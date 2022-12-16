import React from 'react';
import List from './components/List';



function App() {
  return (
    <div className="App" style={{display:"flex",height:"100%",  alignItems:"center", justifyContent:"center"}}>
      <List content={["test 1", "test 2", "test 3", "test 4"]}/>
    </div>
  );
}

export default App;
