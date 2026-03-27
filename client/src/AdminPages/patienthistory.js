// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout, Datagrid, useRedirect, FunctionField, TextField, NumberField, List, DataTable, DateField, BooleanField, Create, SimpleForm, TextInput, NumberInput, Edit, ReferenceInput, ReferenceField, AutocompleteInput, SelectInput, RichTextInput, DateInput,FileInput,FileField, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
const genderChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
    { id: 'other', name: 'Other' },
];

export const PatientHistoryCreate = () => {
    const choices = [
        { id: 'tech', name: 'Technology' },
        { id: 'lifestyle', name: 'Lifestyle' },
        { id: 'people', name: 'People' },
    ];
    return (
        <Create redirect="list" title="Create PatientHistory">
            <SimpleForm>
                {/* <TextInput  source="name" validate={[required()]} /> */}
                <ReferenceInput source="patient" reference="patient" >
                    <AutocompleteInput optionText="name"
                        filterToQuery={searchText => ({ name: searchText })}
                        validate={[required()]} />
                </ReferenceInput>
                <TextInput source="chronicConditions" />
                <TextInput source="cavaties" />
                <TextInput source="crowns" />
                <TextInput source="fillings" />
                <FileInput  source="file" label="Upload Xray File">
                    <FileField source="src" title="title" target="_blank"/>
                </FileInput >
                <FileInput  source="file2" label="Upload IntraoralScan File" >
                    <FileField source="src" title="title" target="_blank" />
                </FileInput >

            </SimpleForm>
        </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const PatientHistoryList = () => {


    return (
        <List title="PatientHistory">
            <Datagrid rowClick="show">

                {/* <TextField  source="id" /> */}
                <TextField source="index" />
                <ReferenceField source="patient" reference="patient">
                    <TextField source="name" />
                </ReferenceField >
                <TextField source="chronicConditions" />
                <TextField source="cavaties" />
                <TextField source="crowns" />
                <TextField source="fillings" />
                <TextField source="xrayFilePath" />
                <TextField source="intraoralscanFilePath" />

            </Datagrid >
        </List>)
};
export const PatientHistoryShow = (props) => (
    <Show {...props} title="View PatientHistory">
        <SimpleShowLayout>
            {/* <TextField  source="index" /> */}
            <ReferenceField source="patient" reference="patient">
                    <TextField source="name" />
                </ReferenceField >
                <TextField source="chronicConditions" />
                <TextField source="cavaties" />
                <TextField source="crowns" />
                <TextField source="fillings" />
                <TextField source="xrayFilePath" />
                <TextField source="intraoralscanFilePath" />

        </SimpleShowLayout>
    </Show>
);
export const PatientHistoryEdit = () => (
    <Edit title="Update PatientHistory">
        <SimpleForm>
            <ReferenceInput source="patient" reference="patient" >
                    <AutocompleteInput optionText="name"
                        filterToQuery={searchText => ({ name: searchText })}
                        validate={[required()]} />
                </ReferenceInput>
                <TextInput source="chronicConditions" />
                <TextInput source="cavaties" />
                <TextInput source="crowns" />
                <TextInput source="fillings" />
                <FileInput  source="file" label="Upload Xray File">
                    <FileField source="src" title="title" target="_blank"/>
                </FileInput >
                <FileInput  source="file2" label="Upload IntraoralScan File" >
                    <FileField source="src" title="title2" target="_blank" />
                </FileInput >

        </SimpleForm>
    </Edit>
);