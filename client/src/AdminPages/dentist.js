// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,useRedirect ,FunctionField, TextField,NumberField,List, DataTable, DateField, BooleanField,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,AutocompleteInput,SelectInput,RichTextInput, DateInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
const genderChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
    { id: 'other', name: 'Other' },
];

export const DentistCreate = () => {
  const choices = [
    { id: 'tech', name: 'Technology' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
return(
    <Create redirect="list" title="Create Dentist">
        <SimpleForm>
            <TextInput  source="name" validate={[required()]} />
            <NumberInput  source="salary" />
            <TextInput  source="contact"/>
            <TextInput  source="specialization" multiline={true}/>
            
            <NumberInput  source="experienceLevel" />
             <SelectInput 
                source="gender" 
                choices={genderChoices} 
                defaultValue="male" // Optional
            />
            {/* <TextInput  source="gender"/> */}
            {/* <AutocompleteInput source="category" choices={choices} /> */}
            
            {/* <RichTextInput source="body" /> */}
            {/* <DateInput  label="Publication date" source="published_at" defaultValue={new Date()} /> */}
        </SimpleForm>
    </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const DentistList = () => {
    
    
    return(
    <List title="Dentist">
        <Datagrid  rowClick="show">
          
            {/* <TextField  source="id" /> */}
            <TextField  source="index" />
            <TextField  source="name" />
            <NumberField  source="salary" />
            <TextField  source="contact" />
            <TextField  source="specialization" />
            {/* <DateField  source="published_at" field={DateField} /> */}
            
            <NumberField  source="experienceLevel" />
            <TextField source="gender" />
            {/* <DataTable.Col source="commentable" field={BooleanField} /> */}
        </Datagrid >
    </List>)
};
export const DentistShow = (props) => (
  <Show {...props} title="View Dentist">
    <SimpleShowLayout>
      {/* <TextField source="description" /> */}
           <TextField  source="name" />
            <NumberField  source="salary" />
            <TextField  source="contact" />
            <TextField  source="specialization" />
            {/* <DateField  source="published_at" field={DateField} /> */}
            <NumberField  source="experienceLevel" />
            <TextField source="gender" />
      {/* <DateField source="published_at" field={DateField} /> */}
    </SimpleShowLayout>
  </Show>
);
export const DentistEdit = () => (
    <Edit title="Update Dentist">
        <SimpleForm>
            {/* <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="content" multiline /> */}
          <TextInput  source="name" validate={[required()]} />
            <NumberInput  source="salary" />
            <TextInput  source="contact"/>
            <TextInput  source="specialization" multiline={true}/>
            
            <NumberInput  source="experienceLevel" />
             <SelectInput 
                source="gender" 
                choices={genderChoices} 
                defaultValue="male" // Optional
            />
        </SimpleForm>
    </Edit>
);