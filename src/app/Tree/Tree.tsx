import * as React from 'react';
import { ExclamationTriangleIcon, PlusCircleIcon } from '@patternfly/react-icons';
import {
  PageSection,
  Title,
  Button,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  Spinner,
  FlexItem,
  Flex,
  Backdrop,
  Bullseye,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from '@patternfly/react-core';
import { Switch, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getTree } from '@app/utils/firebase';
import logo from '@app/bgimages/tree.png';
import { AddDataModal } from './Modal';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Tree: React.FunctionComponent = () => {
    const params = useParams<{ id: string;}>();
    const [DataPresent, setDataPresent] = useState(false)
    const [loading, setloading] = useState(false)
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [Data, setData] = useState<any>([])
    const [EditAccess, setAccess] = useState(false);

    const handleModalToggle = () => {
      setModalOpen(isModalOpen? false : true)
    }

    useEffect(()=>{
      const Access = localStorage.getItem("UserRole");
        if(Access!==null){
          switch(Access) {
            case 'Master':
              setAccess(true)
              break;
            case 'Admin':
              setAccess(true)
              break;
            default:
              setAccess(false)
              break;
          }
        }
        if(params.id != ""){
            setloading(true)
            getTree(params.id).then((value)=>{

                if(_.isEmpty(value)){
                    console.log(value)
                    setloading(false) 
                    setDataPresent(false)
                    
                }
                else{
                    console.log(value)
                    setloading(false)
                    setData(value)
                    setDataPresent(true)
                }
            })
        }
    },[params.id])


  function AddData() {
    function handleClick() {
      handleModalToggle()
    }
    return (
      <Button onClick={handleClick}>Add Data</Button>
    );
  }
  if(loading){
      return (<Bullseye>
      <Spinner isSVG />
    </Bullseye>)
  }

  return (
    <PageSection>
        {DataPresent && (
            <Flex direction={{ default: 'column' }}>
                <FlexItem>
                <Title headingLevel='h1'>Tree id: {Data["id"]}</Title>
                </FlexItem>
                <FlexItem>
                    <img style={{ width: 300, height: 300 }} src={logo} />
                </FlexItem>
                <FlexItem>
                <DescriptionList columnModifier={{ lg: '3Col' }}>
                    <DescriptionListGroup>
                    <DescriptionListTerm>TreeName</DescriptionListTerm>
                    <DescriptionListDescription>{Data['TreeName']}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                    <DescriptionListTerm>QRcodeid</DescriptionListTerm>
                    <DescriptionListDescription>{Data["QRcodeid"]}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                    <DescriptionListTerm>City</DescriptionListTerm>
                    <DescriptionListDescription>{Data["City"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Zone</DescriptionListTerm>
                    <DescriptionListDescription>{Data["Zone"]}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                    <DescriptionListTerm>Division</DescriptionListTerm>
                    <DescriptionListDescription>{Data[ "division"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Ward</DescriptionListTerm>
                    <DescriptionListDescription>{Data["ward"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>GPS </DescriptionListTerm>
                    <DescriptionListDescription> {Data["gps"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Latitude</DescriptionListTerm>
                    <DescriptionListDescription> {Data["lat"]}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                    <DescriptionListTerm>Longitude</DescriptionListTerm>
                    <DescriptionListDescription> {Data["long"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Common</DescriptionListTerm>
                    <DescriptionListDescription>{Data["common"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Road</DescriptionListTerm>
                    <DescriptionListDescription>{Data["road"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    
                    <DescriptionListGroup>
                    <DescriptionListTerm>Railway</DescriptionListTerm>
                    <DescriptionListDescription>{Data["railway"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Tree</DescriptionListTerm>
                    <DescriptionListDescription>{Data["tree"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Scientific Name</DescriptionListTerm>
                    <DescriptionListDescription>{Data["scientificName"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Age</DescriptionListTerm>
                    <DescriptionListDescription>{Data["Age"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Height</DescriptionListTerm>
                    <DescriptionListDescription>{Data["height"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Girth</DescriptionListTerm>
                    <DescriptionListDescription>{Data["girth"]}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                    <DescriptionListTerm>Land</DescriptionListTerm>
                    <DescriptionListDescription>{Data["land"]}</DescriptionListDescription>
                    </DescriptionListGroup>

                    <DescriptionListGroup>
                    <DescriptionListTerm>Type of Property</DescriptionListTerm>
                    <DescriptionListDescription>{Data["typeofland"]}</DescriptionListDescription>
                    </DescriptionListGroup>
                </DescriptionList>
                </FlexItem>
            </Flex>
        )}
        {!DataPresent && (
           <EmptyState variant="full">
           <EmptyStateIcon icon={ExclamationTriangleIcon} />
           <Title headingLevel="h1" size="lg">
             Data Not found
           </Title>
           <EmptyStateBody>
             The Tree Data is not Present in DB Please ADD
           </EmptyStateBody>
           {EditAccess && (<AddData />)}
           <AddDataModal  id={params.id} isOpen={isModalOpen} handleToggle={handleModalToggle} />
         </EmptyState>
        )}
        
  </PageSection>
)
};

export { Tree };
