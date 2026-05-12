const Pagination = ({page,setPage,lastPage}) => {
  return (
    <div className="flex justify-center mb-10">
      <div className="join">
        <button onClick={()=>{setPage(page-1)}}  disabled={page === 1} className="join-item btn">«</button>
        <button className="join-item btn">Page {page} of {lastPage}</button>
        <button onClick={()=>{page < lastPage && setPage(page+1)}} disabled={page===lastPage} className="join-item btn">»</button>
      </div>
    </div>
  );
};

export default Pagination;
