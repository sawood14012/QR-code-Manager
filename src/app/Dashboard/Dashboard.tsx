import * as React from 'react';
import { ActionList, ActionListItem, Button, Card, CardBody, CardFooter, CardTitle, Divider, Flex, FlexItem, Form, FormGroup, Grid, GridItem, Modal, ModalVariant, PageSection, TextInput, Title } from '@patternfly/react-core';
import { AwesomeQRCode } from "@awesomeqr/react";
import { useContext, useEffect, useState } from 'react';
import { addQR, getQRs } from '@app/utils/firebase';
import { Context } from '@app/store/store';

const Dashboard: React.FunctionComponent = () => {
  const { state, dispatch } = useContext(Context) 
  const [isModalOpen, setModalOpen] = useState(false)
  const [textValue, setTextValue] = useState("")
  const [id, setid] = useState("")
  const [loading, setloading] = useState(false)
  const [QRs, setQRs] = useState<any>([])

  const handleModalToggle = () => {
    setModalOpen(isModalOpen? false : true)
  }
  
  const handleTextInputChange = (value, e) => {
    setTextValue(value)
  }
  const handleIdInputChange = (value, e) => {
    setid(value)
  }

  const handlePUT = () => {
    setloading(true)
    if(textValue != "" && id != ""){
      addQR(textValue, id).then(()=>{
        getQRs().then((data) => {
          dispatch({ type: "SET_QRs", data: data })
          setloading(false)
          handleModalToggle()
        })
      })
    }
    else{
      setloading(false)
    }
  }
    
  useEffect(() => {
    getQRs().then((data) => {
      dispatch({ type: "SET_QRs", data: data })
    })
  },[QRs, dispatch]); 

  
  return (
  <PageSection>
    <Title headingLevel="h1" size="lg">Manage your QR codes Here!</Title>
    <br />
    <ActionList>
        <ActionListItem>
          <Button variant="primary" id="next-button" onClick={handleModalToggle}>
            Create New QR
          </Button>
        </ActionListItem>
      </ActionList>
      <Modal
          variant={ModalVariant.small}
          title="Create New QR"
          isOpen={isModalOpen}
          onClose={handleModalToggle}
          actions={[
            <Button key="confirm" variant="primary" onClick={handlePUT} isLoading={loading}>
              Confirm
            </Button>,
            <Button key="cancel" variant="link" onClick={handleModalToggle}>
              Cancel
            </Button>
          ]}
        >
          <Form>
          <FormGroup label="Domain" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter URL"
            name="simple-form-url-01"
            value={textValue}
            onChange={handleTextInputChange}
          />
        </FormGroup>
        <FormGroup label="ID" isRequired fieldId="simple-form-id-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-id-01"
            placeholder="Enter URL"
            name="simple-form-id-01"
            value={id}
            onChange={handleIdInputChange}
          />
        </FormGroup>
        </Form>
        </Modal>
        <br />
        <Divider />
        <br />

       <Grid hasGutter span={3}>
          {state.QRs.map((QR)=>(
            <GridItem key={QR['ID']}>
              <Card isLarge>
                <CardTitle>QR id {QR['ID']}</CardTitle>
                <CardBody> 
    

                 <div
            style={{ width: 300, height: 300 }}
          >
          <AwesomeQRCode
                    options={{
                      text: QR['value'],
                      size: 700,
                      margin: 1
                    }}
                    onStateChange={(state) => {
                      switch (state) {
                        case "working":
                          // ...
                          break;
                        case "idle":
                          // ...
                          break;
                      }
                    }}
                    />
         </div>
                </CardBody>
                <CardFooter>URL : {QR['value']}</CardFooter>
              </Card> 
            </GridItem>
          ))}
        </Grid>

  </PageSection>
  )
}

export { Dashboard };
