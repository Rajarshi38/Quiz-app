import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
const Pagination = ({ nextHandler, currentPage, previousHandler }) => {
  return (
    <div className="paginate">
      <button className="previous" onClick={previousHandler}>
        <BiLeftArrowAlt color="#3e4c94" />
      </button>
      <button
        className="paginate-btn"
        style={{
          color: "#3e4c94",
          paddingLeft: "15px",
          paddingRight: "15px",
          borderLeft: "none",
          borderRight: "none",
        }}
      >
        {currentPage}
      </button>
      <button className="next" onClick={nextHandler}>
        <BiRightArrowAlt color="#3e4c94" />
      </button>
    </div>
  );
};

export default Pagination;
