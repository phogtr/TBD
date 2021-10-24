import React, { useState } from "react";
import { Meta } from "../../components/Meta";

interface ICreateTicketProps {}

const CreateTicket: React.FC<ICreateTicketProps> = ({}) => {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <div>
      <Meta title="Create Ticket" />
      <h1>Create a Ticket</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(selectedItem);
        }}
      >
        <div>
          <label>
            Select a location:
            <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
              <option value="item 1">item 1</option>
              <option value="item 2">item 2</option>
              <option value="item 3">item 3</option>
            </select>
          </label>
        </div>
        <button type="submit" value="submit">
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateTicket;
