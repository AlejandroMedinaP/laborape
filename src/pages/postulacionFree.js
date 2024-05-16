import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Divider } from '@mui/material';
import styles from '../styles/postulacionFree.css';
import Trabajos from '../components/Trabajos';
import Filtros from '../components/Filtros';


function Index() {
    const [trabajos, setTrabajos] = useState([]);
    const [nombreUser, setNombreUser] = useState('');
    const [ubicaciones, setUbicaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);

    async function fetchTrabajos() {
        try {
            const response = await fetch("http://localhost:3100/api/trabajos", {
                method: "GET"
            });
            const data = await response.json();
            setTrabajos(data);
        } catch (error) {
            console.error('Error al obtener los trabajos:', error);
        }
    }

    async function fetchFiltros() {
        try {
            const ubicacionesData = await fetch("http://localhost:3100/api/ubicaciones");
            const categoriasData = await fetch("http://localhost:3100/api/categorias");
            const ubicaciones = await ubicacionesData.json();
            const categorias = await categoriasData.json();
            setUbicaciones(ubicaciones);
            setCategorias(categorias);
        } catch (error) {
            console.error('Error al obtener los filtros:', error);
        }
    }

    useEffect(() => {
        fetchTrabajos();
        fetchFiltros();
    }, []);

    const handleFiltroCambio = (tipo, valor) => {
        console.log(`Filtro ${tipo} cambiado a: ${valor}`);
    };

    return (
        <>
            <div className={styles.megaConte}>
                <div className={styles.subMegaConte}>
                </div>
                
                <div className={styles.subMegaConte}>
                    <div className={styles.contenedor}>
                        <div className={styles.child1}>
                            <div className={styles.child2}>
                                <Link className={styles.links} href='/administrador'>Principal</Link>
                                <Link className={styles.links} href='/administrador/configuracion'>Perfil</Link> 
                                <Link className={styles.links} href='/administrador/biblioteca'>Biblioteca</Link>
                                <p className={styles.version}>Biblio v1.0.2-alpha</p>
                            </div>
                        </div>
                        <div className={styles.subMegaConte2}>
                            <h1>Bienvenido, {nombreUser}!</h1>
                            <Divider />
                            <Filtros ubicaciones={ubicaciones} categorias={categorias} onFiltroCambio={handleFiltroCambio} />
                            <Trabajos trabajos={trabajos} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;