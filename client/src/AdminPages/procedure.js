// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,useRedirect ,FunctionField, TextField,NumberField,List, DataTable, DateField, BooleanField,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,AutocompleteInput,SelectInput,RichTextInput, DateInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';

export const ProcedureCreate = () => {
  const choices = [
    { id: 'tech', name: 'Technology' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
return(
    <Create redirect="list" title="Create Procedure">
        <SimpleForm>
            <TextInput  source="name" validate={[required()]} />
            <TextInput  source="code"/>
            <TextInput  source="description" multiline={true}/>
            <TextInput  source="category"/>
            <NumberInput  source="durationMinutes" />
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
export const ProcedureList = () => {
    
    
    return(
    <List title="Procedure">
        <Datagrid  rowClick="show">
          
            {/* <TextField  source="id" /> */}
            <TextField  source="index" />
            <TextField  source="name" />
            <TextField  source="code" />
            <TextField  source="description" />
            {/* <DateField  source="published_at" field={DateField} /> */}
            <TextField source="category" />
            <NumberField  source="durationMinutes" />
            {/* <DataTable.Col source="commentable" field={BooleanField} /> */}
        </Datagrid >
    </List>)
};
export const ProcedureShow = (props) => (
  <Show {...props} title="View Procedure">
    <SimpleShowLayout>
      {/* <TextField source="description" /> */}
            <TextField  source="name" />
            <TextField  source="code" />
            <TextField  source="description" />
            {/* <DateField  source="published_at" field={DateField} /> */}
            <TextField source="category" />
            <NumberField  source="durationMinutes" />
      {/* <DateField source="published_at" field={DateField} /> */}
    </SimpleShowLayout>
  </Show>
);
export const ProcedureEdit = () => (
    <Edit title="Update Procedure">
        <SimpleForm>
            {/* <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="content" multiline /> */}
            <TextInput  source="name" validate={[required()]} />
            <TextInput  source="code"/>
            <TextInput  source="description" multiline={true}/>
            <TextInput  source="category"/>
            <NumberInput  source="durationMinutes" />
        </SimpleForm>
    </Edit>
);