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
import { useHistory, useParams } from 'react-router-dom';
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

    const handleModalToggle = () => {
      setModalOpen(isModalOpen? false : true)
    }

    useEffect(()=>{
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
                <Title headingLevel='h1'>Tree id: {params.id}</Title>
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
                    <DescriptionListTerm>Namespace</DescriptionListTerm>
                    <DescriptionListDescription>
                        <a href="#">mary-test</a>
                    </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                    <DescriptionListTerm>Labels</DescriptionListTerm>
                    <DescriptionListDescription>example</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                    <DescriptionListTerm>Pod selector</DescriptionListTerm>
                    <DescriptionListDescription>
                        <Button variant="link" isInline icon={<PlusCircleIcon />}>
                        app=MyApp
                        </Button>
                    </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                    <DescriptionListTerm>Annotation</DescriptionListTerm>
                    <DescriptionListDescription>2 Annotations</DescriptionListDescription>
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
           <AddData />
           <AddDataModal  id={params.id} isOpen={isModalOpen} handleToggle={handleModalToggle} />
         </EmptyState>
        )}
        
  </PageSection>
)
};

export { Tree };
