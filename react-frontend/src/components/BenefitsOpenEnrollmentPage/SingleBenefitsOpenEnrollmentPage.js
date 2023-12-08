import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleBenefitsOpenEnrollmentPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    
    useEffect(() => {
        //on mount
        client
            .service("benefitsOpenEnrollment")
            .get(urlParams.singleBenefitsOpenEnrollmentId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "BenefitsOpenEnrollment", type: "error", message: error.message || "Failed get benefitsOpenEnrollment" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/benefitsOpenEnrollment", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">BenefitsOpenEnrollment</h3>
                </div>
                <p>benefitsOpenEnrollment/{urlParams.singleBenefitsOpenEnrollmentId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Open</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.open}</p></div>
                    <label className="text-sm text-primary">Enrollment</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.enrollment}</p></div>
                    <label className="text-sm text-primary">Periods </label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.periods}</p></div>
                    <label className="text-sm text-primary">Benefit</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.benefit}</p></div>
                    <label className="text-sm text-primary">Plan</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.plan}</p></div>
                    <label className="text-sm text-primary">Selections</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.selections}</p></div>
            
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

export default connect(mapState, mapDispatch)(SingleBenefitsOpenEnrollmentPage);
