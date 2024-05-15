import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import react from 'react';
import Head from "next/head";

const LoginForm = () => {
  return (
    <div className="container">
      <div className="form_area">
        <p className="title">REGISTRO</p>
        <form action="">
          <div className="form_group">
            <label className="sub_title" htmlFor="name">
              Nombre
            </label>
            <input
              placeholder="Introduzca su nombre"
              className="form_style"
              type="text"
              id="name"
            />
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="lastname">
              Apellido
            </label>
            <input
              placeholder="Introduzca su apellido"
              id="password"
              className="form_style"
              type="password"
              required // Add required attribute for validation
            />
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Introduzca un email"
              id="email"
              className="form_style"
              type="email"
              required // Add required attribute for validation
            />
          </div>
          <div className="form_group">
            <label className="sub_title" htmlFor="password">
              Contraseña
            </label>
            <input
              placeholder="Introduzca una contraseña"
              id="password"
              className="form_style"
              type="password"
              required // Add required attribute for validation
            />
          </div>
          
          <div className="form_options">
            <label className="sub_title" htmlFor="role">
              ¿Que desea en la app?
            </label>
         <div></div>
            <select id="role" className="form_style">
              <option value="trabajador">Quiero buscar trabajo</option>
              <option value="empleador">Quiero encontrar trabajadores</option>
            </select>
          </div>
          <div>
            <button className="btn" type="submit">
              CREAR CUENTA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;