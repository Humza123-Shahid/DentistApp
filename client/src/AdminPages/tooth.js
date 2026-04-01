// in src/posts.js
import * as React from 'react';
import { useEffect } from 'react';
import { Show, SimpleShowLayout,Datagrid,ArrayInput ,SimpleFormIterator, TextField,NumberField,List, ArrayField, DateField, SingleFieldList,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,ReferenceField,AutocompleteInput,SelectInput,ChipField, DateInput,TimeInput, required } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
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
return(
    <Create redirect="list">
    <SimpleForm>
      
      <ReferenceInput source="patient" reference="patient">
        <AutocompleteInput optionText="name" />
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
      <TextField source="index" />
      
      <ReferenceField source="patient" reference="patient">
        <TextField source="name" />
      </ReferenceField>

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
export const ToothEdit = () => (
  <Edit>
    <SimpleForm>
      
      <ReferenceInput source="patient" reference="patient">
        <AutocompleteInput optionText="name" />
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
);