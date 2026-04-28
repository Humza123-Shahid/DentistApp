import * as React from 'react';
import { Admin, Resource,fetchUtils,defaultTheme,Sidebar, Layout  } from 'react-admin';
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
import { ToothCreate,ToothList,ToothShow,ToothEdit} from './tooth';
import { TestimonialCreate,TestimonialList,TestimonialShow,TestimonialEdit} from './testimonial';
// import { MyLayout } from './MyLayout';
// import { MyLayout } from './MySidebar';

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
                data: json.data?.map((item, index) => ({ ...item,id: item._id?.toString(),index: (page - 1) * perPage + index + 1  })),
                total: json.total || 0
            }));
        }
        else if(resource=="patienthistory"){
          return fetchUtils.fetchJson(`${apiUrl}/api/${resource}/fetchallpatienthistories?${new URLSearchParams(query)}`)
            .then(({ json }) => ({
                data: json.data?.map((item, index) => ({ ...item ,id: item._id?.toString(),index: (page - 1) * perPage + index + 1 })),
                total: json.total || 0
            }));
        }
        else{
          return fetchUtils.fetchJson(`${apiUrl}/api/${resource}/fetchall${resource}s?${new URLSearchParams(query)}`)
            .then(({ json }) => ({
                // data: json.data?.map((item, index) => ({ ...item, id: item._id,index: index + 1 })),
                data: json.data?.map((item, index) => ({ ...item, id: item._id?.toString(),index: (page - 1) * perPage + index + 1})),
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
         id: item._id?.toString(), // important for React Admin
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
       id: data._id?.toString() },
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
      //data: { ...data, id: data._id },
      data: { ...data, id: data._id?.toString() }
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
      //data: { ...data, id: data.data._id },
      data: { ...data.data, id: data.data._id?.toString() },
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

    //const data = await response.json();

    return {
      //data: data.data, // must return array of deleted ids
      data: params.ids
    };
  },
  getManyReference: async (resource, params) => {
        const { target, id, pagination, sort, filter } = params;
        const { page, perPage } = pagination;
        const { field, order } = sort;

        const query = new URLSearchParams({
            [target]: id,          // e.g. post_id=123
            _sortField: field,
            _sortOrder: order,
            _page: page,
            _perPage: perPage,
            ...filter,
        });

        const response = await fetch(`${apiUrl}/api/${resource}/${resource}bypatientId?${query}`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const { data, total } = await response.json();
        console.log(data);
        // return {
        //     data: data.items,   // array of records
        //     total: data.total,  // total count for pagination
        // };
        return { data, total };
    },
    // getManyReference: async (resource, params) => {
    //     const { target, id, pagination, sort, filter } = params;
    //     const { page, perPage } = pagination;
    //     const { field, order } = sort;

    //     // Build query string
    //     const query = new URLSearchParams({
    //         [target]: id,
    //         _sort: field,
    //         _order: order,
    //         _start: (page - 1) * perPage,
    //         _end: page * perPage,
    //         ...filter,
    //     });

    //     const url = `https://your-api.com/${resource}?${query}`;

    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         },
    //     });

    //     if (!response.ok) {
    //         const error = await response.json();
    //         throw new Error(error.message || response.statusText);
    //     }

    //     // Total count from header (common REST pattern)
    //     const total = parseInt(response.headers.get('X-Total-Count'), 10);
    //     const data = await response.json();

    //     return {
    //         data,    // must be an array with `id` field in each record
    //         total,
    //     };
    // },
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
const MySidebar = (props) => (
  <Sidebar
    {...props}
    sx={{
      // Target the actual MUI Drawer paper inside the sidebar
      '& .RaSidebar-drawerPaper': {
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        alignSelf: 'flex-start',  // ← key: lets sticky work inside a flex row
      },
    }}
  />
);


const Admin2 = (props) => {
const MyLayout = (props) => (
  <Layout
    {...props}
    sx={{
      '& .RaLayout-content': {
        overflowX: 'hidden',
        minWidth: 0,
        width: '100%',
      },
      '& .RaLayout-appFrame': {
        overflowX: 'hidden',
      },
    }}
  />
);
//  const theme = createTheme({
//   components: {
//     RaLayout: {
//       styleOverrides: {
//         root: {
//           '& .RaLayout-content': {
//             overflow: 'hidden',
//             minWidth: 0,
//           },
//           '& .RaLayout-appFrame': {
//             overflowX: 'hidden',
//           },
//         },
//       },
//     },
//   },
// });
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
         <Resource name="tooth" options={{ label: 'Tooth' }} list={ToothList} create={ToothCreate} show={ToothShow} edit={ToothEdit} />
         <Resource name="testimonial" options={{ label: 'Testimonial' }} list={TestimonialList} create={TestimonialCreate} show={TestimonialShow} edit={TestimonialEdit} />

    </Admin>
  )
}

export default Admin2