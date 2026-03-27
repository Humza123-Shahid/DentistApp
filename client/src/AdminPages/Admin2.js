import * as React from 'react';
import { Admin, Resource,fetchUtils  } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';
import { ProcedureCreate,ProcedureList,ProcedureShow,ProcedureEdit} from './procedure';
import { PricingCreate,PricingList,PricingShow,PricingEdit} from './pricing';
import { DentistCreate,DentistList,DentistShow,DentistEdit} from './dentist';
import { InventoryCreate,InventoryList,InventoryShow,InventoryEdit} from './inventory';
import { ExpenseCreate,ExpenseList,ExpenseShow,ExpenseEdit} from './expense';
import { PatientCreate,PatientList,PatientShow,PatientEdit} from './patient';
import { PatientHistoryCreate,PatientHistoryList,PatientHistoryShow,PatientHistoryEdit} from './patienthistory';
import { AppointmentCreate,AppointmentList,AppointmentShow,AppointmentEdit} from './appointment';
import { PaymentCreate,PaymentList,PaymentShow,PaymentEdit} from './payment';

// let data = {
//   procedure: [
//     { id: 123, title: "Local Post",published_at:"2023-10-25T14:48:00.000Z",category:"abccateriy" ,views: 50 }
//   ]
// };
const apiUrl = "http://localhost:5000";
const dataProvider1 = {
  getList: async (resource, params) => {
    // return Promise.resolve({
    //   data: data[resource],
    //   total: data[resource].length,
    //   id: params.id 
    // });
    // const dataWithIndex = data[resource].map((item, index) => ({
    //     ...item,
    //     index: index + 1 // auto-increment column for display
    //   }));
    // return Promise.resolve({
    //   data: dataWithIndex, total: dataWithIndex.length });
    //start second
    // const res = await fetch(`${apiUrl}/api/${resource}/fetchall${resource}s`);
    // const dataall = await res.json();

    // return {
    //   data: dataall.map((item, index) => ({
    //     ...item,
    //     id: item._id,
    //     index: index + 1  // 🔥 important
    //   })),
    //   total: dataall.length,
    // };
     const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            pagination: JSON.stringify({ page, perPage }),
            sort: JSON.stringify({ field, order }),
            filter: JSON.stringify(params.filter),
        };
        if(resource=="inventory"){
          return fetchUtils.fetchJson(`${apiUrl}/api/${resource}/fetchallinventories?${new URLSearchParams(query)}`)
            .then(({ json }) => ({
                data: json.data?.map((item, index) => ({ id: item._id,index: index + 1, ...item })),
                total: json.total || 0
            }));
        }
        else if(resource=="patienthistory"){
          return fetchUtils.fetchJson(`${apiUrl}/api/${resource}/fetchallpatienthistories?${new URLSearchParams(query)}`)
            .then(({ json }) => ({
                data: json.data?.map((item, index) => ({ id: item._id,index: index + 1, ...item })),
                total: json.total || 0
            }));
        }
        else{
          return fetchUtils.fetchJson(`${apiUrl}/api/${resource}/fetchall${resource}s?${new URLSearchParams(query)}`)
            .then(({ json }) => ({
                data: json.data?.map((item, index) => ({ id: item._id,index: index + 1, ...item })),
                total: json.total || 0
            }));
        }
        
  },
   getMany: async (resource, params) => {
    const query = params.ids.map(id => `ids[]=${id}`).join('&');
    let response={};
    if(resource=="inventory"){
      response = await fetch(
      `${apiUrl}/api/${resource}/fetchmanyinventories?${query}`
      );
    }
    else if(resource=="patienthistory"){
           response = await fetch(
      `${apiUrl}/api/${resource}/fetchmanypatienthistories?${query}`
      );
        }
    else{
      response = await fetch(
      `${apiUrl}/api/${resource}/fetchmany${resource}s?${query}`
      );
    }
    

    const data = await response.json();

    return {
      data: data.map(item => ({
        ...item,
        id: item._id, // important for React Admin
      })),
    };
  },
  getOne: async (resource, params) => {
  //   const record = data[resource].find(
  //   item => item.id == params.id   // ✅ use == instead of ===
  // );

  // return Promise.resolve({
  //   data: record
  // });
    const res = await fetch(`${apiUrl}/api/${resource}/fetchsingle${resource}/${params.id}`);
    const data = await res.json();
    console.log(data);
    const parts = data?.xrayFilePath?.split('\\')
        const remainingParts = parts?.slice(2);
        const newPath = remainingParts?.join('/');
        const parts2 = data?.intraoralscanFilePath?.split('\\')
        const remainingParts2 = parts2?.slice(2);
        const newPath2 = remainingParts2?.join('/');
    return {
      data: { ...data,
       file: data.xrayFilePath
                ? {
                      src: `http://localhost:5000/${data.xrayFilePath}`,
                      title: newPath,
                  }
                : null,
            file2: data.intraoralscanFilePath
                ? {
                      src: `http://localhost:5000/${data.intraoralscanFilePath}`,
                      title2: newPath2,
                  }
                : null,
       id: data._id },
    };
  },
  // update: (resource, params) => {
  //       // Logic to update a record
  //       const index = data[resource].findIndex(p => p.id == parseInt(params.id));
  //       if (index > -1) {
  //           // Merge existing data with new data
  //           data[resource][index] = { ...data[resource][index], ...params.data };
  //           return Promise.resolve({ data: data[resource][index] });
  //       }
  //       return Promise.reject(new Error('Record not found'));
  //   },
  // create: (resource, params) => {
    
  //   const newItem = { ...params.data, id: Date.now() };
  //   data[resource].push(newItem);
  //   return Promise.resolve({ data: newItem,
  //     id: params.id });
  // },
  create: async (resource, params) => {
    console.log(resource,params)
    let res ={}
    if(resource=="patienthistory"){
      const formData = new FormData();

    formData.append("patient", params.data.patient);
    formData.append("chronicConditions", params.data.chronicConditions);
    formData.append("cavaties", params.data.cavaties);
    formData.append("crowns", params.data.crowns);
    formData.append("fillings", params.data.fillings);
    if (params.data.file) {
      formData.append("xray", params.data.file.rawFile);
    }
    else
    {
      formData.append("xray", null);
    }
    if (params.data.file2) {
      formData.append("intraoralscan", params.data.file2.rawFile);
    }
    else{
      formData.append("intraoralscan", null);
    }

    res = await fetch(`${apiUrl}/api/${resource}/add${resource}`, {
      method: "POST",

      body: formData,
    });
    }
    else{

    
    res = await fetch(`${apiUrl}/api/${resource}/add${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.data),
    });
  }
    const data = await res.json();
    console.log(data)
    return {
      data: { ...data, id: data._id },
    };
   
   
  },
  update: async (resource, params) => {
    let res ={}
    if(resource=="patienthistory"){
      const formData = new FormData();

    formData.append("patient", params.data.patient);
    formData.append("chronicConditions", params.data.chronicConditions);
    formData.append("cavaties", params.data.cavaties);
    formData.append("crowns", params.data.crowns);
    formData.append("fillings", params.data.fillings);
    if (params.data.file) {
      formData.append("xray", params.data.file.rawFile);
    }
    else
    {
      formData.append("xray", null);
    }
    if (params.data.file2) {
      formData.append("intraoralscan", params.data.file2.rawFile);
    }
    else
    {
      formData.append("intraoralscan", null);
    }

    res = await fetch(`${apiUrl}/api/${resource}/update${resource}/${params.id}`, {
      method: "PUT",

      body: formData,
    });
    }
    else{
    res = await fetch(`${apiUrl}/api/${resource}/update${resource}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.data),
    });
  }
    const data = await res.json();

    return {
      data: { ...data, id: data.data._id },
    };
  },

  // delete: async (resource, params) => {
  //   console.log(params.id)
  //   await fetch(`${apiUrl}/api/${resource}/delete${resource}/${params.id}`, {
  //     method: "DELETE",
  //   });

  //   return { data: { id: params.id } };
  // },
   deleteMany: async (resource, params) => {
    const response = await fetch(`${apiUrl}/api/${resource}/delete${resource}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: params.ids,
      }),
    });

    const data = await response.json();

    return {
      data: data.data, // must return array of deleted ids
    };
  },
  // delete: (resource, params) => {
  //   const index = data[resource].findIndex(
  //     item => item.id === params.id
  //   );

  //   const deletedItem = data[resource][index];

  //   data[resource].splice(index, 1);

  //   return Promise.resolve({
  //     data: deletedItem,
  //     id: params.id 
  //   });
  // }
};
const Admin2 = (props) => {
 
  return (
    <Admin basename="/admin"  dataProvider={dataProvider1}>
         {/* <Resource name="dentist" options={{ label: 'People' }} list={ProcedureList} create={ProcedureCreate} show={ProcedureShow} edit={ProcedureEdit} /> */}
         <Resource name="dentist" options={{ label: 'Dentist' }} list={DentistList} create={DentistCreate} show={DentistShow} edit={DentistEdit} />
         <Resource name="procedure" options={{ label: 'Procedure' }} list={ProcedureList} create={ProcedureCreate} show={ProcedureShow} edit={ProcedureEdit} />
         <Resource name="pricing" options={{ label: 'Pricing' }} list={PricingList} create={PricingCreate} show={PricingShow} edit={PricingEdit} />
         <Resource name="inventory" options={{ label: 'Inventory' }} list={InventoryList} create={InventoryCreate} show={InventoryShow} edit={InventoryEdit} />
         <Resource name="expense" options={{ label: 'Expense' }} list={ExpenseList} create={ExpenseCreate} show={ExpenseShow} edit={ExpenseEdit} />
         <Resource name="patient" options={{ label: 'Patient' }} list={PatientList} create={PatientCreate} show={PatientShow} edit={PatientEdit} />
         <Resource name="patienthistory" options={{ label: 'Patient History' }} list={PatientHistoryList} create={PatientHistoryCreate} show={PatientHistoryShow} edit={PatientHistoryEdit} />
         <Resource name="appointment" options={{ label: 'Appointment' }} list={AppointmentList} create={AppointmentCreate} show={AppointmentShow} edit={AppointmentEdit} />
         <Resource name="payment" options={{ label: 'Payment' }} list={PaymentList} create={PaymentCreate} show={PaymentShow} edit={PaymentEdit} />

    </Admin>
  )
}

export default Admin2