import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import react from 'react';
import Head from "next/head";

const LoginForm = () => {
    return (
      <div className="container">
        <div className="form_area">
          <p className="title">LaboraPE</p>
          <form action="">
            <div className="form_group">
              <label className="sub_title" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Ingrese su email"
                id="email"
                className="form_style"
                type="email"
                required // Add required attribute for validation
              />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="Newpassword">
                Nueva Contraseña
              </label>
              <input
                placeholder="Ingrese su nueva contraseña"
                id="Nuevapassword"
                className="form_style"
                type="password"
                required // Add required attribute for validation
              />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="Repetirpassword">
                Repetir Contraseña
              </label>
              <input
                placeholder="Repita su nueva contraseña"
                id="Repetirpassword"
                className="form_style"
                type="password"
                required // Add required attribute for validation
              />
            </div>
            <div>
              <button className="btn" type="submit" href="login">
                RESTABLECER CONTRASEÑA
              </button>
              <p>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginForm;