import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Show, SimpleShowLayout, Datagrid, ReferenceManyField, useShowContext, useListContext, FunctionField, TextField, NumberField, List, DataTable, DateField, BooleanField, Create, SimpleForm, TextInput, NumberInput, Edit, ReferenceInput, ReferenceField, AutocompleteInput, SelectInput, RichTextInput, DateInput, useRecordContext, required } from 'react-admin';

const PROCEDURES = [
    { id: "filling", label: "Filling", color: "#3b82f6", symbol: "F" },
    { id: "crown", label: "Crown", color: "#f59e0b", symbol: "CR" },
    { id: "extraction", label: "Extraction", color: "#ef4444", symbol: "X" },
    { id: "rootcanal", label: "Root Canal", color: "#8b5cf6", symbol: "RC" },
    { id: "implant", label: "Implant", color: "#10b981", symbol: "IMP" },
    { id: "veneer", label: "Veneer", color: "#ec4899", symbol: "V" },
    { id: "bridge", label: "Bridge", color: "#f97316", symbol: "BR" },
    { id: "cleaning", label: "Cleaning", color: "#06b6d4", symbol: "CL" },
];

// FDI World Dental Federation tooth numbering
const UPPER_TEETH = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const LOWER_TEETH = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

const TOOTH_TYPES = {
    // Molars
    18: "molar", 17: "molar", 16: "molar",
    28: "molar", 27: "molar", 26: "molar",
    48: "molar", 47: "molar", 46: "molar",
    38: "molar", 37: "molar", 36: "molar",
    // Premolars
    15: "premolar", 14: "premolar",
    25: "premolar", 24: "premolar",
    45: "premolar", 44: "premolar",
    35: "premolar", 34: "premolar",
    // Canines
    13: "canine", 23: "canine", 43: "canine", 33: "canine",
    // Incisors
    12: "incisor", 11: "incisor", 21: "incisor", 22: "incisor",
    42: "incisor", 41: "incisor", 31: "incisor", 32: "incisor",
};

const toothShape = (type) => {
    if (type === "molar") return { w: 40, h: 44 };
    if (type === "premolar") return { w: 32, h: 40 };
    if (type === "canine") return { w: 26, h: 38 };
    return { w: 24, h: 36 };
};

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
                <TextField source="index" label="#" />
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
function ToothSVG({ toothNum, procedures, selected, onClick, activeTool }) {
    const type = TOOTH_TYPES[toothNum] || "incisor";
    const { w, h } = toothShape(type);
    const procs = procedures[toothNum] || [];
    const hasProcs = procs.length > 0;

    const isExtracted = procs.some((p) => p.id === "extraction");
    const isCrown = procs.some((p) => p.id === "crown");
    const isImplant = procs.some((p) => p.id === "implant");

    const bgColor = isExtracted
        ? "#1a1a2e"
        : isCrown
            ? "#f59e0b22"
            : isImplant
                ? "#10b98122"
                : hasProcs
                    ? "#1e293b"
                    : "#0f172a";

    const borderColor = selected
        ? "#38bdf8"
        : isExtracted
            ? "#ef4444"
            : isCrown
                ? "#f59e0b"
                : hasProcs
                    ? "#334155"
                    : "#1e293b";

    const cursor = activeTool ? "pointer" : "pointer";

    return (
        <div
            onClick={onClick}
            title={`Tooth #${toothNum}`}
            style={{
                width: w,
                height: h,
                background: bgColor,
                border: `2px solid ${borderColor}`,
                borderRadius: type === "molar" ? "8px" : type === "canine" ? "50% 50% 40% 40%" : "6px 6px 30% 30%",
                cursor,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
                boxShadow: selected
                    ? "0 0 0 2px #38bdf8, 0 0 12px #38bdf855"
                    : hasProcs
                        ? "0 2px 8px #00000055"
                        : "none",
                transform: selected ? "scale(1.12)" : "scale(1)",
                flexShrink: 0,
            }}
        >
            {/* Tooth number */}
            <span
                style={{
                    fontSize: 9,
                    color: "#64748b",
                    fontFamily: "'JetBrains Mono', monospace",
                    lineHeight: 1,
                    position: "absolute",
                    top: 3,
                }}
            >
                {toothNum}
            </span>

            {/* Tooth surface */}
            {!isExtracted && (
                <div
                    style={{
                        width: w * 0.55,
                        height: h * 0.45,
                        background: isCrown
                            ? "linear-gradient(135deg, #f59e0b55, #d97706aa)"
                            : "#1e3a5f",
                        borderRadius: type === "molar" ? "3px" : "2px",
                        marginTop: 8,
                        border: "1px solid #334155",
                    }}
                />
            )}

            {/* Procedure indicators */}
            <div
                style={{
                    position: "absolute",
                    bottom: 3,
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "90%",
                }}
            >
                {procs.slice(0, 3).map((p) => (
                    <div
                        key={p.id}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: p.color,
                            flexShrink: 0,
                        }}
                    />
                ))}
            </div>

            {/* Extraction X */}
            {isExtracted && (
                <span style={{ fontSize: 14, color: "#ef4444", fontWeight: 700, marginTop: 4 }}>
                    ✕
                </span>
            )}
        </div>
    );
}
function ProcedureBadge({ proc, onRemove }) {
    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: `${proc.color}22`,
                border: `1px solid ${proc.color}66`,
                borderRadius: 20,
                padding: "3px 10px 3px 8px",
                fontSize: 12,
                color: proc.color,
                fontFamily: "'JetBrains Mono', monospace",
            }}
        >
            <span
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: proc.color,
                    display: "inline-block",
                }}
            />
            {proc.label}
            <button
                onClick={onRemove}
                style={{
                    background: "none",
                    border: "none",
                    color: proc.color,
                    cursor: "pointer",
                    padding: 0,
                    fontSize: 12,
                    lineHeight: 1,
                    opacity: 0.7,
                }}
            >
                ×
            </button>
        </div>
    );
}
export default function TeethMap() {

    const storedId = localStorage.getItem('patientId');
    console.log(storedId)
    const patient_id = JSON.parse(storedId);
    console.log(patient_id)
    //   const [procedures, setProcedures] = useState({
    //     16: [PROCEDURES[0]], // filling on 16
    //     11: [PROCEDURES[1]], // crown on 11
    //     36: [PROCEDURES[2]], // extraction on 36
    //     46: [PROCEDURES[3]], // root canal on 46
    //     14: [PROCEDURES[4]], // implant
    //     22: [PROCEDURES[5]], // veneer
    //   });
    const transformToothData = (apiResponse) => {
        const result = {};

        apiResponse.forEach((record) => {
            const { toothNumber, procedures } = record;

            // Skip if no procedures
            if (!procedures || procedures.length === 0) return;

            procedures.forEach((proc) => {
                // Match procedureType to PROCEDURES array (case-insensitive, ignore spaces)
                const matched = PROCEDURES.find(
                    (p) => p.label.toLowerCase().replace(/\s+/g, "") ===
                        proc.procedureType.toLowerCase().replace(/\s+/g, "")
                );

                if (!matched) return;

                // If tooth doesn't exist yet, initialize with first match
                if (!result[toothNumber]) {
                    result[toothNumber] = [];
                }

                if (matched) {
                    // Avoid duplicate procedure types per tooth
                    const alreadyExists = result[toothNumber].some((p) => p.id === matched.id);
                    if (!alreadyExists) {
                        result[toothNumber].push(matched);
                    }
                }
            });
        });

        return result;
    };
    const [procedures, setProcedures] = useState({});
    useEffect(() => {
        console.log(patient_id)
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/api/tooth/fetchtoothsbypatient/${patient_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json();
            console.log(json.data);
            const transformed = transformToothData(json.data);
            setProcedures(transformed);
            //    json.data.forEach(item => {
            //       const key = item.toothNumber; // Attribute 1: Becomes the key
            //       let value=[]
            //       item.procedures.forEach(item2 => {
            //         console.log(item2.procedureType)
            //         if(item2.procedureType=="Filling")
            //         {
            //             value.push(PROCEDURES[0])

            //         }
            //         else if(item2.procedureType=="Crown")
            //         {
            //         value.push(PROCEDURES[1])

            //         }
            //          else if(item2.procedureType=="Extraction")
            //         {
            //         value.push(PROCEDURES[2])

            //         }
            //          else if(item2.procedureType=="Rootcanal")
            //         {
            //         value.push(PROCEDURES[3])

            //         }
            //          else if(item2.procedureType=="Implant")
            //         {
            //         value.push(PROCEDURES[4])

            //         }
            //          else if(item2.procedureType=="Veneer")
            //         {
            //        value.push(PROCEDURES[5])

            //         }
            //          else if(item2.procedureType=="Bridge")
            //         {
            //         value.push(PROCEDURES[6])

            //         }
            //          else if(item2.procedureType=="Cleaning")
            //         {
            //         value.push(PROCEDURES[7])

            //         }
            //       })
            //       //= item.procedures; // Attribute 2: Becomes the value

            //       setProcedures2(prev => {
            //         // 3. Append logic: If key exists, add to it; otherwise initialize
            //         const existingValue = prev[key] || []; // Or [] if appending to an array
            //         return {
            //           ...prev,
            //           [key]: existingValue + value 
            //         };
            //       });
            //     });
            //setAdmissions(json)
        }
        fetchData();
    }, []);
    useEffect(() => {
        console.log(procedures)
    }, [procedures]);
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [activeTool, setActiveTool] = useState(null);
    // const [patientName] = useState("Ahmed Al-Rashid");
    const [tab, setTab] = useState("chart");

    const handleToothClick = (toothNum) => {
        if (activeTool) {
            setProcedures((prev) => {
                const existing = prev[toothNum] || [];
                if (existing.some((p) => p.id === activeTool.id)) return prev;
                return { ...prev, [toothNum]: [...existing, activeTool] };
            });
        } else {
            setSelectedTooth(toothNum === selectedTooth ? null : toothNum);
        }
    };

    const removeProcedure = (toothNum, procId) => {
        setProcedures((prev) => {
            const updated = (prev[toothNum] || []).filter((p) => p.id !== procId);
            if (updated.length === 0) {
                const { [toothNum]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [toothNum]: updated };
        });
    };

    const totalProcedures = Object.values(procedures).flat().length;
    const affectedTeeth = Object.keys(procedures).length;

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#060b14",
                color: "#e2e8f0",
                fontFamily: "'Syne', 'Segoe UI', sans-serif",
                padding: "24px 16px",
                backgroundImage:
                    "radial-gradient(ellipse at 20% 50%, #0a1628 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #0d1f3c 0%, transparent 50%)",
            }}
        >
            {/* Google Font */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
      `}</style>

            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 28,
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize: 18,
                                color: "#38bdf8",
                                letterSpacing: "0.15em",
                                fontFamily: "'JetBrains Mono', monospace",
                                textTransform: "uppercase",
                                marginBottom: 0,
                                // padding: "23px 0px"
                            }}
                        >
                            Dental Chart — FDI Notation
                        </div>
                        {/* <h1
                            style={{
                                fontSize: 26,
                                fontWeight: 800,
                                margin: 0,
                                color: "#f1f5f9",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {patientName}
                        </h1>
                        <div
                            style={{
                                fontSize: 12,
                                color: "#475569",
                                marginTop: 4,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            Last visit: 22 Mar 2026 · Dr. Fatima Siddiqui
                        </div> */}
                    </div>

                    {/* Stats */}
                    <div style={{ display: "flex", gap: 16 }}>
                        {[
                            { label: "Procedures", value: totalProcedures },
                            { label: "Teeth Affected", value: affectedTeeth },
                        ].map((s) => (
                            <div
                                key={s.label}
                                style={{
                                    background: "#0f172a",
                                    border: "1px solid #1e293b",
                                    borderRadius: 12,
                                    padding: "12px 20px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 800,
                                        color: "#38bdf8",
                                        lineHeight: 1,
                                    }}
                                >
                                    {s.value}
                                </div>
                                <div
                                    style={{
                                        fontSize: 11,
                                        color: "#475569",
                                        marginTop: 2,
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}
                                >
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                    {["chart", "history"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            style={{
                                background: tab === t ? "#1e3a5f" : "transparent",
                                border: `1px solid ${tab === t ? "#38bdf8" : "#1e293b"}`,
                                color: tab === t ? "#38bdf8" : "#475569",
                                borderRadius: 8,
                                padding: "7px 18px",
                                cursor: "pointer",
                                fontSize: 13,
                                fontFamily: "'JetBrains Mono', monospace",
                                textTransform: "capitalize",
                                transition: "all 0.2s",
                            }}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {tab === "chart" && (
                    <>
                        {/* Tool Palette */}
                        <div
                            style={{
                                background: "#0a1220",
                                border: "1px solid #1e293b",
                                borderRadius: 14,
                                padding: "14px 18px",
                                marginBottom: 20,
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                flexWrap: "wrap",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 11,
                                    color: "#475569",
                                    fontFamily: "'JetBrains Mono', monospace",
                                    marginRight: 4,
                                }}
                            >
                                TOOL:
                            </span>
                            <button
                                onClick={() => setActiveTool(null)}
                                style={{
                                    background: !activeTool ? "#1e3a5f" : "transparent",
                                    border: `1px solid ${!activeTool ? "#38bdf8" : "#1e293b"}`,
                                    color: !activeTool ? "#38bdf8" : "#475569",
                                    borderRadius: 8,
                                    padding: "5px 12px",
                                    cursor: "pointer",
                                    fontSize: 12,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    transition: "all 0.15s",
                                }}
                            >
                                Select
                            </button>
                            {PROCEDURES.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() =>
                                        setActiveTool(activeTool?.id === p.id ? null : p)
                                    }
                                    style={{
                                        background:
                                            activeTool?.id === p.id ? `${p.color}33` : "transparent",
                                        border: `1px solid ${activeTool?.id === p.id ? p.color : "#1e293b"}`,
                                        color: activeTool?.id === p.id ? p.color : "#475569",
                                        borderRadius: 8,
                                        padding: "5px 12px",
                                        cursor: "pointer",
                                        fontSize: 12,
                                        fontFamily: "'JetBrains Mono', monospace",
                                        transition: "all 0.15s",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 7,
                                            height: 7,
                                            borderRadius: "50%",
                                            background: p.color,
                                            display: "inline-block",
                                        }}
                                    />
                                    {p.label}
                                </button>
                            ))}
                        </div>

                        {activeTool && (
                            <div
                                style={{
                                    fontSize: 12,
                                    color: activeTool.color,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    marginBottom: 12,
                                    padding: "6px 14px",
                                    background: `${activeTool.color}11`,
                                    border: `1px solid ${activeTool.color}33`,
                                    borderRadius: 8,
                                    display: "inline-block",
                                }}
                            >
                                ▶ Click any tooth to add: {activeTool.label}
                            </div>
                        )}

                        {/* Teeth Chart */}
                        <div
                            style={{
                                background: "#0a1220",
                                border: "1px solid #1e293b",
                                borderRadius: 16,
                                padding: "28px 20px",
                                marginBottom: 20,
                            }}
                        >
                            {/* Quadrant Labels */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: 6,
                                    paddingInline: 10,
                                }}
                            >
                                {["Upper Right (Q1)", "Upper Left (Q2)"].map((l) => (
                                    <span
                                        key={l}
                                        style={{
                                            fontSize: 10,
                                            color: "#334155",
                                            fontFamily: "'JetBrains Mono', monospace",
                                        }}
                                    >
                                        {l}
                                    </span>
                                ))}
                            </div>

                            {/* Upper Jaw */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 4,
                                    marginBottom: 6,
                                }}
                            >
                                {UPPER_TEETH.map((n) => (
                                    <ToothSVG
                                        key={n}
                                        toothNum={n}
                                        procedures={procedures}
                                        selected={selectedTooth === n}
                                        onClick={() => handleToothClick(n)}
                                        activeTool={activeTool}
                                    />
                                ))}
                            </div>

                            {/* Divider */}
                            <div
                                style={{
                                    height: 1,
                                    background:
                                        "linear-gradient(to right, transparent, #1e3a5f, #38bdf833, #1e3a5f, transparent)",
                                    marginBlock: 10,
                                    position: "relative",
                                }}
                            >
                                <span
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        transform: "translate(-50%, -50%)",
                                        background: "#0a1220",
                                        padding: "0 10px",
                                        fontSize: 9,
                                        color: "#334155",
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}
                                >
                                    OCCLUSAL
                                </span>
                            </div>

                            {/* Lower Jaw */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 4,
                                    marginTop: 6,
                                }}
                            >
                                {LOWER_TEETH.map((n) => (
                                    <ToothSVG
                                        key={n}
                                        toothNum={n}
                                        procedures={procedures}
                                        selected={selectedTooth === n}
                                        onClick={() => handleToothClick(n)}
                                        activeTool={activeTool}
                                    />
                                ))}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: 6,
                                    paddingInline: 10,
                                }}
                            >
                                {["Lower Right (Q4)", "Lower Left (Q3)"].map((l) => (
                                    <span
                                        key={l}
                                        style={{
                                            fontSize: 10,
                                            color: "#334155",
                                            fontFamily: "'JetBrains Mono', monospace",
                                        }}
                                    >
                                        {l}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Selected tooth panel */}
                        {selectedTooth && (
                            <div
                                style={{
                                    background: "#0a1220",
                                    border: "1px solid #1e3a5f",
                                    borderRadius: 14,
                                    padding: "18px 20px",
                                    marginBottom: 20,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 12,
                                    }}
                                >
                                    <div>
                                        <span
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 700,
                                                color: "#38bdf8",
                                                marginRight: 10,
                                            }}
                                        >
                                            Tooth #{selectedTooth}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 12,
                                                color: "#475569",
                                                fontFamily: "'JetBrains Mono', monospace",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {TOOTH_TYPES[selectedTooth] || "incisor"}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedTooth(null)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#475569",
                                            cursor: "pointer",
                                            fontSize: 18,
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>

                                {(procedures[selectedTooth] || []).length === 0 ? (
                                    <div
                                        style={{
                                            color: "#334155",
                                            fontSize: 13,
                                            fontFamily: "'JetBrains Mono', monospace",
                                        }}
                                    >
                                        No procedures recorded. Select a tool above to add one.
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {(procedures[selectedTooth] || []).map((p) => (
                                            <ProcedureBadge
                                                key={p.id}
                                                proc={p}
                                                onRemove={() => removeProcedure(selectedTooth, p.id)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Legend */}
                        <div
                            style={{
                                display: "flex",
                                gap: 8,
                                flexWrap: "wrap",
                            }}
                        >
                            {PROCEDURES.map((p) => (
                                <div
                                    key={p.id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                        fontSize: 11,
                                        color: "#64748b",
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: p.color,
                                        }}
                                    />
                                    {p.label}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {tab === "history" && (
                    <div
                        style={{
                            background: "#0a1220",
                            border: "1px solid #1e293b",
                            borderRadius: 14,
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                padding: "14px 20px",
                                borderBottom: "1px solid #1e293b",
                                fontSize: 12,
                                color: "#475569",
                                fontFamily: "'JetBrains Mono', monospace",
                            }}
                        >
                            ALL RECORDED PROCEDURES
                        </div>
                        {Object.entries(procedures).length === 0 ? (
                            <div
                                style={{
                                    padding: 40,
                                    textAlign: "center",
                                    color: "#334155",
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: 13,
                                }}
                            >
                                No procedures recorded yet.
                            </div>
                        ) : (
                            Object.entries(procedures).map(([tooth, procs]) => (
                                <div
                                    key={tooth}
                                    style={{
                                        padding: "14px 20px",
                                        borderBottom: "1px solid #0f172a",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 16,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 44,
                                            height: 44,
                                            background: "#0f172a",
                                            border: "1px solid #1e293b",
                                            borderRadius: 10,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: "#38bdf8",
                                            fontFamily: "'JetBrains Mono', monospace",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {tooth}
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                fontSize: 11,
                                                color: "#475569",
                                                fontFamily: "'JetBrains Mono', monospace",
                                                marginBottom: 5,
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {TOOTH_TYPES[tooth] || "incisor"}
                                        </div>
                                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                            {procs.map((p) => (
                                                <span
                                                    key={p.id}
                                                    style={{
                                                        background: `${p.color}22`,
                                                        border: `1px solid ${p.color}55`,
                                                        color: p.color,
                                                        borderRadius: 20,
                                                        padding: "2px 10px",
                                                        fontSize: 11,
                                                        fontFamily: "'JetBrains Mono', monospace",
                                                    }}
                                                >
                                                    {p.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
// const PatientHistory = () => (
//     <ReferenceField
//         source="patient"
//         reference="patienthistory"
//     >
//         {/* Use a Datagrid to display the list of history items */}

//         <TextField source="chronicConditions" />
//         <TextField source="cavaties" />
//         <TextField source="crowns" />
//         <TextField source="fillings" />
//         <TextField source="xrayFilePath" />
//         <TextField source="intraoralscanFilePath" />
//         {/* Add other relevant history fields */}

//     </ReferenceField>
// );
const AggregatedPaymentSummary = ({ totalAmountSource = 'total_amount' }) => {
    const { data, isLoading } = useListContext();

    if (isLoading) return <span>Loading...</span>;
    if (!data || data.length === 0) return <span style={{
        padding: "14px",
        display: "inline-block",
        fontSize:"0.875rem"
    }}>No records</span>;
    console.log(data);
    // Group by appointment_id and sum values
    const grouped = data.reduce((acc, record) => {
        const appointmentId = record.appointmentId;
        if (!acc[appointmentId]) {
            acc[appointmentId] = {
                appointmentId,
                paidSum: 0,
                totalAmount: record[totalAmountSource] ?? 0, // same for all in group
            };
        }
        acc[appointmentId].paidSum += Number(record.amount) || 0;
        return acc;
    }, {});

    const rows = Object.values(grouped);

    return (
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: 8 }}>
            <thead>
                <tr style={{ background: '#f5f5f5' }}>
                    <th style={th}>Appointment #</th>
                    <th style={th}>Total Amount</th>
                    <th style={th}>Paid (Sum)</th>
                    <th style={th}>Due Amount</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row,index) => {
                    const due = row.totalAmount - row.paidSum;
                    return (
                        <tr key={row.appointmentId}>
                            <td style={td}>{index+1}</td>
                            <td style={td}>Rs {row.totalAmount.toFixed(2)}</td>
                            <td style={td}>Rs {row.paidSum.toFixed(2)}</td>
                            <td style={{ ...td, color: due > 0 ? 'red' : 'green', fontWeight: 'bold' }}>
                                Rs {due.toFixed(2)}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

const th = { padding: '8px 12px', textAlign: 'left', borderBottom: '2px solid #ddd' };
const td = { padding: '8px 12px', borderBottom: '1px solid #eee' };
export const PatientShow = (props) => {
    const { id } = useParams();
    localStorage.setItem('patientId', JSON.stringify(id));
    return (
        <>
            <Show {...props} title="View Patient" sx={{ mb: 3 }}>

                <SimpleShowLayout sx={{
                    marginBottom: '3em'
                }} >
                    <TextField source="name" />
                    <TextField source="email" />
                    <TextField source="address" />
                    <TextField source="contact" />
                    <DateField source="dateOfBirth" field={DateField} />
                    <NumberField source="age" />
                    <TextField source="gender" />
                    <TextField source="nationality" />

                    {/* <PatientHistory /> */}
                </SimpleShowLayout>
            </Show>
            <Show actions={false} sx={{ mb: 3 }}>
                <TeethMap />
            </Show>

            <Show actions={false} >
                <SimpleShowLayout sx={{
                    marginTop: '0em'
                }}>
                    <ReferenceManyField
                        label="Patient History"
                        reference="patienthistory"   // your API resource name
                        target="patient"            // foreign key in patientHistory table
                    >

                        <Datagrid bulkActionButtons={false} rowClick={false}>
                            <TextField source="chronicConditions" />
                            <TextField source="cavaties" />
                            <TextField source="crowns" />
                            <TextField source="fillings" />
                            {/* <TextField source="xrayFilePath" /> */}
                            <FunctionField
                                label="Xray File Path"
                                render={(record) => (
                                    <a
                                        href={` http://localhost:5000/${record.xrayFilePath}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {record.xrayFilePath}
                                    </a>
                                )}
                            />
                            <TextField source="intraoralscanFilePath" />
                        </Datagrid>

                    </ReferenceManyField>
                </SimpleShowLayout>

            </Show>
            <Show actions={false}>
                <SimpleShowLayout>
                    {/* other fields */}

                    <ReferenceManyField
                        label="Payment Summary"
                        reference="payment"         // your payments resource
                        target="patientId"      // FK in payments table
                    >
                        <AggregatedPaymentSummary totalAmountSource="totalAmount" />
                    </ReferenceManyField>

                </SimpleShowLayout>
            </Show>
        </>
    )
};
// function PatientShowLayout() {
//   const record = _useRecordContext();

//   return (
//     <div style={{ fontFamily: "'Syne','Segoe UI',sans-serif" }}>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');`}</style>

//       {/* Page header */}


//       {/* ── SECTION 2: Dental Chart ── */}
//       <Section title="Dental Chart — FDI Notation" accent="#0ea5e9">
//         <TeethMapField source="teethProcedures" />
//       </Section>


//     </div>
//   );
// }
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