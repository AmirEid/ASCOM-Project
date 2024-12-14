/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Header.jsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: aeid <aeid@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/14 19:32:17 by aeid              #+#    #+#             */
/*   Updated: 2024/12/14 19:32:20 by aeid             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import styles from "./Header.module.css";

function Header() {
    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.h1}>ASCOM TEST</h1>
            </header>
        </>
    )
}

export default Header;