
import { Modal, ModalVariant, Button, Form, FormGroup, TextInput, Title } from '@patternfly/react-core';
import * as React from 'react';
import { Context } from '@app/store/store';
import { addQR, getQRs } from '@app/utils/firebase';

type ModalType = {
    id: string
    isOpen: boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    handleToggle: () => void,

}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AddDataModal = ({id, isOpen, handleToggle}: ModalType) => {

    const { state, dispatch } = React.useContext(Context) 
    const [textValue, setTextValue] = React.useState("")
    const [zone, setzone] = React.useState("")
  

    
    const handleTextInputChange = (value, e) => {
      setTextValue(value)
    }
    const handlezoneInputChange = (value, e) => {
        setzone(value)
      }
  
    const handlePUT = () => {
      // todo
    }
    return (
        <Modal
        variant={ModalVariant.small}
        title={id}
        isOpen={isOpen}
        onClose={handleToggle}
        actions={[
          <Button key="confirm" variant="primary" onClick={handlePUT}>
            Confirm
          </Button>,
          <Button key="cancel" variant="link" onClick={handleToggle}>
            Cancel
          </Button>
        ]}>
             <Form>
          <FormGroup label="CITY" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter CITY"
            name="CITY"
            value={textValue}
            onChange={handleTextInputChange}
          />
        </FormGroup>
        <FormGroup label="ZONE" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter ZONE"
            name="ZONE"
            value={zone}
            onChange={handlezoneInputChange}
          />
        </FormGroup>
        <FormGroup label="DIVISION" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter DIVISION"
            name="DIVISION"
            value={textValue}
            onChange={handleTextInputChange}
          />
        </FormGroup>
        <FormGroup label="WARD" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter WARD"
            name="WARD"
            value={textValue}
            onChange={handleTextInputChange}
          />
        </FormGroup>
        <FormGroup label="GPS LOCATION" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter GPS LOCATION"
            name="CITY"
            value={textValue}
            onChange={handleTextInputChange}
          />
        </FormGroup>
        </Form>

        </Modal>
    )
}
export { AddDataModal }