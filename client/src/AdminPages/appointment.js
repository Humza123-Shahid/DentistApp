// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,useRedirect ,FunctionField, TextField,NumberField,List, DataTable, DateField, BooleanField,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,ReferenceField,AutocompleteInput,SelectInput,RichTextInput, DateInput,TimeInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
const genderChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
    { id: 'other', name: 'Other' },
];

export const AppointmentCreate = () => {
  const choices = [
    { id: 'tech', name: 'Technology' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
return(
    <Create redirect="list" title="Create Appointment">
        <SimpleForm>
            {/* <TextInput  source="name" validate={[required()]} /> */}
             <ReferenceInput source="patient" reference="patient" >
                <AutocompleteInput optionText="name" 
                filterToQuery={searchText => ({ name: searchText })} 
                validate={[required()]} />
            </ReferenceInput>
            <ReferenceInput source="dentist" reference="dentist" >
                <AutocompleteInput optionText="name" 
                filterToQuery={searchText => ({ name: searchText })} 
                validate={[required()]} />
            </ReferenceInput>
            
             <DateInput  label="Appointment date" source="appointmentDate" defaultValue={new Date()} />
             <TimeInput source="appointmentTime" />
            <NumberInput  source="durationMinutes" />
            <TextInput  source="treatmentType" />
            <TextInput  source="status" />
        </SimpleForm>
    </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const AppointmentList = () => {
    
    
    return(
    <List title="Appointment">
        <Datagrid  rowClick="show">
          
            {/* <TextField  source="id" /> */}
            <TextField  source="index" />
            <ReferenceField  source="patient" reference="patient">
                <TextField  source="name" />
            </ReferenceField >
             <ReferenceField  source="dentist" reference="dentist">
                <TextField  source="name" />
            </ReferenceField >
            
            <DateField  source="appointmentDate" field={DateField} />
            
            <DateField source="appointmentTime" showDate={false} showTime/> 
            <NumberField  source="durationMinutes" />
           <TextField  source="treatmentType" />
           <TextField  source="status" />
        </Datagrid >
    </List>)
};
export const AppointmentShow = (props) => (
  <Show {...props} title="View Appointment">
    <SimpleShowLayout>
       <ReferenceField  source="patient" reference="patient">
                <TextField  source="name" />
            </ReferenceField >
             <ReferenceField  source="dentist" reference="dentist">
                <TextField  source="name" />
            </ReferenceField >
            
            <DateField  source="appointmentDate" field={DateField} />
            
            <DateField source="appointmentTime" showDate={false} showTime/> 
            <NumberField  source="durationMinutes" />
           <TextField  source="treatmentType" />
           <TextField  source="status" />
    </SimpleShowLayout>
  </Show>
);
export const AppointmentEdit = () => (
    <Edit title="Update Appointment">
        <SimpleForm>
              <ReferenceInput source="patient" reference="patient" >
                <AutocompleteInput optionText="name" 
                filterToQuery={searchText => ({ name: searchText })} 
                validate={[required()]} />
            </ReferenceInput>
            <ReferenceInput source="dentist" reference="dentist" >
                <AutocompleteInput optionText="name" 
                filterToQuery={searchText => ({ name: searchText })} 
                validate={[required()]} />
            </ReferenceInput>
            
             <DateInput  label="Appointment date" source="appointmentDate" defaultValue={new Date()} />
             <TimeInput source="appointmentTime" />
            <NumberInput  source="durationMinutes" />
            <TextInput  source="treatmentType" />
            <TextInput  source="status" />
        
        </SimpleForm>
    </Edit>
);