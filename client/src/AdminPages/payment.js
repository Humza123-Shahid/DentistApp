// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout, Datagrid, useRedirect, FunctionField,useGetMany, useListContext,useRecordContext, TextField, NumberField, List, DataTable, DateField, BooleanField, Create, SimpleForm, TextInput, NumberInput, Edit, ReferenceInput, ReferenceField, AutocompleteInput, SelectInput, RichTextInput, DateInput, TimeInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { useCallback,useMemo } from 'react';
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

export const PaymentCreate = () => {
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
        <Create redirect="list" title="Create Payment">
            <SimpleForm>
                {/* <TextInput  source="name" validate={[required()]} /> */}
                <ReferenceInput source="patientId" reference="patient" perPage={999999}>
                    <AutocompleteInput optionText="name"
                        // filterToQuery={searchText => ({ name: searchText })}
                        filterToQuery={filterToQuery}
                        validate={[required()]} />
                </ReferenceInput>
                <ReferenceInput source="providerId" reference="dentist" perPage={999999}>
                    <AutocompleteInput optionText="name"
                        filterToQuery={filterToQuery}
                        validate={[required()]} />
                </ReferenceInput>
                <ReferenceInput source="appointmentId" reference="appointment" perPage={999999}>
                    <AutocompleteInput optionText="appointmentDate"
                        filterToQuery={filterToQuery}
                        validate={[required()]} />
                </ReferenceInput>
                <DateInput label="Payment date" source="paymentDate" defaultValue={defaultDate} />
                <TextInput source="paymentMethod" />
                <TextInput source="paymentType" />
                <NumberInput source="totalAmount" />
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
                <TextField source="index" label="#" />
                {/* <ReferenceField source="patientId" reference="patient">
                    <TextField source="name" />
                </ReferenceField >
                <ReferenceField source="providerId" reference="dentist">
                    <TextField source="name" />
                </ReferenceField >
                <ReferenceField source="appointmentId" reference="appointment">
                    <TextField source="appointmentDate" />
                </ReferenceField > */}
                 <StableReferenceField
                    source="patientId"
                    reference="patient"
                    displayField="name"
                />
                <StableReferenceField
                    source="providerId"
                    reference="dentist"
                    displayField="name"
                />
                <StableReferenceField
                    source="appointmentId"
                    reference="appointment"
                    displayField="appointmentDate"
                />
                <DateField source="paymentDate" field={DateField} />

                <TextField source="paymentMethod" />
                <TextField source="paymentType" />
                <NumberField source="totalAmount" />
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
             <NumberField source="totalAmount" />
            <NumberField source="amount" />

            <TextField source="notes" />
        </SimpleShowLayout>
    </Show>
);
export const PaymentEdit = () => {
     const filterToQuery = useCallback(
      (searchText) => ({ name: searchText }),
      []
    );
    return(
    <Edit title="Update Payment">
        <SimpleForm>
            <ReferenceInput source="patientId" reference="patient" perPage={999999}>
                <AutocompleteInput optionText="name"
                    filterToQuery={filterToQuery}
                    validate={[required()]} />
            </ReferenceInput>
            <ReferenceInput source="providerId" reference="dentist" perPage={999999}>
                <AutocompleteInput optionText="name"
                    filterToQuery={filterToQuery}
                    validate={[required()]} />
            </ReferenceInput>
            <ReferenceInput source="appointmentId" reference="appointment" perPage={999999}>
                <AutocompleteInput optionText="appointmentDate"
                    filterToQuery={filterToQuery}
                    validate={[required()]} />
            </ReferenceInput>
            <DateInput label="Payment date" source="paymentDate"/>
            <TextInput source="paymentMethod" />
            <TextInput source="paymentType" />
            <NumberInput source="totalAmount" />
            <NumberInput source="amount" />
            <TextInput source="notes" />

        </SimpleForm>
    </Edit>
);
}