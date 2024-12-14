import react, { useState } from "react";
import styles from "./EditUserForm.module.css";

function EditForm(props) {
    const [formData, setFormData] = useState({
        familyName: props.data.familyName || "",
        givenName: props.data.givenName || "",
        birthDate: props.data.birthDate || "",
        sex: props.data.sex || "M",
        parameters: props.data.parameters || []
    });

    const handleChanges = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "birthDate" ? value.split("T")[0] : value
        }));
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (typeof formData.familyName !== 'string') {
            alert("Family Name must be a string");
            return;
        }

        if (typeof formData.givenName !== 'string') {
            alert("Given Name must be a string");
            return;
        }

        if (isNaN(Date.parse(formData.birthDate))) {
            alert("Birth Date must be a valid date");
            return;
        }

        console.log("updated");
        await props.updateDataBase({
            ...props.data,
            ...formData
        });
        props.updateSelectedPatient({
            ...props.data,
            ...formData
        });
        props.updatePatientsList((prevPatients) => {
            return prevPatients.map((patient) =>
                patient.id === props.data.id ? { ...patient, ...formData } : patient
            );
        });
        props.onClose();
    };

    return (
        <div>
            <form onSubmit={handleOnSubmit} className={styles.form}>
                <table>
                    <tbody className={styles.tbody}>
                        <tr className={styles.slot}>
                            <td className={styles.title}>Family Name:</td>
                            <td>
                                <input
                                    type="text"
                                    name="familyName"
                                    value={formData.familyName}
                                    onChange={handleChanges}
                                    className={styles.input}
                                    required
                                >
                                </input>
                            </td>
                        </tr>
                        <tr className={styles.slot}>
                            <td className={styles.title}>Given Name:</td>
                            <td>
                                <input
                                    type="text"
                                    name="givenName"
                                    value={formData.givenName}
                                    onChange={handleChanges}
                                    className={styles.input}
                                    required
                                >
                                </input>
                            </td>
                        </tr>
                        <tr className={styles.slot}>
                            <td className={styles.title}>Birth Date:</td>
                            <td>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChanges}
                                    className={styles.input}
                                    required
                                >
                                </input>
                            </td>
                        </tr>
                        <tr className={styles.slot}>
                            <td className={styles.title}>Sex:</td>
                            <td>
                                <select
                                    name="sex"
                                    value={formData.sex}
                                    onChange={handleChanges}
                                    className={styles.input}
                                    required
                                >
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    type="submit"
                    className={styles.button}
                >Save</button>
            </form>
        </div>
    );
}

export default EditForm;