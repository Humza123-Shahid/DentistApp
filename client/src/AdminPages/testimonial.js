// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,useRedirect ,FunctionField, TextField,NumberField,List, DataTable, DateField, BooleanField,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,ReferenceField,AutocompleteInput,SelectInput,RichTextInput, DateInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import CustomPagination from './CustomPagination';


export const TestimonialCreate = () => {
  const choices = [
    { id: 'tech', name: 'Technology' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
return(
    <Create redirect="list" title="Create Testimonial">
        <SimpleForm>
            <TextInput  label="Patient Name" source="patientName" validate={[required()]}/>
            <TextInput  source="profession"/>
            <TextInput  source="comment"/>
            <DateInput  label="Review Date" source="reviewDate" defaultValue={new Date()} />
        </SimpleForm>
    </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const TestimonialList = () => {
    
    
    return(
    <List title="Testimonial" pagination={<CustomPagination />}>
        <Datagrid  rowClick="show">
          
            {/* <TextField  source="id" /> */}
            <TextField  source="index" label="#" />
            
            <TextField  source="patientName" />
            <TextField  source="profession" />
            <TextField  source="comment" />
            <DateField  source="reviewDate" field={DateField} />
        </Datagrid >
    </List>)
};
export const TestimonialShow = (props) => (
  <Show {...props} title="View Testimonial">
    <SimpleShowLayout>
         <TextField  source="patientName" />
            <TextField  source="profession" />
            <TextField  source="comment" />
            <DateField  source="reviewDate" field={DateField} />
    </SimpleShowLayout>
  </Show>
);
export const TestimonialEdit = () => (
    <Edit title="Update Testimonial">
        <SimpleForm>
             <TextInput  label="Patient Name" source="patientName" validate={[required()]}/>
            <TextInput  source="profession"/>
            <TextInput  source="comment"/>
            <DateInput  label="Review Date" source="reviewDate" defaultValue={new Date()} />
        
        </SimpleForm>
    </Edit>
);