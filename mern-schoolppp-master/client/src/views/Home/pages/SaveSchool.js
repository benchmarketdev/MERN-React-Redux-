import React, { Component } from 'react';
import WidgetComponent from "../../../components/Widget";
import { authHeader } from "../../../helpers/auth-header";

class SaveSchoolPage extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      school:[],
      schoolData:{
        _id: '',
                year: '',
                week: '',
                month: '',
                elecEuro: '',
                elecKwh: '',
                heatEuro: '',
                heatKwh: '',
                waterEuro: '',
                waterLiter: '' ,    
      },
      months:
      [
        {id:1,month:'Jan'},{id:2,month:'Feb'},{id:3,month:'Mar'},{id:4,month:'Apr'},
        {id:5,month:'May'},{id:6,month:'June'},{id:7,month:'July'},{id:8,month:'Aug'},
        {id:9,month:'Sep'},{id:10,month:'Oct'},{id:11,month:'Nob'},{id:12,month:'Dec'}
      ],
      value: '0'
    };

    this.onSaveSubmit = this.onSaveSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.requestOptions = {
      method: 'GET',
      headers: authHeader()
    };
  }

  componentWillMount() {
    this.loadSchoolByIdData();
  }

  loadSchoolByIdData() {
    // + this.props.match.params.id
    fetch('http://localhost:3003/api/schools', this.requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ school: response })
        console.log(this.state.school);
      });
  }

  getYears(){
    var years = [];
    var i = 0;
    for (let year = 2010; year < 2020; year++) {
      years[i] = year;
      i++;
    }      
    return years.map(function(year, i) {
      return <option value={year} key={i}>{year}</option>;
    })
}

  getWeeks(){
    var weeks = [];
    var i = 0;
    for (let week = 1; week <= 54; week++) {
      weeks[i] = week;
      i++;
    }      
    return weeks.map(function(week, i) {
      return <option value={week} key={i}>{week}</option>;
    })
  }

  onChange(event) {
    const schoolData = Object.assign({}, this.state.schoolData);
    schoolData[event.target.name] = event.target.value;
    this.setState({schoolData: schoolData});
    this.setState({value: event.target.value});
    console.log(this.state.schoolData);
  }

  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onSaveSubmit(e) {
    e.preventDefault();
    // const { schoolName, schoolData } = this.state.school;
    // const { dispatch } = this.props;
    this.save(this.state.schoolData);

  }

  save(data) {
    // console.log(data);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    };
   
    return fetch('http://127.0.0.1:3003/api/schools/statistics', requestOptions)
      .then(response => {
        this.props.history.push("/");
      })

  }


  render() {
    const schoolData = this.state.schoolData;

    const schools = this.state.school.map(function (item, i) {
      return <option value={item._id} id={item._id} key={i+1} className="nav-item">
      {item.schoolName}
      </option>
    })
    const months = this.state.months.map(function (item, i) {
      return <option value={item.id} value={item.id} key={item.id} className="nav-item">
      {item.month}
      </option>
    })

    return (
      <div className="content-wrapper container-fluid px-5 mb-4 trans-03-in-out">

        <div className="row">

          <div className="col-lg-12 mb-3">
            <WidgetComponent header='Save School Data' className='shadow-01 mb-4' excerpt=''>
              <form className="container" onSubmit={this.onSaveSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label className="col-form-label">School</label>
                    <select name="_id" value={schoolData._id}  onChange={this.onChange} className="form-control" required>
                      <option value='0'>Choose</option>
                      {schools}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label className="col-form-label">year</label>
                    <select  name="year" value={schoolData.year}  onChange={this.onChange} className="form-control">
                      <option value='0'>Choose</option>
                      {this.getYears()}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="col-form-label">month</label>
                    <select  name="month"  value={schoolData.month}  onChange={this.onChange} className="form-control">
                      <option value='0'>Choose</option>
                      {months}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="col-form-label">week</label>
                    <select   name="week"  value={schoolData.week}  onChange={this.onChange} className="form-control">
                      <option value='0'>Choose</option>
                      {this.getWeeks()}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="col-form-label">Electro euro</label>
                    <input type="number"  onChange={this.onChange}  value={schoolData.elecEuro}
                    name="elecEuro"  className="form-control" placeholder="Electro euro" required/>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="col-form-label">Electro Kwh</label>
                    <input type="number"  onChange={this.onChange}   value={schoolData.elecKwh}
                    name="elecKwh"  className="form-control" placeholder="Electro Kwh" required/>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="col-form-label">Heating euro</label>
                    <input type="number"  onChange={this.onChange}    value={schoolData.heatEuro}
                    name="heatEuro"  className="form-control" placeholder="Heating euro" required/>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="col-form-label">Heating Kwh</label>
                    <input type="number"  onChange={this.onChange}  value={schoolData.heatKwh}
                    name="heatKwh"  className="form-control" placeholder="Heating Kwh" required/>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="col-form-label">Water euro</label>
                    <input type="number"  onChange={this.onChange}  value={schoolData.waterEuro}
                    name="waterEuro"  className="form-control" placeholder="Water euro" required/>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="col-form-label">Water Liter</label>
                    <input type="number"  onChange={this.onChange}  value={schoolData.waterLiter}
                    name="waterLiter"  className="form-control" placeholder="Water Kwh" required/>
                  </div>
                </div>


                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </WidgetComponent>
          </div>

        </div>
      </div>
    );
  }
}

export default SaveSchoolPage;
