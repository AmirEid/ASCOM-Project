/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Form.jsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aeid <aeid@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/14 19:32:09 by aeid              #+#    #+#             */
/*   Updated: 2024/12/14 19:32:12 by aeid             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import react, { useState, useEffect } from 'react';
import styles from './Form.module.css';

const Form = (props) => {

    const [FormData, setFormData] = useState({
        id:'',
        familyName:'',
        givenName:'',
        birthDate:'',
        sex:'F',
        parameters:[],
    });

    useEffect(() => {
        if (props.data && props.data.length > 0) {
            const maxId = Math.max(...props.data.map(patient => patient.id));
            setFormData(prevFormData => ({
                ...prevFormData,
                id: maxId + 1,
            }));
        }
    }, [props.data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(FormData);
        setFormData({
            id:'',
            familyName:'',
            givenName:'',
            birthDate:'',
            sex:'F',
            parameters:[],
    });
    //console.log(FormData);
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="familyName" className={styles.label}>Family Name:</label>
                    <input
                        type="text"
                        id="familyName"
                        name="familyName"
                        value={FormData.familyName}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="givenName" className={styles.label}>Given Name:</label>
                    <input
                        type="text"
                        id="givenName"
                        name="givenName"
                        value={FormData.givenName}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="birthDate" className={styles.label}>Date of Birth:</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={FormData.birthDate}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="sex" className={styles.label}>Sex:</label>
                    <select
                        id= "sex"
                        name= "sex"
                        value={FormData.sex}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    >
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className={styles.button}
                >Submit
                </button>
            </form>
        </div>
    );
}

export default Form;