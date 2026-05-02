// in src/posts.js
import * as React from 'react';
import { useEffect,useState } from 'react';
import { Show, SimpleShowLayout,Datagrid,useRedirect ,FunctionField, TextField,NumberField,List, DataTable, DateField, BooleanField,Create, SimpleForm, TextInput,NumberInput,Edit,ReferenceInput,ReferenceField,AutocompleteInput,SelectInput,RichTextInput, DateInput, required, useRecordContext } from 'react-admin';
// import RichTextInput from 'ra-input-rich-text';
import CustomPagination from './CustomPagination';


export default function SettingsUI({caseCheck}) {
  //const [settings, setSettings] = useState(SEED);   // replace SEED with [] when using real API
  const record=useRecordContext();
  console.log("RECORD:", record);
  

  //const [form, setForm] = useState({ key: record?.key, value: record?.value, category: record?.category });
  const [form, setForm] = useState({ key: "", value: "", category: "contact" });
 // console.log(record?.key)
  const [formError, setFormError] = useState("");
const KEY_PLACEHOLDER = {
  contact: "e.g. phone_number",
  timings: "e.g. office_hours",
  email:   "e.g. support_email",
  general: "e.g. site_name",
};
const CATEGORIES = ["contact", "timings", "email"];
const TABS = ["all", ...CATEGORIES];

const CATEGORY_META = {
  contact: { label: "Contact",  color: "#185FA5", bg: "#E6F1FB", icon: "📞" },
  timings: { label: "Timings",  color: "#3B6D11", bg: "#EAF3DE", icon: "🕐" },
  email:   { label: "Email",    color: "#854F0B", bg: "#FAEEDA", icon: "✉️" },
  general: { label: "General",  color: "#5F5E5A", bg: "#F1EFE8", icon: "⚙️" },
};




 useEffect(() => {
  if (!record) return;  // already have this, it's fine
  setForm({
    key: record.key ?? "",
    value: record.value ?? "",
    category: record.category ?? "contact",
  });
}, [record?.id, record?.key, record?.value, record?.category]);

  // ── Add ───────────────────────────────────────────────────────────────────
  const handleAdd = async () => {
    if (!form.key.trim() || !form.value.trim()) {
      setFormError("Both key and value are required.");
      return;
    }
    setFormError("");

    const newSetting = { ...form, _id: "id_" + Date.now() }; // optimistic
    // In production: const newSetting = await api.create(form);
const response=await fetch("http://localhost:5000/api/setting/addsetting",{
        method:'POST',
        headers:{
            'Content-Type':'application/json' ,
            'auth-token':localStorage.getItem('token')
        },
        // body:JSON.stringify({staff_id,event_id,role_id,shift_start,shift_end})
        body:JSON.stringify(form)

      });
      alert("Setting saved successfully!!")
    //setSettings((prev) => [...prev, newSetting]);
    setForm((f) => ({ ...f, key: "", value: "" }));
    
    
  };
  // ── Edit ───────────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    if (!form.key.trim() || !form.value.trim()) {
      setFormError("Both key and value are required.");
      return;
    }
    setFormError("");

    const newSetting = { ...form, _id: "id_" + Date.now() }; // optimistic
    // In production: const newSetting = await api.create(form);
const response=await fetch(`http://localhost:5000/api/setting/updatesetting/${record?.id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json' ,
            'auth-token':localStorage.getItem('token')
        },
        // body:JSON.stringify({staff_id,event_id,role_id,shift_start,shift_end})
        body:JSON.stringify(form)

      });
      alert("Setting updated successfully!!")
    //setSettings((prev) => [...prev, newSetting]);
    //setForm((f) => ({ ...f, key: "", value: "" }));
    
    
  };


  // ── Styles ────────────────────────────────────────────────────────────────
  const s = {
    page: {
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      background: "#f5f4f1",
      padding: "40px 24px",
      color: "#1a1a1a",
    },
    container: {
      maxWidth: 720,
      margin: "0 auto",
    },
    heading: {
      fontSize: 26, fontWeight: 700, letterSpacing: "-.02em",
      marginBottom: 4, display: "flex", alignItems: "center", gap: 10,
    },
    subheading: {
      fontSize: 13, color: "#888", marginBottom: 28,
    },
    savedPill: {
      fontSize: 11, fontWeight: 600, padding: "3px 10px",
      borderRadius: 20, background: "#EAF3DE", color: "#3B6D11",
      transition: "opacity .3s",
      
    },

    sectionLabel: {
      fontSize: 11, fontWeight: 700, letterSpacing: ".08em",
      textTransform: "uppercase", color: "#aaa", marginBottom: 14,
    },
    addCard: {
      background: "#fff", border: "1px dashed #d0cdc7",
      borderRadius: 12, padding: "20px 22px", marginBottom: 14,
    },
    formRow: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 },
    inputGroup: { display: "flex", flexDirection: "column", gap: 5 },
    label: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#999" },
    input: {
      fontSize: 13, padding: "8px 11px",
      border: "1px solid #e0ddd8", borderRadius: 7,
      background: "#faf9f7", color: "#1a1a1a",
      outline: "none", width: "100%",
      transition: "border-color .15s",
    },
    select: {
      fontSize: 13, padding: "8px 11px",
      border: "1px solid #e0ddd8", borderRadius: 7,
      background: "#faf9f7", color: "#1a1a1a",
      cursor: "pointer", outline: "none",
    },
    btnPrimary: {
      fontSize: 13, fontWeight: 600, padding: "9px 20px",
      borderRadius: 7, background: "#1a1a1a", color: "#fff",
      border: "none", cursor: "pointer",
    },

    errorText: { fontSize: 12, color: "#c0392b", marginTop: 4 },
    emptyState: {
      textAlign: "center", padding: "32px 0",
      fontSize: 13, color: "#bbb",
    }
  };

  return (
    <div style={s.page}>
      <div style={s.container}>

        {/* Header */}
        <div style={s.heading}>
          Settings
          
        </div>
        <p style={s.subheading}>
          Manage application configuration — contact, timings, and email settings.
        </p>

        

        {/* Add new setting */}
        <div style={s.addCard}>
          <p style={s.sectionLabel}>Add new setting</p>
          <div style={s.formRow}>
            <div style={{ ...s.inputGroup, minWidth: 130 }}>
              <label style={s.label}>Category</label>
              <select
                style={s.select}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_META[c].label}</option>
                ))}
              </select>
            </div>
            <div style={{ ...s.inputGroup, flex: 1, minWidth: 150 }}>
              <label style={s.label}>Key</label>
              <input
                style={s.input}
                placeholder={KEY_PLACEHOLDER[form.category]}
                value={form.key}
                onChange={(e) => setForm((f) => ({ ...f, key: e.target.value }))}
                // onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
            <div style={{ ...s.inputGroup, flex: 2, minWidth: 180 }}>
              <label style={s.label}>Value</label>
              <input
                style={s.input}
                placeholder="Enter value"
                value={form.value}
                onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                // onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {caseCheck=="edit"?<button style={s.btnPrimary} onClick={handleUpdate}>Update setting</button>:<button style={s.btnPrimary} onClick={handleAdd}>Add setting</button>}
            {/* <button style={s.btnPrimary} onClick={handleAdd}>Add setting</button> */}
            {formError && <span style={s.errorText}>{formError}</span>}
          </div>
        </div>

        {/* Settings list */}
        </div>
    </div>
  );
}
export const SettingCreate = () => {
  const choices = [
    { id: 'tech', name: 'Technology' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
return(
    
    <SettingsUI/>
    
)
};
const sequentialId = (record, source, index) => {
    // Note: 'record' refers to the item, 'index' is the 0-based index in the current page
    // This requires calculating based on the current pagination
    return index + 1; // Simplest version (resets per page)
};
export const SettingList = () => {
    
    
    return(
    <List title="Setting" pagination={<CustomPagination />}>
        <Datagrid  rowClick="show">
          
            {/* <TextField  source="id" /> */}
            <TextField  source="index" label="#" />
            
            <TextField  source="key" />
            <TextField  source="value" />
            <TextField  source="category" />
            
        </Datagrid >
    </List>)
};
export const SettingShow = (props) => (
  <Show {...props} title="View Setting">
    <SimpleShowLayout>
        <TextField  source="key" />
            <TextField  source="value" />
            <TextField  source="category" />
    
    </SimpleShowLayout>
  </Show>
);
export const SettingEdit = () => (
  <Edit>  
    <SettingsUI caseCheck="edit"/>
    </Edit>
);