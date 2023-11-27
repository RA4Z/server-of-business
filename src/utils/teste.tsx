import { Component } from 'react';

class Teste extends Component {

  state = {
    // Initially, no file is selected
    selectedFile: {
      name: '', type: ''
    }
  };

  // On file select (from the pop up)
  onFileChange = (event: any) => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

  };

  // On file upload (click the upload button)
  onFileUpload = () => {

    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile!.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {

    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {

    return (
      <div>
        <h1>
          GeeksforGeeks
        </h1>
        <h3>
          File Upload using React!
        </h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default Teste;