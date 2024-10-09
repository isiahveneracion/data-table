import React, { useState } from "react";

const courses = ["IT", "IS", "CS", "DS"];

const data = [
  {
    id: 1,
    lastName: "Veneracion",
    firstName: "Isiah",
    course: "IT",
    birthdate: "1999/09/10",
  },
  {
    id: 2,
    lastName: "Mendoza",
    firstName: "AJ",
    course: "IS",
    birthdate: "2000/03/25",
  },
  {
    id: 3,
    lastName: "Alcaide",
    firstName: "Bea",
    course: "CS",
    birthdate: "2001/09/15",
  },
  {
    id: 4,
    lastName: "Pimentel",
    firstName: "Job",
    course: "DS",
    birthdate: "1995/11/07",
  },
  {
    id: 5,
    lastName: "Quianzon",
    firstName: "Edward",
    course: "CS",
    birthdate: "2005/11/07",
  },
  {
    id: 6,
    lastName: "Natividaddy",
    firstName: "Karl",
    course: "IS",
    birthdate: "1990/11/07",
  },
];

const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const DataTable = () => {
  const [query, setQuery] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const filteredData = data.filter((item) => {
    const birthdateInRange =
      (!minDate || new Date(item.birthdate) >= new Date(minDate)) &&
      (!maxDate || new Date(item.birthdate) <= new Date(maxDate));

    const searchQuery = query.toLowerCase();
    const matchesQuery =
      item.lastName.toLowerCase().includes(searchQuery) ||
      item.firstName.toLowerCase().includes(searchQuery) ||
      item.course.toLowerCase().includes(searchQuery) ||
      calculateAge(item.birthdate).toString().includes(searchQuery);

    return birthdateInRange && matchesQuery;
  });

  return (
    <div>
      {/* Search Filters */}
      <div
        style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Filter by Last Name, First Name, Age, or Course"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginRight: "20px", padding: "5px", width: "300px" }}
        />

        {/* Min and Max Date Filter */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px" }}>From:</label>
          <input
            type="date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
            style={{ marginRight: "20px", padding: "5px" }}
          />

          <label style={{ marginRight: "10px" }}>To:</label>
          <input
            type="date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
            style={{ padding: "5px" }}
          />
        </div>
      </div>

      {/* Data Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.lastName}</td>
                <td>{item.firstName}</td>
                <td>{item.course}</td>
                <td>{item.birthdate}</td>
                <td>{calculateAge(item.birthdate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
