// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,useRedirect ,FunctionField, TextField,NumberField,List, DataTable, DateField, BooleanField,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,ReferenceField,AutocompleteInput,SelectInput,RichTextInput, DateInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import CustomPagination from './CustomPagination';


export const SocialCreate = () => {
  const choices = [
    { id: 'tech', name: 'Technology' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
return(
    <Create redirect="list" title="Create Social">
        <SimpleForm>
            <TextInput  label="Platform Name" source="platformName" validate={[required()]}/>
            <TextInput  source="url"/>
            
        </SimpleForm>
    </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const SocialList = () => {
    
    
    return(
    <List title="Social" pagination={<CustomPagination />}>
        <Datagrid  rowClick="show">
          
            {/* <TextField  source="id" /> */}
            <TextField  source="index" label="#" />
            
            <TextField  source="platformName" />
            <TextField  source="url" />
            
        </Datagrid >
    </List>)
};
export const SocialShow = (props) => (
  <Show {...props} title="View Social">
    <SimpleShowLayout>
         <TextField  source="platformName" />
            <TextField  source="url" />
    </SimpleShowLayout>
  </Show>
);
export const SocialEdit = () => (
    <Edit title="Update Social">
        <SimpleForm>
             <TextInput  label="Platform Name" source="platformName" validate={[required()]}/>
            <TextInput  source="url"/>
        
        </SimpleForm>
    </Edit>
);