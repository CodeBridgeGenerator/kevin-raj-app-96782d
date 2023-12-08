import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleProductsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [customerId, setcustomerId] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("products")
            .get(urlParams.singleProductsId, { query: { $populate: ["customerId"] }})
            .then((res) => {
                set_entity(res || {});
                const customerId = Array.isArray(res.customerId)
            ? res.customerId.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.customerId
                ? [{ _id: res.customerId._id, name: res.customerId.name }]
                : [];
        setcustomerId(customerId);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Products", type: "error", message: error.message || "Failed get products" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/products", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Products</h3>
                </div>
                <p>products/{urlParams.singleProductsId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Customer</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.customerId?.name}</p></div>
            <label className="text-sm">Customer</label>
            {customerId.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleProductsPage);
