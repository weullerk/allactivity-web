import logo from './logo.svg';
import './App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/icons.min.css';
import './assets/css/app.min.css';

import './assets/libs/owl.carousel/assets/owl.theme.default.min.css';
import './assets/libs/owl.carousel/assets/owl.carousel.min.css';
import './assets/libs/bootstrap-datepicker/css/bootstrap-datepicker.min.css';
import './assets/libs/@chenfengyuan/datepicker/datepicker.min.css';
import './assets/libs/select2/css/select2.min.css';
import './assets/libs/spectrum-colorpicker2/spectrum.min.css';
import './assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css';

import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import api from "./api";

function App() {
  const [status, setStatus] = useState(null);
  const [logs, setLogs] = useState(null);

  const { control, handleSubmit, reset, getValues, setValue, formState: {errors} } = useForm({
    defaultValues: {
      'start': '',
      'end': '',
      'description': ''
    }
  });

  const submit = async (data) => {
    setStatus(null);

    // Create logs request to api
    const response = await fetch(api.createLog, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.status === 200) {
      setStatus({message: 'Log created with success.', alert: 'alert alert-success'});
    } else {
      setStatus({message: 'Error when creating log.', alert: 'alert alert-danger'});
    }
  };

  const clean = (e) => {
    setValue('start', '');
    setValue('end', '');
    setValue('description', '');
  };

  return (
  <div id="layout-wrapper">


    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">


        </div>

        <div className="d-flex">

        </div>
      </div>
  </header>



      <div className="page-content">
        <div className="container-fluid">

          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Logs</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#">Utility</a></li>
                    <li className="breadcrumb-item active">Timeline</li>
                  </ol>
                </div>

              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-4">Create Log</h4>

                  {status && (
                  <div className={status.alert} role="alert">
                    {status.message}
                  </div>
                  )}

                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="example-datetime-local-input" className="col-md-2 col-form-label">Start</label>
                        <Controller name={'start'}
                          control={control}
                          rules={{required: true}}
                          render={({field: {onChange, onBlur, value}}) => (
                          <input className="form-control"
                            type="datetime-local"
                            value={value}
                            id="example-datetime-local-input"
                            onBlur={onBlur}
                            onChange={onChange}
                          />
                        )} />
                        {errors.start?.type === 'required' && <div className="error m-1">
                          Provide a date.
                        </div>}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="example-datetime-local-input" className="col-md-2 col-form-label">End</label>
                        <Controller name={'end'}
                          control={control}
                          rules={{required: true}}
                          render={({field: {onChange, onBlur, value}}) => (
                            <input className="form-control"
                              type="datetime-local"
                              value={value}
                              id="example-datetime-local-input"
                              onChange={onChange}
                              onBlur={onBlur}
                            />
                        )} />
                        {errors.end?.type === 'required' && <div className="error m-1">
                          Provide a date.
                        </div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="example-text-input" className="col-md-2 col-form-label">Description</label>
                        <Controller name={'description'}
                          control={control}
                          rules={{required: true, minLength: 4, maxLength: 255}}
                          render={({field: {onChange, onBlur, value}}) => (
                            <input className="form-control"
                              type="text"
                              value={value}
                              id="example-text-input"
                              onChange={onChange}
                              onBlur={onBlur}
                            />
                          )} />
                        {errors.description?.type === 'required' && <div className="error m-1">
                          Provide a description.
                        </div>}
                        {errors.description?.type === 'minLength' && <div className="error m-1">
                          Min length of input is 4.
                        </div>}
                        {errors.description?.type === 'maxLength' && <div className="error m-1">
                          Max length of input is 255.
                        </div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div>
                        <button type="button" onClick={handleSubmit(submit)} className="btn btn-primary  btn-block w-xs waves-effect waves-light">
                          Create log</button>
                        <button type="button" onClick={clean} className="btn btn-danger m-2 w-xs waves-effect waves-light">
                          Clean</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-5">Logs</h4>
                  <div className="">
                    <ul className="verti-timeline list-unstyled">
                      <li className="event-list">
                        <div className="event-timeline-dot">
                          <i className="bx bx-right-arrow-circle"></i>
                        </div>
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <i className="bx bx-copy-alt h2 text-primary"></i>
                          </div>
                          <div className="flex-grow-1">
                            <div>
                              <h5>Ordered</h5>
                              <p className="text-muted">New common language will be more simple and regular than the existing.</p>

                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="row">
                      <div className="d-flex justify-content-center">
                        No logs registered.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      <footer className="" style={{width: '100%', backgroundColor: '#f2f2f5', paddingRight: '16', paddingLeft: 16,
        paddingTop: 32, paddingBottom: 32, bottom: 0, position: 'absolute'}}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <script>document.write(new Date().getFullYear())</script> AllActivity.
            </div>
            <div className="col-sm-6">
              <div className="text-sm-end d-none d-sm-block">
                Design by Themesbrand | Develop by Weuller Krysthian
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>

);
}

export default App;
