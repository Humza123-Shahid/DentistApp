// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,ArrayInput ,SimpleFormIterator,useGetMany, useListContext,useRecordContext, TextField,NumberField,List, ArrayField, DateField, SingleFieldList,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,ReferenceField,AutocompleteInput,SelectInput,ChipField, DateInput,TimeInput, required } from 'react-admin';
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

export const ToothCreate = () => {
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
    <Create redirect="list">
    <SimpleForm>
      
      <ReferenceInput source="patient" reference="patient">
        <AutocompleteInput optionText="name" 
            filterToQuery={filterToQuery}
                                validate={[required()]} />
      </ReferenceInput>

      <NumberInput source="toothNumber" />

      <ArrayInput source="procedures">
        <SimpleFormIterator>
          
          <SelectInput
            source="procedureType"
            choices={[
              { id: "Filling", name: "Filling" },
              { id: "Crown", name: "Crown" },
              { id: "Root Canal", name: "Root Canal" },
              { id: "Extraction", name: "Extraction" },
              { id: "Implant", name: "Implant" }, 
              { id: "Veneer", name: "Veneer" },
              { id: "Bridge", name: "Bridge" },
              { id: "Cleaning", name: "Cleaning" }
            ]}
          />

          <DateInput source="date" defaultValue={defaultDate}/>

          <SelectInput
            source="status"
            choices={[
              { id: "Completed", name: "Completed" },
              { id: "Planned", name: "Planned" },
              { id: "Existing", name: "Existing" }
            ]}
          />

        </SimpleFormIterator>
      </ArrayInput>

    </SimpleForm>
  </Create>
)};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const ToothList = () => {
    return(
  <List>
    <Datagrid rowClick="show">
      <TextField source="index" label="#" />
      
      {/* <ReferenceField source="patient" reference="patient">
        <TextField source="name" />
      </ReferenceField> */}
 <StableReferenceField
                    source="patient"
                    reference="patient"
                    displayField="name"
                />
      <NumberField source="toothNumber" />

      <ArrayField source="procedures">
        <SingleFieldList>
          <ChipField source="procedureType" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);
}
export const ToothShow = (props) => (
  <Show {...props} title="View Tooth">
    <SimpleShowLayout>
      
      <ReferenceField source="patient" reference="patient">
        <TextField source="name" />
      </ReferenceField>

      <NumberField source="toothNumber" />

      <ArrayField source="procedures">
        <Datagrid bulkActionButtons={false} rowClick="">
          <TextField source="procedureType" />
          <DateField source="date" />
          <TextField source="status" />
        </Datagrid>
      </ArrayField>

    </SimpleShowLayout>
  </Show>
);
export const ToothEdit = () => {
     const filterToQuery = useCallback(
      (searchText) => ({ name: searchText }),
      []
    );
    return(
  <Edit>
    <SimpleForm>
      
      <ReferenceInput source="patient" reference="patient">
        <AutocompleteInput optionText="name" 
        filterToQuery={filterToQuery}
                                validate={[required()]} />
      </ReferenceInput>

      <NumberInput source="toothNumber" />

      <ArrayInput source="procedures">
        <SimpleFormIterator>
          
          <SelectInput
            source="procedureType"
            choices={[
              { id: "Filling", name: "Filling" },
              { id: "Crown", name: "Crown" },
              { id: "Root Canal", name: "Root Canal" },
              { id: "Extraction", name: "Extraction" },
              { id: "Sealant", name: "Sealant" }
            ]}
          />

          <DateInput source="date" />

          <SelectInput
            source="status"
            choices={[
              { id: "Completed", name: "Completed" },
              { id: "Planned", name: "Planned" },
              { id: "Existing", name: "Existing" }
            ]}
          />

        </SimpleFormIterator>
      </ArrayInput>

    </SimpleForm>
  </Edit>
);}