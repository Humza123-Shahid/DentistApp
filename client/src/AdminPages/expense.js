// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,useRedirect ,FunctionField, TextField,NumberField,List, DataTable, DateField, BooleanField,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,ReferenceField,AutocompleteInput,SelectInput,RichTextInput, DateInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import CustomPagination from './CustomPagination';

const genderChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
    { id: 'other', name: 'Other' },
];

export const ExpenseCreate = () => {
  const choices = [
    { id: 'tech', name: 'Technology' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
return(
    <Create redirect="list" title="Create Expense">
        <SimpleForm>
            <DateInput  label="Expense date" source="expenseDate" defaultValue={new Date()} />
            <TextInput  source="category"/>
            <NumberInput  source="amount" />
            <TextInput  source="notes"/>

        </SimpleForm>
    </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const ExpenseList = () => {
    
    
    return(
    <List title="Expense" perPage={10} pagination={<CustomPagination />}>
        <Datagrid  rowClick="show">
          
            {/* <TextField  source="id" /> */}
            <TextField  source="index" label="#" />
            <DateField  source="expenseDate" field={DateField} />
            <TextField  source="category" />
            <NumberField  source="amount" />
            <TextField  source="notes" />
        </Datagrid >
    </List>)
};
export const ExpenseShow = (props) => (
  <Show {...props} title="View Expense">
    <SimpleShowLayout>
        <DateField  source="expenseDate" field={DateField} />
        <TextField  source="category" />
        <NumberField  source="amount" />
        <TextField  source="notes" />
    </SimpleShowLayout>
  </Show>
);
export const ExpenseEdit = () => (
    <Edit title="Update Expense">
        <SimpleForm>
            <DateInput  label="Expense date" source="expenseDate" defaultValue={new Date()} />
            <TextInput  source="category"/>
            <NumberInput  source="amount" />
            <TextInput  source="notes"/>
        
        </SimpleForm>
    </Edit>
);