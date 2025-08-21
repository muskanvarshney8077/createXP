import { useEffect, useRef } from "react";
import { useMyContext } from "../context/Context";
const CustomModal = ({ children, Adjust }) => {
  const modalRefs = useRef();
  const { state, handleState } = useMyContext();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRefs.current && !modalRefs.current.contains(e.target)) {
        handleState({
          openModalFilter: false,
          openModalAdd: false,
          openModal: false,
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRefs.current]);
  return (
    <>
      <div>
        <div
          className={`fixed top-[20vh] z-50 transform bg-white rounded-lg shadow-2xl h-[50%] ${Adjust}`}
        >
          <div
            className="w-[100%] h-[100%]  p-6 flex flex-col justify-between text-[12px] "
            ref={modalRefs}
          >
            {children}
            <div className="flex justify-between items-center gap-5 ">
              <div
                className="text-gray-500 cursor-pointer"
                onClick={() => {
                  state.openModal &&
                    handleState({
                      sortBy: {
                        clientName: "",
                        createdAt: "",
                        updatedAt: "",
                        clientId: "",
                      },
                    });
                  state.openModalFilter &&
                    handleState({
                      filterBy: {
                        status: [],
                        updatedBy: [],
                      },
                    });
                }}
              >
                Clear All
              </div>

              {state.openModalAdd && (
                <button className="bg-black text-white px-3 py-2 rounded-lg cursor-pointer">
                  {state.openModalAdd && "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomModal;
