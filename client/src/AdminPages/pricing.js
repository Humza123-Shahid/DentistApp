// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,useRedirect ,FunctionField, TextField,NumberField,List, DataTable, DateField, BooleanField,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,ReferenceField,AutocompleteInput,SelectInput,RichTextInput, DateInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
const genderChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
    { id: 'other', name: 'Other' },
];

export const PricingCreate = () => {
  const choices = [
    { id: 'tech', name: 'Technology' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
return(
    <Create redirect="list" title="Create Pricing">
        <SimpleForm>
            {/* <TextInput  source="name" validate={[required()]} /> */}
             <ReferenceInput source="procedure" reference="procedure" >
                <AutocompleteInput optionText="name" 
                filterToQuery={searchText => ({ name: searchText })} 
                validate={[required()]} />
            </ReferenceInput>
            <NumberInput  source="fee" />
             <DateInput  label="Effective date" source="effectiveDate" defaultValue={new Date()} />
        
        </SimpleForm>
    </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const PricingList = () => {
    
    
    return(
    <List title="Pricing">
        <Datagrid  rowClick="show">
          
            {/* <TextField  source="id" /> */}
            <TextField  source="index" />
            <ReferenceField  source="procedure" reference="procedure">
                <TextField  source="name" />
            </ReferenceField >
            <NumberField  source="fee" />
            <DateField  source="effectiveDate" field={DateField} />
           
        </Datagrid >
    </List>)
};
export const PricingShow = (props) => (
  <Show {...props} title="View Pricing">
    <SimpleShowLayout>
        <TextField  source="index" />
        <ReferenceField  source="procedure" reference="procedure">
            <TextField  source="name" />
        </ReferenceField >
        <NumberField  source="fee" />
        <DateField  source="effectiveDate" field={DateField} />
    </SimpleShowLayout>
  </Show>
);
export const PricingEdit = () => (
    <Edit title="Update Pricing">
        <SimpleForm>
             <ReferenceInput source="procedure" reference="procedure">
                <AutocompleteInput optionText="name" 
                 filterToQuery={searchText => ({ name: searchText })} 
                validate={[required()]}/>
            </ReferenceInput>
            <NumberInput  source="fee" />
             <DateInput  label="Effective date" source="effectiveDate" defaultValue={new Date()} />
        
        </SimpleForm>
    </Edit>
);