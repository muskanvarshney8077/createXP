import { useMyContext } from "../context/Context";
const AddClient = () => {
  const { state, handleState } = useMyContext();
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <label>Client Name:</label>
          <input type="text" />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 ">
          <label className="font-semibold">Status:</label>
          <select>
            {state.filterBy.status?.map((ele, i) => (
              <option key={i}>{ele}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <label>Preferred Language:</label>
          <select>
            {["en", "hi"].map((ele, i) => (
              <option key={i}>{ele}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <label>Updated by:</label>
          <select>
            {state.filterBy.updatedBy?.map((ele, i) => (
              <option key={i}>{ele}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <label>Source</label>
          <select>
            <option></option>
          </select>
        </div>
        <div>
          <label>Client Rating</label>
          <select>
            <option></option>
          </select>
        </div>
      </div>
    </>
  );
};
export default AddClient;
