import React, { Component } from 'react';
import api from "../../services/api";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import Dropzone from "react-dropzone";

import { MdInsertDriveFile } from "react-icons/md";
import logo from "../../assets/skaibox.svg";
import "./styles.css";

export default class Box extends Component {
    state = {
        box: {}
    };

    async componentDidMount () {
        const box = this.props.match.params.id;
        const response = await api.get(`skaibox/${box}`);

        this.setState({ box: response.data });
    }

    handleUpload = async (files) => {
        const box = this.props.match.params.id;

        files.forEach(file => {
            const data = new FormData();
            data.append("file", file);
            console.log(box);
            api.post(`skaibox/${box}/file`, data);
        });
    }

    render() {
        return (
            <div id="box-container">
                <header>
                    <img src={logo} alt="Skaibox" />
                    <h1>{ this.state.box.title }</h1>
                </header>

                <Dropzone onDropAccepted={this.handleUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="upload" { ... getRootProps() }>
                            <input { ... getInputProps() } />

                            <p>Arraste os arquivos ou clique aqui!</p>
                        </div>
                    )}
                </Dropzone>

                <ul>
                    { this.state.box.files && this.state.box.files.map(file => (
                        <li key={ file._id }>
                            <a className="fileInfo" href={ file.url }>
                                <MdInsertDriveFile size={24} color="#A5Cfff" />
                                <strong>{ file.title }</strong>
                            </a>

                            <span>Há {distanceInWords(file.createdAt, new Date(), {
                                locale: pt
                            })}</span>
                        </li>
                    )) }                
                </ul>
            </div>
        );
    }
}
