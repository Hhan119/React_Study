// src/components/Alert.js

import { Button, Modal, ModalBody } from "react-bootstrap";

//알림 모달 
function AlertModal({show, message, yes}) {
    /* 
        <Modal show={} > Modal의 show 속성은 react-bootstrap에서 이미 정해진 속성이다.
        show={true} 이면 모달이 보여지고 show={false}이면 모달이 숨겨진다.
        해당 값을 부모 component 로부터 전달받아서 사용하는 구조이다
    */
    return (
        
        <Modal show={show}>
            <Modal.Header>알림</Modal.Header>
            <ModalBody>{message}</ModalBody>
            <Modal.Footer>
                <Button variant="success" onClick={()=>yes()}>확인</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AlertModal;