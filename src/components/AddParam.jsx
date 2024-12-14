/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AddParam.jsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aeid <aeid@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/14 19:29:58 by aeid              #+#    #+#             */
/*   Updated: 2024/12/14 19:30:06 by aeid             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import styles from "./EditUserForm.module.css";
import styless from "./AddParam.module.css";

function AddParam(props) {
    
    const [formData, setFormData] = useState({
        name: "",
        value: "",
        alarm: false
    });

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (typeof formData.name !== 'string') {
            alert("Name must be a string");
            return;
        }

        if (isNaN(formData.value) || formData.value === "") {
            alert("Value must be a number");
            return;
        }
        console.log("updated");
        const newParam = {
            id: props.data.parameters.length + 1,
            name: formData.name,
            value: parseFloat(formData.value),
            alarm: formData.alarm,
        };

        const updatedParameters = [...props.data.parameters, newParam];

        const updatedPatient = {
            ...props.data,
            parameters: updatedParameters
        };

        await props.updateDataBase(updatedPatient);
        props.updateSelectedPatient(updatedPatient);
        props.updatePatientsList((prevPatients) => {
            return prevPatients.map((patient) =>
                patient.id === props.data.id ? updatedPatient : patient
            );
        });
        props.onClose();
    };

    const handleChanges = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div>
            <form onSubmit={handleOnSubmit} className={styles.form}>
                <table>
                    <tbody className={styles.tbody}>
                        <tr className={styles.slot}>
                            <td className={styles.title}>Parameter Name:</td>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChanges}
                                    className={styles.input}
                                    required
                                >
                                </input>
                            </td>
                        </tr>
                        <tr className={styles.slot}>
                            <td className={styles.title}>Parameter Value:</td>
                            <td>
                                <input
                                    type="text"
                                    name="value"
                                    value={formData.value}
                                    onChange={handleChanges}
                                    className={styles.input}
                                    required
                                >
                                </input>
                            </td>
                        </tr>
                        <tr className={styles.slot}>
                            <td className={styles.title}>Alarm:</td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="alarm"
                                    checked={formData.alarm}
                                    onChange={handleChanges}
                                    className={styles.input}
                                >
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className={styless.button} type="submit">Add Parameter</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default AddParam;