/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   EditParamForm.jsx                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aeid <aeid@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/14 19:30:57 by aeid              #+#    #+#             */
/*   Updated: 2024/12/14 19:31:00 by aeid             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import styles from "./EditParamForm.module.css";
import React from "react";
import { useState } from "react";
import axios from "axios";

const EditParamForm = (props) => {
    const parameter = props.data.parameters.find(param => param.id === props.paramId);

    if (!parameter) {
        return <div>Parameter not found</div>;
    }

    const [formData, setFormData] = useState({
        name: parameter.name || "",
        value: parameter.value || "",
        alarm: parameter.alarm || false,
    });

    const handleChanges = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        if (isNaN(formData.value) || formData.value === "") {
            alert("Value must be a number");
            return;
        }

        if (typeof formData.name !== 'string') {
            alert("Name must be a string");
            return;
        }

        const updatedParams = props.data.parameters.map((param) => {
            if (param.id === props.paramId) {
                return { ...param, ...formData, value: parseFloat(formData.value) };
            }
            return param;
        });
        const updatedData = { ...props.data, parameters: updatedParams };
        await updateDataBase(updatedData);
        props.updateSelectedPatient(updatedData);
        props.updatePatientsList((prevPatients) => {
            return prevPatients.map((patients) => {
                if (patients.id === props.data.id) {
                    return updatedData;
                }
                return patients;
            })
        });
        props.onClose(props.paramId);
    };

    const updateDataBase = async (patient) => {
        try {
            console.log("Updating patient:", patient); 
            const response = await axios.post('https://mobile.digistat.it/CandidateApi/Patient/Update', patient, {
                auth: {
                    username: import.meta.env.VITE_API_USERNAME,
                    password: import.meta.env.VITE_API_PASSWORD,
                },
            });
            console.log("Patient updated", response.data);
        } catch (error) {
            if (error.response) {
                console.error('Error updating patient:', error.response.data);
            } else {
                console.error('Error updating patient:', error.message);
            }
        }
    };

    // const handleChangesCheckbox = (event) => {
    //     const { name, checked } = event.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: checked
    //     }));
    // }

    return (
        <div>
            <form onSubmit={handleOnSubmit} className={styles.form}>
                <table>
                    <tbody className={styles.tbody}>
                        <tr className={styles.slot}>
                            <td className={styles.title}>Name:</td>
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
                            <td className={styles.title}>Value:</td>
                            <td>
                                <input
                                    type="number"
                                    step="any"
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
                    </tbody>
                </table>
                <button type="submit" className={styles.button}>Submit</button>
            </form>
        </div>
    );
}

export default EditParamForm;