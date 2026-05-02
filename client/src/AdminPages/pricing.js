// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,useRedirect ,FunctionField, TextField,useGetMany, useListContext,useRecordContext,NumberField,List, DataTable, DateField, BooleanField,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,ReferenceField,AutocompleteInput,SelectInput,RichTextInput, DateInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import { useCallback,useMemo } from 'react';
import CustomPagination from './CustomPagination';


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

export const PricingCreate = () => {
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
return(
    <Create redirect="list" title="Create Pricing">
        <SimpleForm>
            {/* <TextInput  source="name" validate={[required()]} /> */}
             <ReferenceInput source="procedure" reference="procedure" perPage={999999}>
                <AutocompleteInput optionText="name" 
                 filterToQuery={searchText => ({ name: searchText })} 
                //filterToQuery={filterToQuery}
                validate={[required()]} />
            </ReferenceInput>
            <NumberInput  source="fee" />
             <DateInput  label="Effective date" source="effectiveDate" defaultValue={defaultDate} />
        
        </SimpleForm>
    </Create>)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const PricingList = () => {
    
    
    return(
    <List title="Pricing" pagination={<CustomPagination />}>
        <Datagrid  rowClick="show">
          
            {/* <TextField  source="id" /> */}
            <TextField  source="index" label="#" />
            {/* <ReferenceField  source="procedure" reference="procedure">
                <TextField  source="name" />
            </ReferenceField > */}
             <StableReferenceField
                    source="procedure"
                    reference="procedure"
                    displayField="name"
                />
            <NumberField  source="fee" />
            <DateField  source="effectiveDate" field={DateField} />
           
        </Datagrid >
    </List>)
};
export const PricingShow = (props) => (
  <Show {...props} title="View Pricing">
    <SimpleShowLayout>
        {/* <TextField  source="index" /> */}
        <ReferenceField  source="procedure" reference="procedure">
            <TextField  source="name" />
        </ReferenceField >
        <NumberField  source="fee" />
        <DateField  source="effectiveDate" field={DateField} />
    </SimpleShowLayout>
  </Show>
);
export const PricingEdit = () => {
     const filterToQuery = useCallback(
      (searchText) => ({ name: searchText }),
      []
    );
    return(
    <Edit title="Update Pricing">
        <SimpleForm>
             <ReferenceInput source="procedure" reference="procedure" perPage={999999}>
                <AutocompleteInput optionText="name" 
                 //filterToQuery={searchText => ({ name: searchText })} 
                filterToQuery={filterToQuery}
                validate={[required()]}/>
            </ReferenceInput>
            <NumberInput  source="fee" />
             {/* <DateInput  label="Effective date" source="effectiveDate" defaultValue={new Date()} /> */}
            <DateInput  label="Effective date" source="effectiveDate"/>

        </SimpleForm>
    </Edit>
);
}