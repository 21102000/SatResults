import React from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends React.Component {

  state={
    alldata:[],
    formData:{
      name:'',
      address:'',
      city:'',
      country:'',
      pincode:'',
      satScore:'',
    },
    updateFormData:{
      name:'',
      satScore:'',
    },
    getRank:{
      name:'',
    },
    deleteFormData:{
      name:'',
    },
    selectedOption:'',
  };

  
  componentDidMount(){
    this.fetchAllData()
  }

  fetchAllData = async (event) =>{
    try{
      const response = await fetch('http://localhost:8080/satApp/v1/findAll',{
        method : 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({}),
      });  
      if(response.ok){
        const data = await response.json();
        toast.success(data.message)
        this.setState({alldata: data.object});
       console.log("----->",data.object);
      }
    }catch(e){
      console.log("Error :" ,e);
    }
  }


  handleFormChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleGetRankRecordSubmit = async (event) =>{
    event.preventDefault();
    try{
      const response = await fetch('http://localhost:8080/satApp/v1/findbyRank',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(this.state.getRank),
      });
      if(response.ok){
        const data = await response.json();
        const { name, rank } = data.object;
        toast.success(`Name : ${name}` );
        toast.success(`Rank : ${rank}`);
      }
    }catch(e){
        console.log('Error: ',e);
    }

    this.setState({
      getRank:{
        name:'',
      },
      isGetRankPopup:false,
      selectedOption:'',
    })
    
  }

  handledeleteRecordSubmit = async (event) =>{
    event.preventDefault();
    try{
      const response = await fetch('http://localhost:8080/satApp/v1/delete',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(this.state.deleteFormData),
      });
      if(response.ok){
        const data = await response.json();
        const message = data.message;
        toast.success(message)
      }
    }catch(e){
        console.log('Error: ',e);
    }

    this.setState({
      deleteFormData:{
        name:'',
      },
      isdeletePopup: false,
      selectedOption:'',
    });

  }

  handleupdateFormSubmit = async (event) =>{
    event.preventDefault();
    try{
      const response = await fetch('http://localhost:8080/satApp/v1/update',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(this.state.updateFormData),
      });
      if(response.ok){
        const data = await response.json();
        const message = data.message;
        toast.success(message)
      }
    }catch(e){
        console.log('Error: ',e);
    }

    this.setState({
      updateFormData:{
        name:'',
        satScore:'',
      },
      isUpdatepopup: false,
      selectedOption:'',
    });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try{
      const response = await fetch('http://localhost:8080/satApp/v1/create',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(this.state.formData),
      });
      if(response.ok){
          const data = await response.json();
          const message = data.message;
          toast.success(message)
      }
    }catch(e){
        console.log('Error: ',e);
    }

    this.setState({
      formData: {
        name: '',
        city: '',
        address: '',
        pincode:'',
        country:'',
        satScore:'',
      },
      isPopupOpen: false,
      selectedOption:'',
    });
  };

  handleUpdateFormChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      updateFormData: {
        ...prevState.updateFormData,
        [name]: value,
      },
    }));
  };

  handledeleteFormChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      deleteFormData: {
        ...prevState.deleteFormData,
        [name]: value,
      },
    }));
  };

  handleGetRankFormChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      getRank: {
        ...prevState.getRank,
        [name]: value,
      },
    }));
  };



  handleOptionChange = (event) => {
    
    const selectedOption = event.target.value;
    
    switch (selectedOption) {
      case 'insert':
        this.handleInsertData();
        break;
      case 'view':
        this.handleViewAllData();
        break;
      case 'rank':
        this.handleGetRank();
        break;
      case 'update':
        this.handleUpdateScore();
        break;
      case 'delete':
        this.handleDeleteRecord();
        break;
      default:
        break;
    }
  };

  handleInsertData = () => {
    this.setState({ isPopupOpen: true });
  };

  handleViewAllData = () => {
    this.setState({ isViewAllDataPopup : true});
  };

  handleGetRank = () => {
    this.setState({ isGetRankPopup: true});
  };

  handleUpdateScore = () => {
    this.setState({ isUpdatepopup: true});
  };

  handleDeleteRecord = () => {
    this.setState({ isdeletePopup: true});
  };

  handleOnCloseCreate = () =>{
      this.setState({ isPopupOpen : false});
  };

  hanldeOnCloseUpdate = () =>{
    this.setState({ isUpdatepopup: false});
  };

  hanldeOnClosegetRank = () =>{
    this.setState({ isGetRankPopup:false});
  };

  handleDeleteOnClose = () =>{
    this.setState({ isdeletePopup: false});
  };

  handleOnCloseViewAllData = ()=>{
    this.setState({ isViewAllDataPopup:false});
  };


  render() {

    const {data,selectedOption} = this.state;

    return (
      <div className="App">
        <div className='dropdown'>
          <label>
            Select an action:
            <select value={this.state.selectedOption} onChange={this.handleOptionChange}>
              <option value="">-- Select --</option>
              <option value="insert">Insert data</option>
              <option value="view">View all data</option>
              <option value="rank">Get rank</option>
              <option value="update">Update score</option>
              <option value="delete">Delete one record</option>
            </select>
          </label>
        </div>

        {this.state.isViewAllDataPopup && (
        <div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>name</th>
                <th >address</th>
                <th >city</th>
                <th >country</th>
                <th >pincode</th>
                <th >Score</th>
                <th >result</th> 
              </tr>
            </thead>
            <tbody>
            {this.state.alldata.map((item, index) => (
             
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.country}</td>
                  <td>{item.pincode}</td>
                  <td>{item.satScore}</td>
                  <td>{item.result}</td>
                </tr>
              )
              )}
            </tbody>
          </table>
          <button type="close" onClick={this.handleOnCloseViewAllData}>Close</button>
          
        </div>
    )}

{this.state.isGetRankPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Get Rank</h2>
            <form onSubmit={this.handleGetRankRecordSubmit}>
              <label>Name
                <input 
                type="text"
                name="name"
                value={this.state.getRank.name}
                onChange={this.handleGetRankFormChange}/>
              </label>
              <button type="submit">Submit</button>
              <button type="close" onClick={this.hanldeOnClosegetRank}>Close</button>
            </form>
          </div>
        </div>
      )}


        {this.state.isdeletePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Delete</h2>
            <form onSubmit={this.handledeleteRecordSubmit}>
              <label>Name
                <input 
                type="text"
                name="name"
                value={this.state.deleteFormData.name}
                onChange={this.handledeleteFormChange}/>
              </label>
              <button type="submit">Submit</button>
              <button type="close" onClick={this.handleDeleteOnClose}>Close</button>
            </form>
          </div>
        </div>
      )}


        {this.state.isUpdatepopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>update</h2>
            <form onSubmit={this.handleupdateFormSubmit}>
              <label>Name
                <input 
                type="text"
                name="name"
                value={this.state.updateFormData.name}
                onChange={this.handleUpdateFormChange}/>
              </label>
              <label>Sat Score
                <input 
                type="text"
                name="satScore"
                value={this.state.updateFormData.satScore}
                onChange={this.handleUpdateFormChange}/>
              </label>
              <button type="submit">Submit</button>
              <button type="close" onClick={this.hanldeOnCloseUpdate}>Close</button>
            </form>
          </div>
        </div>
      )}

        {this.state.isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Insert Data</h2>
              <form onSubmit={this.handleFormSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={this.state.formData.name}
                    onChange={this.handleFormChange}
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={this.state.formData.address}
                    onChange={this.handleFormChange}
                  />
                </label>
                <label>
                  City:
                  <input
                    type="text"
                    name="city"
                    value={this.state.formData.city}
                    onChange={this.handleFormChange}
                  />
                </label>
                <label>
                  Country:
                  <input
                    type="text"
                    name="country"
                    value={this.state.formData.country}
                    onChange={this.handleFormChange}
                  />
                </label>
                <label>
                  Pincode:
                  <input
                    type="text"
                    name="pincode"
                    value={this.state.formData.pincode}
                    onChange={this.handleFormChange}
                  />
                </label>
                <label>
                  SAT Score(max = 1600*):
                  <input
                    type="text"
                    name="satScore"
                    value={this.state.formData.satScore}
                    onChange={this.handleFormChange}
                  />
                </label>
                <button type="submit">Submit</button>
                <button type="close" onClick={this.handleOnCloseCreate}>Close</button>
              </form>
            </div>
          </div>
        )}
      <ToastContainer />
      </div>
    );
  }
}

export default App;