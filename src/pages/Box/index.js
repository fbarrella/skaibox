import React, { Component } from 'react';
import { MdInsertDriveFile } from "react-icons/md";
import logo from "../../assets/skaibox.svg";
import "./styles.css";

export default class Box extends Component {
  render() {
    return (
        <div id="box-container">
            <header>
                <img src={logo} alt="Skaibox" />
                <h1>Skaibox</h1>
            </header>

            <ul>
                <li>
                    <a href="">
                        <MdInsertDriveFile size={24} color="#A5Cfff" />
                        <strong>File.pdf</strong>
                    </a>

                    <span>A três minutos atrás</span>
                </li>
            </ul>
        </div>
    );
  }
}
