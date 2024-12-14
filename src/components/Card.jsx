import React from 'react';
import styles from './Card.module.css';
import { useState } from 'react';

const Card = (props) => {
    const [selectedOption, setSelectedOption] = useState('ID');

    return (
        //maybe this div is not needed after all
        <div className={styles.blockwithpopup}>
        
        <article className={styles.cardCard}>
            <img src={props.image} alt={props.alt} className={styles[props.imgclass]} />
            <h3 className={styles[props.h3class]}>{props.h3}</h3>
            {props.input && 
            <>
                <select
                    value={selectedOption}
                    onChange={(e) => {
                        props.setSearchId('');
                        props.setSearchFamilyName('');
                        setSelectedOption(e.target.value)
                        //console.log(e.target.value);
                    }}
                    className={styles.select}
                >
                    <option value="ID">ID</option>
                    <option value="FamilyName">Family Name</option>
                </select>
                <input 
                type="text" 
                id = "props.searchId"
                name = "props.searchId"
                value={selectedOption === "ID" ? props.searchId : props.searchFamilyName}
                onChange={(e) => {
                    const value = e.target.value;
                    if (selectedOption === "ID") {
                        if (value === '' || /^\d*$/.test(value)) {
                            if (value > props.patients.length) {
                                alert("ID not found");
                                props.setSearchId('');
                            } else {
    
                                props.setSearchId(value);
                            }
                        } else {
                            alert("ID should be a positive number");
                            props.setSearchId('');
                        }
                    } else if (selectedOption === "FamilyName") {
                        props.setSearchFamilyName(value);
                    }
                }}
                placeholder={props.input} 
                className={styles.input} 
            />
            </>}
            <button
                className={styles.button}
                onClick={() => props.handleButtonClick(props.button, selectedOption)}
            >
                {props.button}
            </button>
        </article>
        </div>
    );
};

export default Card;
