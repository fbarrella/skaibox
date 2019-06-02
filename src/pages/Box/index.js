import React, { Component } from 'react';
import apiObj from "../../services/api";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import Dropzone from "react-dropzone";
import socket from "socket.io-client";

import { MdInsertDriveFile } from "react-icons/md";
import logo from "../../assets/skaibox.svg";
import "./styles.css";

const api = apiObj.axios;

export default class Box extends Component {
    state = {
        box: {}
    };

    async componentDidMount () {
        this.subscribeToNewFiles();

        const box = this.props.match.params.id;
        const response = await api.get(`skaibox/${box}`);

        this.setState({ box: response.data });
    }

    subscribeToNewFiles = () => {
        const box = this.props.match.params.id;
        const io = socket(apiObj.baseURI);

        io.emit("connectRoom", box);
        io.on("file", data => {
            this.setState({ box:{ ... this.state.box, files: [data, ... this.state.box.files] } });
        });
    }

    handleUpload = async (files) => {
        const box = this.props.match.params.id;

        files.forEach(file => {
            const data = new FormData();
            data.append("file", file);
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
