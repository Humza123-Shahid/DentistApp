// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,useRedirect ,FunctionField, TextField,NumberField,List, DataTable, DateField, BooleanField,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,AutocompleteInput,SelectInput,RichTextInput, DateInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import CustomPagination from './CustomPagination';


export const InventoryCreate = () => {
  const choices = [
    { id: 'tech', name: 'Technology' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
return(
    <Create redirect="list" title="Create Inventory">
        <SimpleForm>
            <TextInput  source="name" validate={[required()]} />
            <NumberInput  source="quantity" />
            <TextInput  source="description" multiline={true}/>
            <NumberInput  source="costPerUnit" />
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
export const InventoryList = () => {
    
    
    return(
    <List title="Inventory" pagination={<CustomPagination />}>
        <Datagrid  rowClick="show">
          
            {/* <TextField  source="id" /> */}
            <TextField  source="index" label="#" />
            <TextField  source="name" />
            <NumberField  source="quantity" />
            <TextField  source="description" />
            <NumberField  source="costPerUnit" />
            {/* <DataTable.Col source="commentable" field={BooleanField} /> */}
        </Datagrid >
    </List>)
};
export const InventoryShow = (props) => (
  <Show {...props} title="View Inventory">
    <SimpleShowLayout>
      {/* <TextField source="description" /> */}
            <TextField  source="name" />
            <NumberField  source="quantity" />
            <TextField  source="description" />
            <NumberField  source="costPerUnit" />
      {/* <DateField source="published_at" field={DateField} /> */}
    </SimpleShowLayout>
  </Show>
);
export const InventoryEdit = () => (
    <Edit title="Update Inventory">
        <SimpleForm>
            {/* <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="content" multiline /> */}
            <TextInput  source="name" validate={[required()]} />
            <NumberInput  source="quantity" />
            <TextInput  source="description" multiline={true}/>
            <NumberInput  source="costPerUnit" />
        </SimpleForm>
    </Edit>
);