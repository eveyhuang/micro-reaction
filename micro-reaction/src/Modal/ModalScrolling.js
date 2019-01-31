import React, { Component } from "react";
import { Button, Header, Icon, Image, Modal } from "semantic-ui-react";

class ModalScrolling extends Component {
  render() {
    const { trigger } = this.props;
    return (
      <Modal trigger={trigger} >
        <Modal.Header>Profile Picture</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Modal Header</Header>
            <p>
              This is an example of expanded content that will cause the modal's
              dimmer to scroll
            </p>
            <Image src="https://react.semantic-ui.com/imageds/wireframe/paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalScrolling;
// import React from "react";
// import { Button, Header, Icon, Modal } from "semantic-ui-react";

// const ModalBasicExample = () => (
//   <Modal trigger={<Button>Basic Modal</Button>} basic size="small">
//     <Header icon="archive" content="Archive Old Messages" />
//     <Modal.Content>
//       <p>
//         Your inbox is getting full, would you like us to enable automatic
//         archiving of old messages?
//       </p>
//     </Modal.Content>
//     <Modal.Actions>
//       <Button basic color="red" inverted>
//         <Icon name="remove" /> No
//       </Button>
//       <Button color="green" inverted>
//         <Icon name="checkmark" /> Yes
//       </Button>
//     </Modal.Actions>
//   </Modal>
// );

// export default ModalBasicExample;
