
import { Modal, ModalVariant, Button, Form, FormGroup, TextInput, Title, FormSelect, FormSelectOption } from '@patternfly/react-core';
import * as React from 'react';
import { Context } from '@app/store/store';
import { addTree } from '@app/utils/firebase';
import { useContext } from 'react';

type ModalType = {
    id: string
    isOpen: boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    handleToggle: () => void,

}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AddDataModal = ({id, isOpen, handleToggle}: ModalType) => {

    const { state, dispatch } = useContext(Context)
    const [loading, setLoading] =React.useState(false) 
    const [textValue, setTextValue] = React.useState("")
    const [zone, setzone] =React.useState("")
    const [division, setdivision]=React.useState("")
    const [ward, setward]=React.useState("")
    const [gps, setgps]=React.useState("")
    const [lat, setlat]=React.useState("")
    const [long, setlong]=React.useState("")
    const [common, setcommon]=React.useState("")
    const [road, setroad]=React.useState("")
    const [railway, setrailway]=React.useState("")
    const [tree, settree]=React.useState("")
    const [nametree, setnametree]=React.useState("")
    const [scientifictree, setscientifictree]=React.useState("")
    const [age, setage]=React.useState(0)
    const [height, setheight]=React.useState(0)
    const [girth, setgirth]=React.useState(0)
    const [land, setland]=React.useState("")  
    const [landType, setlandType]=React.useState("") 

    
    const handleTextInputChange = (value, e) => {
      setTextValue(value)
    }
    const handlezoneInputChange = (value, e) => {
        setzone(value)
      }
      const handledivisionInputChange = (value, e) => {
        setdivision(value)
      }
      const handlewardInputChange = (value, e) => {
        setward(value)
      }
      const handlegpsInputChange = (value, e) => {
        setgps(value)
      }
      const handlelatInputChange = (value, e) => {
        setlat(value)
      }
      const handlelongInputChange = (value, e) => {
        setlong(value)
      }
      const handlecommonInputChange = (value, e) => {
        setcommon(value)
      }
      const handleroadInputChange = (value, e) => {
        setroad(value)
      }
      const handlerailwayInputChange = (value, e) => {
        setrailway(value)
      }
      const handletreeInputChange = (value, e) => {
        settree(value)
      }
      const handlenametreeInputChange = (value, e) => {
        setnametree(value)
      }
      const handlescientifictreeInputChange = (value, e) => {
        setscientifictree(value)
      }
      const handleageInputChange = (value, e) => {
        setage(Number(value))
      }
      const handleheightInputChange = (value, e) => {
        setheight(Number(value))
      }
      const handlegirthInputChange = (value, e) => {
        setgirth(Number(value))
      }
      const handlelandInputChange = (value, e) => {
        setland(value);
      };
      const handlelandTypeInputChange = (value, e) => {
        setlandType(value);
      };
     const Landoptions = [
      { value: 'please choose', label: 'Select one', disabled: true },
      { value: 'GOVERNMENT LAND', label: 'GOVERNMENT LAND', disabled: false },
      { value: 'TANK', label: 'TANK', disabled: false },
      { value: 'FOREST', label: 'FOREST', disabled: false },
      { value: 'BBMP', label: 'BBMP', disabled: false },
      { value: 'PWD', label: 'PWD', disabled: false },
      { value: 'EDUCATION', label: 'EDUCATION', disabled: false },
      { value: 'BWSSB', label: 'BWSSB', disabled: false },
      { value: 'ISRO', label: 'ISRO', disabled: false },
      { value: 'IISC', label: 'IISC', disabled: false },
      { value: 'IIM', label: 'IIM', disabled: false },
      { value: 'INDUSTRIAL', label: 'INDUSTRIAL', disabled: false },
      { value: 'HOME', label: 'HOME', disabled: false },
      { value: 'ARMY', label: 'ARMY', disabled: false },
      { value: 'AIR FORCE', label: 'AIR FORCE', disabled: false },
      { value: 'AIRPORT', label: 'AIRPORT', disabled: false },
      { value: 'OTHER DEFENCE', label: 'OTHER DEFENCE', disabled: false },
     ];

     const Typeoptions = [
      { value: 'please choose', label: 'Select one', disabled: true },
      { value: 'PRIVATE', label: 'PRIVATE', disabled: false },
      { value: 'EDUCATIONAL', label: 'EDUCATIONAL', disabled: false },
      { value: 'INDUSTRIAL', label: 'INDUSTRIAL', disabled: false },
      { value: 'RESIDENTIAL', label: 'RESIDENTIAL', disabled: false },
     ];
  
    const handlePUT = () => {
      setLoading(true)
    const Data = { // todo
      "QRcodeid": id,
      "id": id,
      "City":      textValue, 
      "Zone":     zone,
      "division":     division,
      "ward":      ward,
      "gps":      gps,
      "lat":      lat,
      "long":      long,
      "common":      common,
      "road":      road,
      "railway":      railway,
      "tree":      tree,
      "TreeName":      nametree,
      "scientificName":      scientifictree,
      "Age":     age,
      "height":      height,
      "girth":     girth,
      "land":     land,
      "typeofland":    landType ,
    }

    // todo
      
   
    addTree(id,Data).then(()=>{
      setLoading(false)
      handleToggle()
    })
    }
    return (
        <Modal
        variant={ModalVariant.small}
        title={id}
        isOpen={isOpen}
        onClose={handleToggle}
        actions={[
          <Button key="confirm" variant="primary" onClick={handlePUT} isLoading={loading}>
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
            value={division}
            onChange={handledivisionInputChange}
          />
        </FormGroup>
        <FormGroup label="WARD" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter WARD"
            name="WARD"
            value={ward}
            onChange={handlewardInputChange}
          />
        </FormGroup>
        <FormGroup label="GPS LOCATION" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter GPS LOCATION"
            name="GPS"
            value={gps}
            onChange={handlegpsInputChange}
          />
        </FormGroup>
        <FormGroup label="LAT" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter LAT LOCATION"
            name="LAT"
            value={lat}
            onChange={handlelatInputChange}
          />
        </FormGroup>
        <FormGroup label="LONG" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter LONG LOCATION"
            name="LONG"
            value={long}
            onChange={handlelongInputChange}
          />
        </FormGroup>
        <FormGroup label="COMMON UTILITY" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter COMMMON UTILITY"
            name="COMMON UTILITY"
            value={common}
            onChange={handlecommonInputChange}
          />
        </FormGroup>
        <FormGroup label="ROAD" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter ROAD"
            name="ROAD"
            value={road}
            onChange={handleroadInputChange}
          />
        </FormGroup>
        <FormGroup label="RAILWAY" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter RAILWAY"
            name="RAILWAY"
            value={railway}
            onChange={handlerailwayInputChange}
          />
        </FormGroup>
        
        <FormSelect value={land} onChange={handlelandInputChange} aria-label="FormSelect Input">
        {Landoptions.map((option, index) => (
          <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
        ))}
      </FormSelect>

      <FormSelect value={landType} onChange={handlelandTypeInputChange} aria-label="FormSelect Input">
        {Typeoptions.map((option, index) => (
          <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
        ))}
      </FormSelect>


        <FormGroup label="TREES" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter TREE"
            name="TREE"
            value={tree}
            onChange={handletreeInputChange}
          />
        </FormGroup>
        <FormGroup label="NAME OF THE TREE" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter NAME OF THE TREE"
            name="NAME OF THE TREE"
            value={nametree}
            onChange={handlenametreeInputChange}
          />
        </FormGroup>
        <FormGroup label="SCIENTIFIC NAME" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="text"
            id="simple-form-url-01"
            placeholder="Enter SCIENTIFIC NAME"
            name=" SCIENTIFIC TREE"
            value={scientifictree}
            onChange={handlescientifictreeInputChange}
          />
        </FormGroup>
        <FormGroup label="AGE" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="number"
            id="simple-form-url-01"
            placeholder="Enter AGE"
            name="AGE"
            value={age}
            onChange={handleageInputChange}
          />
        </FormGroup>
        <FormGroup label="HEIGHT IN MTRS" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="number"
            id="simple-form-url-01"
            placeholder="Enter HEIGHT IN MTRS"
            name="HEIGHT"
            value={height}
            onChange={handleheightInputChange}
          />
        </FormGroup>
        <FormGroup label="GIRTH IN MTRS" isRequired fieldId="simple-form-url-01">
          <TextInput
            isRequired
            type="number"
            id="simple-form-url-01"
            placeholder="Enter GIRTH IN MTRS"
            name="GIRTH"
            value={girth}
            onChange={handlegirthInputChange}
          />
        </FormGroup>
        
        
        
        
        </Form>

        </Modal>
    )
}
export { AddDataModal }