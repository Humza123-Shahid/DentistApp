// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout, Datagrid, useRedirect, FunctionField, TextField, NumberField, List, DataTable, DateField, BooleanField, Create, SimpleForm, TextInput, NumberInput, Edit, ReferenceInput, ReferenceField, AutocompleteInput, SelectInput, RichTextInput, DateInput, TimeInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
const genderChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
    { id: 'other', name: 'Other' },
];

export const PaymentCreate = () => {
    const choices = [
        { id: 'tech', name: 'Technology' },
        { id: 'lifestyle', name: 'Lifestyle' },
        { id: 'people', name: 'People' },
    ];
    return (
        <Create redirect="list" title="Create Payment">
            <SimpleForm>
                {/* <TextInput  source="name" validate={[required()]} /> */}
                <ReferenceInput source="patientId" reference="patient" >
                    <AutocompleteInput optionText="name"
                        filterToQuery={searchText => ({ name: searchText })}
                        validate={[required()]} />
                </ReferenceInput>
                <ReferenceInput source="providerId" reference="dentist" >
                    <AutocompleteInput optionText="name"
                        filterToQuery={searchText => ({ name: searchText })}
                        validate={[required()]} />
                </ReferenceInput>
                <ReferenceInput source="appointmentId" reference="appointment" >
                    <AutocompleteInput optionText="appointmentDate"
                        filterToQuery={searchText => ({ name: searchText })}
                        validate={[required()]} />
                </ReferenceInput>
                <DateInput label="Payment date" source="paymentDate" defaultValue={new Date()} />
                <TextInput source="paymentMethod" />
                <TextInput source="paymentType" />
                <NumberInput source="amount" />
                <TextInput source="notes" />

            </SimpleForm>
        </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const PaymentList = () => {


    return (
        <List title="Payment">
            <Datagrid rowClick="show">

                {/* <TextField  source="id" /> */}
                <TextField source="index" />
                <ReferenceField source="patientId" reference="patient">
                    <TextField source="name" />
                </ReferenceField >
                <ReferenceField source="providerId" reference="dentist">
                    <TextField source="name" />
                </ReferenceField >
                <ReferenceField source="appointmentId" reference="appointment">
                    <TextField source="appointmentDate" />
                </ReferenceField >
                <DateField source="paymentDate" field={DateField} />

                <TextField source="paymentMethod" />
                <TextField source="paymentType" />
                <NumberField source="amount" />

                <TextField source="notes" />
            </Datagrid >
        </List>)
};
export const PaymentShow = (props) => (
    <Show {...props} title="View Payment">
        <SimpleShowLayout>
            <ReferenceField source="patientId" reference="patient">
                <TextField source="name" />
            </ReferenceField >
            <ReferenceField source="providerId" reference="dentist">
                <TextField source="name" />
            </ReferenceField >
            <ReferenceField source="appointmentId" reference="appointment">
                <TextField source="appointmentDate" />
            </ReferenceField >
            <DateField source="paymentDate" field={DateField} />

            <TextField source="paymentMethod" />
            <TextField source="paymentType" />
            <NumberField source="amount" />

            <TextField source="notes" />
        </SimpleShowLayout>
    </Show>
);
export const PaymentEdit = () => (
    <Edit title="Update Payment">
        <SimpleForm>
            <ReferenceInput source="patientId" reference="patient" >
                <AutocompleteInput optionText="name"
                    filterToQuery={searchText => ({ name: searchText })}
                    validate={[required()]} />
            </ReferenceInput>
            <ReferenceInput source="providerId" reference="dentist" >
                <AutocompleteInput optionText="name"
                    filterToQuery={searchText => ({ name: searchText })}
                    validate={[required()]} />
            </ReferenceInput>
            <ReferenceInput source="appointmentId" reference="appointment" >
                <AutocompleteInput optionText="appointmentDate"
                    filterToQuery={searchText => ({ name: searchText })}
                    validate={[required()]} />
            </ReferenceInput>
            <DateInput label="Payment date" source="paymentDate" defaultValue={new Date()} />
            <TextInput source="paymentMethod" />
            <TextInput source="paymentType" />
            <NumberInput source="amount" />
            <TextInput source="notes" />

        </SimpleForm>
    </Edit>
);