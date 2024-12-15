/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Header.jsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aeid <aeid@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/14 19:32:17 by aeid              #+#    #+#             */
/*   Updated: 2024/12/15 18:00:55 by aeid             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import styles from "./Header.module.css";

function Header() {
    return (
        <>
            <header className={styles.header}>
                <img 
                    src="../src/assets/ascom-logo.svg" 
                    alt="Ascom Logo" 
                    className={styles.logo}
                />
            </header>
        </>
    )
}

export default Header;