import { Button, Card, Col, Container, Pagination, Row } from "react-bootstrap";
import 'holderjs'
import 'bootstrap/dist/css/bootstrap.css'

// 원하는 범위의 숫자를 배열에 담아서 리턴하는 util 함수 만들어보기
function range(start, end){
    const nums=[];
    for(let i=start; i <=end; i++ ){
        nums.push(i)
    }

    return nums;

}
function App5() {
    const card1= {title:"제목", content:"내용"}
    const card2= {title:"호랑이", content:"어흥"}

    // component 안에서 특정 이벤트가 발생했을 때 실행할 함수
    const handleGo = ()=>{
        alert("이동합니다")
    }

    // 출력할 페이지 번호라고 가정
    const pageNums = range(11, 20)
    // 현재 페이지 번호라고 가정
    const currentPage= 15

    const getPage = (pageNums)=>{
        alert(pageNums + "페이지로 이동합니다")       
    
    }
    const currentPage2 = pageNums.map(item=><Pagination.Item onClick={()=>getPage(item)} active={item == currentPage} key={item}>{item}</Pagination.Item>)   
    return (
        <div>
            <Container>
                <h3>card component</h3>
            <Row>
                <Col md={6} lg={3}>
                <MyCard onGo={handleGo} title={card1.title} content={card1.content} />
                </Col>

                <Col md={6} lg={3}>
                <MyCard onGo={handleGo} title={card2.title} content={card2.content} />
                </Col>
            </Row>
            <br />
            <Pagination>
                <Pagination.Prev />
                <Pagination.Item>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item active={true}>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next />
            </Pagination>
            <br />
            <Pagination>
                {/* pageNums 배열을 이용해서 이위치에 <Pagination.Item> 이 여러개 랜더링 되도록 해보세요*/}
                <Pagination.Prev />
                {pageNums.map(item =><Pagination.Item onClick={()=>getPage(item)} active={item == currentPage} key={item}>{item}</Pagination.Item>)}              
                <Pagination.Next />
            </Pagination>
            <Pagination>
                {/* pageNums 배열을 이용해서 랜더링 된 함수 출력*/}
                <Pagination.Prev />
                {currentPage2}
                <Pagination.Next />
            </Pagination>
        </Container>
        </div>
    );
}

function MyCard(props) {
    return (
      <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{props.title} <br />Card Title</Card.Title>
          <Card.Text>
            {props.content} <br />
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary" onClick={()=>{
            props.onGo()
          }}>Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
export default App5;