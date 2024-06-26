import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import react from 'react';
import Head from "next/head";
import Link from "next/link";



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
              <label className="sub_title" htmlFor="password">
                Contraseña
              </label>
              <input
                placeholder="Ingrese su contraseña"
                id="password"
                className="form_style"
                type="password"
                required // Add required attribute for validation
              />
            </div>
            <div>
              <button className="btn" type="submit" href="postulacionfree">
                INGRESAR
              </button>
              <p>
              <a className="link" href="restablecerContra">
              RESTABLECER CONTRASEÑA
              </a>
            </p>
              <p>
                <Link className="link" href="/register">
                CREAR NUEVA CUENTA
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginForm;