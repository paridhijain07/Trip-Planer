import React, { useState } from "react";
import Axios from "../utils/axios";
import summaryAPI from "../common/summaryApi";

const TripForm = () => {
  const [destinations, setDestinations] = useState([{ name: "" }]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalBudget, setTotalBudget] = useState("");

  const addDestination = () => setDestinations([...destinations, { name: "" }]);

  const handleChange = (index, value) => {
    const updated = [...destinations];
    updated[index].name = value;
    setDestinations(updated);
  };

  const removeDestination = (index) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tripData = {
      destinations,
      startDate,
      endDate,
      budget: {
        total: parseFloat(totalBudget),
        spent: 0,
      },
    };

    try {
      const res = await Axios({
        url: summaryAPI.tripForm.url,
        method: summaryAPI.tripForm.method,
        data: tripData,
      });

      alert("Trip created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create trip.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Plan Your Trip</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {destinations.map((destination, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Destination ${index + 1}`}
              value={destination.name}
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            {destinations.length > 1 && (
              <button
                type="button"
                onClick={() => removeDestination(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addDestination}
          className="text-sm text-blue-500 hover:underline"
        >
          + Add Destination
        </button>

        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Total Budget (₹)</label>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Save Trip
        </button>
      </form>
    </div>
  );
};

export default TripForm;
