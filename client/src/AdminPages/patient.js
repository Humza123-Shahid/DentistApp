// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout, Datagrid, useRedirect, FunctionField, TextField, NumberField, List, DataTable, DateField, BooleanField, Create, SimpleForm, TextInput, NumberInput, Edit, ReferenceInput, ReferenceField, AutocompleteInput, SelectInput, RichTextInput, DateInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
const genderChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
    { id: 'other', name: 'Other' },
];

export const PatientCreate = () => {
    const choices = [
        { id: 'tech', name: 'Technology' },
        { id: 'lifestyle', name: 'Lifestyle' },
        { id: 'people', name: 'People' },
    ];
    return (
        <Create redirect="list" title="Create Patient">
            <SimpleForm>
                <TextInput source="name" validate={[required()]} />
                <TextInput source="email" />
                <TextInput source="address" />
                <TextInput source="contact" />
                <DateInput label="Date Of Birth" source="dateOfBirth" defaultValue={new Date()} />
                <NumberInput source="age" />
                {/* <TextInput source="gender" /> */}
                <SelectInput
                    source="gender"
                    choices={genderChoices}
                    defaultValue="male" // Optional
                />
                <TextInput source="nationality" />

            </SimpleForm>
        </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const PatientList = () => {


    return (
        <List title="Patient">
            <Datagrid rowClick="show">

                {/* <TextField  source="id" /> */}
                <TextField source="index" />
                <TextField source="name" />
                <TextField source="email" />
                <TextField source="address" />
                <TextField source="contact" />
                <DateField source="dateOfBirth" field={DateField} />
                <NumberField source="age" />
                <TextField source="gender" />
                <TextField source="nationality" />
            </Datagrid >
        </List>)
};
export const PatientShow = (props) => (
    <Show {...props} title="View Patient">
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="address" />
            <TextField source="contact" />
            <DateField source="dateOfBirth" field={DateField} />
            <NumberField source="age" />
            <TextField source="gender" />
            <TextField source="nationality" />
        </SimpleShowLayout>
    </Show>
);
export const PatientEdit = () => (
    <Edit title="Update Patient">
        <SimpleForm>
            <TextInput source="name" validate={[required()]} />
            <TextInput source="email" />
            <TextInput source="address" />
            <TextInput source="contact" />
            <DateInput label="Date Of Birth" source="dateOfBirth" defaultValue={new Date()} />
            <NumberInput source="age" />
            {/* <TextInput source="gender" /> */}
            <SelectInput
                source="gender"
                choices={genderChoices}
                defaultValue="male" // Optional
            />
            <TextInput source="nationality" />

        </SimpleForm>
    </Edit>
);