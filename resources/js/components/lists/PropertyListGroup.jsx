import { useState } from "react";
import PropertyCardHorizontal from "../cards/PropertyCardHorizontal";
import PropertyCardHorizontalPlaceholder from "../cards/PropertyCardHorizontalPlaceholder";
import Pagination from "../Pagination";

const PropertyListGroup = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * props.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - props.itemsPerPage;

    const currentProperties = props.properties?.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const changePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    return (
        <div className="col-sm-6">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Newest properties</h5>
                    {currentProperties ? (
                        <Pagination
                            itemsLength={props.properties.length}
                            itemsPerPage={props.itemsPerPage}
                            changePage={changePage}
                            currentPage={currentPage}
                            maxPagesShown={props.maxPagesShown}
                            className="admin-panel-users-table"
                        />
                    ) : (
                        <></>
                    )}
                    {currentProperties
                        ? currentProperties.map((property, index) => (
                              <div key={index}>
                                  <PropertyCardHorizontal property={property} />
                              </div>
                          ))
                        : Array.from(
                              { length: props.maxPagesShown },
                              (_, index) => (
                                  <PropertyCardHorizontalPlaceholder
                                      key={index}
                                  />
                              )
                          )}
                </div>
            </div>
        </div>
    );
};
export default PropertyListGroup;
