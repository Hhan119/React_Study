import logo from './logo.svg';
import './App.css';
/*
  jsx 객체는 javascript + xml(마크업) 이 혼합되어 있는 객체이다.
  jsx 객체를 사용하는 표현식이 있는 파일은 jsx 파일이 이라고 한다.
  따라서 파일명을 지을때는 xxx.jsx  App.jsx 로 짓는것이 정석이지만
  xxx.js 로 지어도 react 개발환경에서 알아서 처리 해 준다.
*/

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>   
  )
}
  */
function App() {
  const p1 = <p>안녕</p>
  const button = <button onClick={()=>{
    alert("버튼을 눌렀네?")
  }}>눌러보셈</button>;
 
  const myName="김구라";

  const mystyle={
    color:"blue",
    width : "100px",
    height : "100px",
    backgroundColor : "yellow"
  };

  const datas =[
    <li>첼시</li>,
    <li>맨유</li>,
    <li>맨시티</li>
  ];
  const names = ["호랑이", "늑대", "곰"]
  const datas2 = names.map((item) =>{
    return <li>{item}</li>
  });
  const datas3 = names.map(item=> <li>{item}</li>);
  return (
    <div className="container">
      {/* 여기는 주석입니다 */}
      <h1>인덱스 페이지 입니다</h1>
      {p1}
      {button}
      <p> 내이름은 <strong>{myName}</strong></p>
      <div style={{
        color:"blue",
        width : "100px",
        height : "100px",
        backgroundColor : "yellow"
      }}>box</div>
      <br />
      <div style={mystyle}>box2</div>
      <ul>{datas}</ul>
    
      <ul>{datas2}</ul>
      
      <ul>{datas3}</ul>
    </div>
  )
};

  


export default App;
