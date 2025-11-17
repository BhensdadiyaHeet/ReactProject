import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, deleteData, fetchData, updateData } from "../Feature/ApiSlice";

export default function ApiData() {
  const dispatch = useDispatch();

  const [formdata, setFormdata] = useState({
    name: "",
    age: "",
    city: "",
    subject: "",
    gender: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const data = useSelector((state) => state.ApiKey.record);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex === null) {
      dispatch(addData({ ...formdata }));
    } else {
      dispatch(updateData({ editIndex, formdata }));
    }

    setFormdata({ name: "", age: "", city: "", subject: "", gender: "" });
    setEditIndex(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  const handleEdit = (id) => {
    let singleData = data.find((item) => item.id === id);
    setFormdata({
      name: singleData.name,
      age: singleData.age,
      city: singleData.city,
      subject: singleData.subject,
      gender: singleData.gender,
    });
    setEditIndex(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-light text-center text-gray-900 mb-8">
          {editIndex === null ? "Add New Entry" : "Update Entry"}
        </h1>

        {/* FORM CARD - Instagram Style */}
        <div className="bg-white border border-gray-300 rounded-sm p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* INPUT FIELDS - Instagram Style */}
            <div>
              <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 focus:bg-white"
              />
            </div>

            <div>
              <input
                type="number"
                name="age"
                value={formdata.age}
                onChange={handleChange}
                placeholder="Age"
                required
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 focus:bg-white"
              />
            </div>

            <div>
              <input
                type="text"
                name="city"
                value={formdata.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 focus:bg-white"
              />
            </div>

            <div>
              <input
                type="text"
                name="subject"
                value={formdata.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 focus:bg-white"
              />
            </div>

            <div>
              <select
                name="gender"
                value={formdata.gender}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500 focus:bg-white text-gray-900"
              >
                <option value="" className="text-gray-500">Select Gender</option>
                <option value="Male" className="text-gray-900">Male</option>
                <option value="Female" className="text-gray-900">Female</option>
                <option value="Other" className="text-gray-900">Other</option>
              </select>
            </div>

            {/* BUTTON - Instagram Style */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium py-2 rounded-sm text-sm transition-colors"
            >
              {editIndex === null ? "Add Data" : "Update Data"}
            </button>
          </form>
        </div>

        {/* DISPLAY CARDS - Instagram Style */}
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-300 rounded-sm p-6"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-3">{item.name}</h3>
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p>Age: {item.age}</p>
                <p>City: {item.city}</p>
                <p>Subject: {item.subject}</p>
                <p>Gender: {item.gender}</p>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="flex-1 py-1.5 text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 py-1.5 text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
