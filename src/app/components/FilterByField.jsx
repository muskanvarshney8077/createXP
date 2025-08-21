import Image from "next/image";
import user from "../assets/user.png";
import notebook from "../assets/notebook.png";
import { useMyContext } from "../context/Context";
const FilterByField = () => {
  const { state, handleState } = useMyContext();
  const statusArray = ["Active", "Inactive", "Pending"];
  const updatedByArray = ["Manager", "System", "Admin", "Support", "User"];
  return (
    <>
      <div className="mb-3 ">
        <div className="flex gap-2">
          <Image src={notebook} alt="" height={15} width={15} />{" "}
          <label>Status</label>
        </div>

        <div className="flex gap-3 mt-1">
          {statusArray?.map((status) => (
            <label
              key={status}
              className="flex items-center gap-1 text-[12px] text-gray-700"
            >
              <input
                type="checkbox"
                checked={state.filterBy.status.includes(status)}
                onChange={() =>
                  handleState({
                    filterBy: {
                      ...state.filterBy,
                      status: state.filterBy.status.includes(status)
                        ? [
                            ...state.filterBy.state.filter(
                              (ele) => ele !== status
                            ),
                          ]
                        : [...state.filterBy.status, status],
                    },
                  })
                }
              />
              {status}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <div className="flex gap-2">
          <Image src={user} alt="" width={15} height={15} />
          <label>Updated By</label>
        </div>

        <div className="flex gap-3 mt-2">
          {updatedByArray?.map((updatedBy) => (
            <label
              key={updatedBy}
              className="flex items-center gap-1 text-gray-800 text-[12px]"
            >
              <input
                type="checkbox"
                checked={state.filterBy.updatedBy.includes(updatedBy)}
                onChange={() =>
                  handleState({
                    filterBy: {
                      ...state.filterBy,
                      updatedBy: state.filterBy.updatedBy.includes(updatedBy)
                        ? [
                            ...state.filterBy.updatedBy.filter(
                              (ele) => ele !== updatedBy
                            ),
                          ]
                        : [...state.filterBy.updatedBy, updatedBy],
                    },
                  })
                }
              />
              {updatedBy}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
export default FilterByField;
