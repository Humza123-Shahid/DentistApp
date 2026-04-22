// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout, Datagrid, useRedirect, useGetMany, useListContext,useRecordContext, FunctionField, TextField, NumberField, List, DataTable, DateField, BooleanField, Create, SimpleForm, TextInput, NumberInput, Edit, ReferenceInput, ReferenceField, AutocompleteInput, SelectInput, RichTextInput, DateInput, TimeInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { useCallback, useMemo } from 'react';

const StableReferenceField = ({ source, reference, displayField }) => {
    const { data: listData = [] } = useListContext();

    // Stable memoized IDs — won't change reference on re-renders
    const ids = useMemo(
        () => [...new Set(listData.map(r => r[source]).filter(Boolean))],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [listData.length, source]  // ← depend on length, not array ref
    );

    const { data: refData = [] } = useGetMany(
        reference,
        { ids },
        { enabled: ids.length > 0, staleTime: Infinity }
    );

    // Build a lookup map
    const map = useMemo(
        () => Object.fromEntries(refData.map(r => [r.id, r])),
        [refData]
    );

    const record = useRecordContext();
    return <span>{map[record?.[source]]?.[displayField] ?? '—'}</span>;
};
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
    const filterToQuery = useCallback(
        (searchText) => ({ name: searchText }),
        []
    );
    const defaultDate = useMemo(() => new Date(), []);

    return (
        <Create redirect="list" title="Create Appointment">
            <SimpleForm>
                {/* <TextInput  source="name" validate={[required()]} /> */}
                <ReferenceInput source="patient" reference="patient" >
                    <AutocompleteInput optionText="name"
                        //filterToQuery={searchText => ({ name: searchText })} 
                        filterToQuery={filterToQuery}
                        validate={[required()]} />
                </ReferenceInput>
                <ReferenceInput source="dentist" reference="dentist" >
                    <AutocompleteInput optionText="name"
                        // filterToQuery={searchText => ({ name: searchText })}
                        filterToQuery={filterToQuery}
                        validate={[required()]} />
                </ReferenceInput>

                {/* <DateInput  label="Appointment date" source="appointmentDate" defaultValue={new Date()} /> */}
                <DateInput label="Appointment date" source="appointmentDate" defaultValue={defaultDate} />
                <TimeInput source="appointmentTime" />
                <NumberInput source="durationMinutes" />
                <TextInput source="treatmentType" />
                <TextInput source="status" />
            </SimpleForm>
        </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const AppointmentList = () => {


    return (
        <List title="Appointment"
        //  perPage={50}
        // pagination={<Pagination rowsPerPageOptions={[25, 50]} />}
        >
            <Datagrid rowClick="show">

                {/* <TextField  source="id" /> */}
                <TextField source="index" label="#" />
                {/* <ReferenceField  source="patient" reference="patient"  >
                <TextField  source="name" />
            </ReferenceField >
             <ReferenceField  source="dentist" reference="dentist" >
                <TextField  source="name" />
            </ReferenceField > */}
                <StableReferenceField
                    source="patient"
                    reference="patient"
                    displayField="name"
                />
                <StableReferenceField
                    source="dentist"
                    reference="dentist"
                    displayField="name"
                />
                <DateField source="appointmentDate" field={DateField} />

                <DateField source="appointmentTime" showDate={false} showTime />
                <NumberField source="durationMinutes" />
                <TextField source="treatmentType" />
                <TextField source="status" />
            </Datagrid >
        </List>)
};
export const AppointmentShow = (props) => (
    <Show {...props} title="View Appointment">
        <SimpleShowLayout>
            <ReferenceField source="patient" reference="patient" >
                <TextField source="name" />
            </ReferenceField >
            <ReferenceField source="dentist" reference="dentist">
                <TextField source="name" />
            </ReferenceField >

            <DateField source="appointmentDate" field={DateField} />

            <DateField source="appointmentTime" showDate={false} showTime />
            <NumberField source="durationMinutes" />
            <TextField source="treatmentType" />
            <TextField source="status" />
        </SimpleShowLayout>
    </Show>
);
export const AppointmentEdit = () => {
    const filterToQuery = useCallback(
        (searchText) => ({ name: searchText }),
        []
    );
    return (
        <Edit title="Update Appointment">
            <SimpleForm>
                <ReferenceInput source="patient" reference="patient" >
                    <AutocompleteInput optionText="name"
                        filterToQuery={filterToQuery}
                        validate={[required()]} />
                </ReferenceInput>
                <ReferenceInput source="dentist" reference="dentist" >
                    <AutocompleteInput optionText="name"
                        filterToQuery={filterToQuery}
                        validate={[required()]} />
                </ReferenceInput>

                {/* <DateInput  label="Appointment date" source="appointmentDate" defaultValue={new Date()} /> */}
                <DateInput label="Appointment date" source="appointmentDate" />
                <TimeInput source="appointmentTime" />
                <NumberInput source="durationMinutes" />
                <TextInput source="treatmentType" />
                <TextInput source="status" />

            </SimpleForm>
        </Edit>)
};