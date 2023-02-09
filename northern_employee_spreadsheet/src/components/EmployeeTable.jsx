import React from 'react'
import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react';
import axios from 'axios'

const EmployeeTable = () => {
    const [search, setSearch] = useState("");
    const [employees, setEmployee] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const getEmployees = async () => {
        try {
            const response = await axios.get("https://sheet.best/api/sheets/4f21f786-315d-4c69-a77a-36288f96a07e")
            setEmployee(response.data);
            setFilteredEmployees(response.data);

        } catch (error) {
            console.log(error)
        }
    };


    const columns = [
        {
            name: "First Name",
            selector: (row) => row.FirstName,
            sortable:true,
        },
        {
            name: "Last Name",
            selector: (row) => row.LastName,
        },
        {
            name: "Age",
            selector: (row) => row.Age,
        },
        {
            name: "Email",
            selector: (row) => row.Email,
        },
        {
            name: "Contact No.",
            selector: (row) => row.Phone,
        },
        {   
            name: "EDIT",
            cell: (row) => <button className='btn btn-success' onClick={() => alert(row.FirstName)}>Edit</button>,
        },
        {
            name: "DELETE",
            cell: (row) => <button className='btn btn-danger' onClick={() => alert(row.FirstName)}>Delete</button>,
        },
    ];

    useEffect(() => {
        getEmployees();
    }, []);

    useEffect(() =>{
        const result = employees.filter(employee => {
            return employee.FirstName.toLowerCase().match(search.toLowerCase());
        });

        setFilteredEmployees(result);
    }, [search])



    return <DataTable 
    title="Employee List" 
    columns={columns} 
    data={filteredEmployees} 
    pagination 
    fixedHeader
    fixedHeaderScrollHeight='480px'
    highlightOnHover
    actions={
            <button className='btn btn-sm btn-primary'>Import Sheet</button>          
    }

    subHeader
    subHeaderComponent={
        <input type="text" 
        placeholder="Search here" 
        className="w-25 form-control"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
    }
    subHeaderAlign="left"
    expandableRows

    />;
}

export default EmployeeTable