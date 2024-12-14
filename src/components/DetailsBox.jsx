/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DetailsBox.jsx                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aeid <aeid@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/14 19:30:36 by aeid              #+#    #+#             */
/*   Updated: 2024/12/14 19:30:42 by aeid             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import styles from "./DetailsBox.module.css";
import { useState } from "react";
import EditForm from "./EditUserForm";
import Delete from "../assets/delete.png";
import Edit from "../assets/edit.png";
import AddParam from "./AddParam";
import EditParam from "./EditParamForm";

function DetailsBox(props) {
    const [showDetails, setShowDetails] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [addParameter, setAddParameter] = useState(false);
    const [editParam, setEditParam] = useState(false);
    const [paramId, setParamId] = useState(null);

    if(!props.patient)
        return (
            <></>
        );
    const handleDetailsClick = (() => {
        setShowDetails((prev) => !prev);
        setShowEditUser(false);
        setAddParameter(false);
        setEditParam(false);
    })
    
    const handleEditClick = (() => {
        setShowEditUser((prev) => !prev);
        setAddParameter(false);
        setEditParam(false);
    });

    const handleAddParameterClick = (() => {
        setAddParameter((prev) => !prev);
        setShowDetails(false);
        setShowEditUser(false);
        setEditParam(false);
        if (addParameter)
            setAddParameter(false);
    });
    
    const handleDeleteClick = (paramIdd) => {
        props.onDeleteParameter(paramIdd);
    };

    const handleEditParamClick = (id) => {
        setParamId(id);
        setEditParam((prev) => !prev);
        setShowEditUser(false);
    };

    //2 handlers more, and a function to be used for all the cases to handle closing others.
   
    return (
        <>
        <div className={styles.popupblock}>
            <button className={styles.close} onClick={props.onClose}>X</button>
            <table className={styles.tableone}> 
                <thead className={styles.theadone}>
                    <tr>
                        <th className={styles.trone}>Family Name</th>
                        <th className={styles.trone}>Given Name</th>
                        <th className={styles.trone}>Date of Birth</th>
                        <th className={styles.trone}>Sex</th>
                        <th className={styles.trone}>Parameters</th>
                        <th className={styles.trone}>Alarm</th>
                    </tr>
                </thead>
                <tbody className={styles.tbodyone}>
                    <tr>
                        <td className={styles.trone}>{props.patient.familyName}</td>
                        <td className={styles.trone}>{props.patient.givenName}</td>
                        <td className={styles.trone}>{props.patient.birthDate}</td>
                        <td className={styles.trone}>{props.patient.sex}</td>
                        <td className={styles.trone}>{props.patient.parameters.length}</td>
                        <td className={styles.trone}>{props.checkAlarm}</td>
                    </tr>
                </tbody>
            </table>
            {showDetails && (
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.tr}>Parameter ID</th>
                            <th className={styles.tr}>Name</th>
                            <th className={styles.tr}>Value</th>
                            <th className={styles.tr}>Alarm</th>
                            <th className={styles.tr}>Edit</th>
                            <th className={styles.tr}>Delete</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {props.patient.parameters.map((param) => (
                            <tr key={param.id}>
                                <td className={styles.tr}>{param.id}</td>
                                <td className={styles.tr}>{param.name}</td>
                                <td className={styles.tr}>{param.value}</td>
                                <td className={styles.tr}>{param.alarm ? "Yes" : "No"}</td>
                                <td className={styles.tr}>
                                    <img 
                                        src={Edit} 
                                        alt="Edit" 
                                        className={styles.edit}
                                        onClick={() => handleEditParamClick(param.id)}
                                    />
                                    </td>
                                <td className={styles.tr}>
                                    <img 
                                        src={Delete} 
                                        alt="Delete" 
                                        className={styles.delete}
                                        onClick={() => handleDeleteClick(param.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className={styles.buttonblock}>
                <button className={styles.button} onClick={handleDetailsClick}>Details</button>
                <button className={styles.button} onClick={handleEditClick}>Edit User</button>
                <button className={styles.button} onClick={handleAddParameterClick}>Add Parameter</button>
            </div>
            <>
                <>
                    {showEditUser && (
                        <EditForm
                            data={props.patient}
                            onClose={handleEditClick}
                            updateDataBase={props.updateDataBase}
                            updateSelectedPatient={props.updateSelectedPatient}
                            updatePatientsList={props.updatePatients}
                        />
                    )}
                </>
                <>
                    {addParameter && 
                        <AddParam 
                            data={props.patient}
                            onClose={handleAddParameterClick}
                            updateDataBase={props.updateDataBase}
                            updateSelectedPatient={props.updateSelectedPatient}
                            updatePatientsList={props.updatePatients}
                        />
                    }
                </>
                <>
                    {editParam && (
                        <EditParam 
                            data={props.patient}
                            onClose={handleEditParamClick}
                            updateDataBase={props.updateDataBase}
                            updateSelectedPatient={props.updateSelectedPatient}
                            updatePatientsList={props.updatePatients}
                            paramId={paramId}
                        />
                    )}
                </>
            </>
        </div>
        <div style={{ height: '50px' }}></div>
        </>

    );
};

export default DetailsBox;
