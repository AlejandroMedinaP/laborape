import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import react from 'react';
import Head from "next/head";

export default function login(){
    return (
    <>
        <Head>
            <title> LaboraPE </title>
        </Head>
        <div id="titulo">
            <p>Crea tu cuenta</p>
        </div>
        <div id="firstname">
            <p>Primer Nombre</p>
            <div id="box">
                
            </div>
        </div>
        <div id="lastname">
            <p>Last Name</p>
            <div id="box2">
                
            </div>
        </div>
        <div id="Email">
            <p>Email</p>
            <div id="box3">
                
            </div>
        </div>
        <div id="Password">
            <p>Contraseña</p>
            <div id="box4">
                
            </div>
        </div>

        </>
    )
}